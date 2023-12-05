import {
  Alert,
  Box,
  Button,
  Group,
  NumberInput,
  Paper,
  Select,
  Slider,
  Stack,
  Switch,
  TextInput,
  createStyles,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";

import { FileWithPath } from "@mantine/dropzone";
import { useForm } from "@mantine/form";

import { Dropzone } from "@/components/form/Dropzone";
import { Field } from "@/components/form/Field";
import { notifications } from "@/utils/notifications";
import { useRouter } from "next/router";

import {
  CreateFormValues,
  FormProvider,
  SONG_IMAGE_TYPES,
  UploadedFileValue,
} from "@/components/artist/Song/SongForm/SongContext";

import { useIsMutating } from "@tanstack/react-query";

import { getFileUrl } from "@/utils/file";

import { useWalletSelector } from "@/context/WalletSelectorContext";
import { countryKeys } from "@/datasets/forms/country-keys";
import { genreKeys } from "@/datasets/forms/genre-keys";
import { languageKeys } from "@/datasets/forms/language-keys";
import { musicalKeys } from "@/datasets/forms/musical-keys";
import { vocalRangeKeys } from "@/datasets/forms/vocal-range-keys";
import {
  useFileControllerRemove,
  useFileControllerUploadFile,
  useSongControllerCreateSong,
} from "@/services/api/raidar/raidarComponents";
import { parseNearAmount } from "near-api-js/lib/utils/format";
import { useRef, useState } from "react";
import { AlertCircle, Check } from "tabler-icons-react";
import createPDF from "@/utils/createPDF";

import SignatureCanvas, { SignatureCanvasMethods } from "../../../SignaturePad";

const useStyles = createStyles((theme) => ({
  button: {
    backgroundColor: theme.colors.red[5],
    ...theme.fn.hover({
      backgroundColor: theme.colors.red[8],
    }),
  },
}));

interface SongFormProps {
  albumIdProp: string | null;
}

export const SongForm = ({ albumIdProp }: SongFormProps): any => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const removeFile = useFileControllerRemove({});
  const [uploadedImage, setUploadedImage] = useState<UploadedFileValue | null>(
    null
  );
  const [audioError, setAudioError] = useState<any>("");
  const { reset } = useForm();

  const router = useRouter();
  const { classes } = useStyles();
  const albumId = albumIdProp || router.query.id;

  const { callMethod } = useWalletSelector();

  const isMutating = useIsMutating();

  const signatureCanvasRef = useRef<SignatureCanvas>(null);

  const signatureDataUrl = signatureCanvasRef.current?.getSignatureImage();

  const form = useForm<any>({
    validateInputOnChange: true,
    initialValues: {
      title: "",
      album_id: "",
      genre: "",
      mood: "",
      tags: "",
      length: "",
      bpm: null,
      instrumental: false,
      languages: "",
      vocalRanges: "",
      musicalKey: "",
      recordingDate: "",
      recordingLocation: "",
      recordingCountry: "",
      musicId: "",
      artId: "",
      pka: "",
      price: 0,
    },
  });

  const handleResetForm = () => {
    reset();
  };

  const createSong = useSongControllerCreateSong({
    onMutate: () => {
      notifications.create({ title: "Creating song" });
    },
    onSuccess: () => {
      notifications.success({ title: "Song created" });
      router.push("/artist/albums");
    },
    onError: () => {
      notifications.error({ title: "Error while creating song" });
    },
  });

  const uploadFile = useFileControllerUploadFile({});

  const handleImageDrop = async (files: FileWithPath[]) => {
    const file = files[0];

    const { image } = form.values;

    await setUploadedImage(image);

    try {
      if (image?.response) {
        await removeFile.mutateAsync({ pathParams: { id: image.response.id } });
      }

      const response = await uploadFile.mutateAsync({
        body: {
          file,
          tags: ["image"],
        } as any,
      });

      form.setFieldValue("image", {
        file,
        response,
      });
    } catch (error) {
      form.setFieldValue("documents", image);

      form.setFieldError(
        "image",
        (error as unknown as { stack?: { message?: string } })?.stack
          ?.message || "Failed to upload image"
      );

      console.error(error);
    }
  };

  const handleSongDrop = async (files: FileWithPath[]) => {
    const file = files[0];
    setAudioError(false);

    const { song } = form.values;

    try {
      if (song?.response) {
        await removeFile.mutateAsync({ pathParams: { id: song.response.id } });
      }

      const response = await uploadFile.mutateAsync({
        body: {
          file,
          tags: ["song"],
        } as any,
      });

      form.setFieldValue("song", {
        file,
        response,
      });
    } catch (error) {
      form.setFieldValue("song", undefined);
      setAudioError(error);

      form.setFieldError(
        "song",
        (error as unknown as { stack?: { message?: string } })?.stack
          ?.message || "Failed to upload song"
      );
    }
  };

  const handleSubmit = async (values: CreateFormValues) => {
    form.validate();

    if (!selectedDate) return;

    if (!form.isValid) {
      return;
    }

    notifications.create({
      title: "Creating Song",
    });

    const {
      title,
      genre,
      mood,
      tags,
      length,
      bpm,
      instrumental,
      languages,
      vocalRanges,
      musicalKey,
      recordingCountry,
      recordingLocation,
      price,
      image,
      song,
      pka,
    } = values;

    const formattedDate = new Date(selectedDate).toISOString();

    try {
      if (signatureDataUrl) {
        const result = await createSong.mutateAsync({
          body: {
            title: title,
            album_id: albumId as string,
            genre: genre,
            mood: [mood],
            tags: [tags],
            length: length as unknown as number,
            bpm: bpm as unknown as number,
            instrumental: instrumental ? true : false,
            languages: [languages],
            vocal_ranges: [vocalRanges],
            musical_key: musicalKey,
            music_id: song?.response?.id as string,
            recording_date: formattedDate,
            recording_country: recordingCountry,
            recording_location: recordingLocation,
            art_id: image?.response?.id as string,
            pka: pka || "Missing PKA info",
            price: price as unknown as number,
          },
        });

        if (result && result.id && pka && length && price) {
          handleCreatePdf(
            result.id,
            result.title,
            pka,
            result.length,
            result.price
          );
        } else {
          throw new Error("Missing necessary data for creating PDF");
        }

        const songPriceInYoctoNear = parseNearAmount(result.price) as string;

        const data = {
          token_id: result.token_contract_id.toString(),
          name: result.title,
          description: `${result.title} by ${result.pka}`,
          extra: null,
          price: songPriceInYoctoNear,
        };

        callMethod(
          "raidar.near",
          "mint_nft",
          {
            data,
          },
          parseNearAmount("1") as any,
          "30000000000000" as any
        );
      } else {
        notifications.error({ title: "Please provide a signature first!" });
      }
    } catch (error) {
      console.error(error);
      notifications.error({
        title: "Error while creating song",
      });
    }
  };

  const handleCreatePdf = async (
    songId: string,
    title: string,
    pka: string,
    length: string,
    price: string
  ) => {
    console.log("signatureDataUrl", signatureDataUrl);

    // if (signatureDataUrl) {
    //   fetch(`/api/createPDF/createPDF`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       title: title,
    //       pka: pka,
    //       length: length,
    //       price: price,
    //       signatureDataUrl: signatureDataUrl,
    //     }),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => console.log(data))
    //     .catch((error) => console.error("Error:", error));
    // }

    if (signatureDataUrl) {
      createPDF(
        songId, // songId
        title, // title
        pka, // pka
        length, // length
        price, // price
        undefined, // descriptionOfUse
        undefined, // userMail
        signatureDataUrl, // signatureDataUrl
        undefined, //pdfLink
        false // isBought
      );
    }
  };

  return (
    <Paper>
      <Alert mb={"md"} icon={<AlertCircle size="1rem" />} title="Important">
        Please make sure to have at least 1 NEAR in your wallet to pay for
        creation of the NFT.
      </Alert>

      {audioError ? (
        <Alert
          mb={"md"}
          icon={<AlertCircle size="1rem" />}
          title="Error while uploading audio file"
          color="red"
        >
          {audioError.stack.message}
        </Alert>
      ) : null}

      <FormProvider form={form}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Box maw={400} mx="auto">
              <Dropzone
                maw={50}
                mah={50}
                title="Upload Artwork"
                description="Drag'n' drop the song artwork here. Max file size is 20MB, supported formats are PNG and JPEG"
                label="Select Image"
                previewUrl={getFileUrl(form.values.image?.response)}
                error={form.getInputProps("image").error}
                isLoading={isMutating > 0}
                dropzone={{
                  multiple: false,
                  accept: SONG_IMAGE_TYPES,
                  onDrop: handleImageDrop,
                  disabled: isMutating > 0,
                }}
                isSong={false}
              />
            </Box>
            <Box mx="auto" mt="xl">
              <Dropzone
                title="Upload Song"
                description="Drag'n' drop the audio file here. Max file size is 20MB, supported formats are .waw"
                label="Select Audio"
                previewUrl={getFileUrl(form.values.song?.response)}
                error={form.getInputProps("song").error}
                isLoading={isMutating > 0}
                dropzone={{
                  multiple: false,
                  onDrop: handleSongDrop,
                  disabled: isMutating > 0,
                }}
                isSong={true}
              />
            </Box>
            <Group mt="xl">
              <Field withAsterisk label="Song Title">
                <TextInput
                  mt="xs"
                  placeholder="Title"
                  {...form.getInputProps("title")}
                />
              </Field>

              <Field withAsterisk label="Genre">
                <Select
                  searchable
                  data={genreKeys}
                  mt="xs"
                  placeholder="E.g. Rock, Pop, Hip Hop"
                  {...form.getInputProps("genre")}
                />
              </Field>

              <Field withAsterisk label="PKA">
                <TextInput
                  mt="xs"
                  placeholder="Professional Known As"
                  {...form.getInputProps("pka")}
                />
              </Field>
            </Group>
            <Field withAsterisk label="Mood">
              <TextInput
                mt="xs"
                placeholder="E.g. Happy, Epic, Euphoric"
                {...form.getInputProps("mood")}
              />
            </Field>
            <Field withAsterisk label="Tags">
              <TextInput
                mt="xs"
                placeholder="E.g. Hard Beats, Bass Boosted, Synthesizer"
                {...form.getInputProps("tags")}
              />
            </Field>
            <Group>
              <Field withAsterisk label="Song Length (in seconds)">
                <TextInput
                  mt="xs"
                  placeholder="Duration in seconds (0 to 500)"
                  {...form.getInputProps("length")}
                />
              </Field>

              <Field withAsterisk label="BPM">
                <Slider
                  w={"200px"}
                  mt="sm"
                  thumbSize={15}
                  defaultValue={20}
                  max={210}
                  size="sm"
                  color="red"
                  {...form.getInputProps("bpm")}
                />
              </Field>
            </Group>
            <Field withAsterisk label="Recording Date">
              <DateInput
                color="red"
                size="md"
                maxDate={new Date()}
                defaultDate={new Date()}
                getDayProps={(date) => ({
                  onClick: () => setSelectedDate(date),
                })}
              />
            </Field>
            <Field withAsterisk label="Instrumental">
              <Switch
                color="red"
                label="Instrumental"
                {...form.getInputProps("instrumental")}
              />
            </Field>
            <Field withAsterisk label="Languages">
              <Select
                searchable
                data={languageKeys}
                mt="xs"
                placeholder="E.g. English, Spanish, French"
                {...form.getInputProps("languages")}
              />
            </Field>
            <Field withAsterisk label="Vocal Ranges">
              <Select
                searchable
                data={vocalRangeKeys}
                mt="xs"
                placeholder="E.g. Soprano, Alt, Tenor"
                {...form.getInputProps("vocalRanges")}
              />
            </Field>
            <Group>
              <Field withAsterisk label="Musical key">
                <Select
                  searchable
                  data={musicalKeys}
                  mt="xs"
                  placeholder="E.g. G Minor, C Major"
                  {...form.getInputProps("musicalKey")}
                />
              </Field>

              <Field withAsterisk label="Recording Country">
                <Select
                  searchable
                  data={countryKeys}
                  mt="xs"
                  placeholder="E.g. examples USA, UK"
                  {...form.getInputProps("recordingCountry")}
                />
              </Field>

              <Field withAsterisk label="Recording Location">
                <TextInput
                  mt="xs"
                  placeholder="E.g. Los Angeles, New York"
                  {...form.getInputProps("recordingLocation")}
                />
              </Field>

              <Field withAsterisk label="Price in USD">
                <NumberInput
                  mt="xs"
                  defaultValue={0.05}
                  precision={2}
                  min={0}
                  step={0.5}
                  max={1000}
                  placeholder="Price"
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  formatter={(value) =>
                    !Number.isNaN(parseFloat(value))
                      ? `${value} USD`.replace(
                          /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                          ","
                        )
                      : "NEAR "
                  }
                  {...form.getInputProps("price")}
                />
              </Field>
            </Group>
            <h3>Sign the document</h3>
            {/* <SignaturePad
              width={100}
              height={150}
              options={{
                minWidth: 100,
                maxWidth: 100,
                penColor: "rgb(0, 0, 0)",
              }}
            /> */}
            {/* <SignaturePad
              ref={(ref) => (signaturePadRef = ref)}
              options={{
                minWidth: 1,
                maxWidth: 1,
                penColor: "rgb(0, 0, 0)",
              }}
            /> */}

            <SignatureCanvas ref={signatureCanvasRef} />

            {/* <Button onClick={saveImage}>Save as PNG</Button> */}
            {/* <Button
              className={classes.button}
              color="red"
              onClick={handleClear}
            >
              Clear Signature
            </Button> */}
            <Group>
              <Button
                className={classes.button}
                type="submit"
                color="red"
                leftIcon={<Check size={14} />}
                disabled={isMutating > 0}
              >
                Create Song
              </Button>
              <Button
                className={classes.button}
                onClick={async () => {
                  await form.reset();
                  await handleResetForm();
                }}
              >
                Reset Form
              </Button>

              {/* <Button
                className={classes.button}
                onClick={async () => {
                  await handleCreatePdf();
                }}
              >
                Create PDF
              </Button> */}
            </Group>
          </Stack>
        </form>
      </FormProvider>
    </Paper>
  );
};

export default SongForm;
