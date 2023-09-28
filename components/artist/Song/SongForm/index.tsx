import {
  Box,
  Button,
  Card,
  Group,
  NumberInput,
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
import { useState } from "react";
import { Check } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  card: {
    // backgroundColor: "#fff",
    // width: "80%",
    // margin: "auto",
  },
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

  const router = useRouter();
  const { classes } = useStyles();
  const albumId = albumIdProp || router.query.id;

  // const albumDataQuery = useAlbumControllerFindOne({
  //   pathParams: {
  //     id: albumId as string,
  //   },
  // });

  // const albumData = useMemo(() => albumDataQuery.data, [albumDataQuery.data]);

  const isMutating = useIsMutating();

  const form = useForm<any>({
    validateInputOnChange: true,
    initialValues: {
      title: "",
      album_id: "",
      genre: "",
      mood: "",
      tags: "",
      length: null,
      bpm: null,
      instrumental: "",
      languages: "",
      vocal_ranges: "",
      musical_key: "",
      recording_date: "",
      recording_location: "",
      recording_country: "",
      music_id: "",
      art_id: "",
      pka: "",
      price: 0,
    },
    //TODO: check why validations is not working
    // validate: getEditFormValidateInput(),
  });

  // const { error: fileError, value: fileValue } = form.getInputProps(
  //   `${formKey}.file`
  // );

  const createSong = useSongControllerCreateSong({
    onMutate: () => {
      notifications.create({ title: "Creating song" });
    },
    onSuccess: () => {
      notifications.success({ title: "Song created" });
      router.push("/artist/albums");
    },
    onError: () => {
      notifications.error({ title: "Error while creating album" });
    },
  });

  // const updateFile = useFileControllerUpdateFile({});
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

  // const handleDocumentsDrop = async (files: FileWithPath[]) => {
  //   const previous = documents;

  //   const uniqueFiles = files.filter(({ path }) => {
  //     return !documents.some((document: any) => document.file?.path === path);
  //   });

  //   const response = await Promise.all(
  //     uniqueFiles.map((file) => {
  //       return uploadFile.mutateAsync({
  //         body: {
  //           file,
  //           tags: ["document"],
  //         } as any,
  //       });
  //     })
  //   );

  //   const newDocuments: UploadedFileValue[] = uniqueFiles.map((file, i) => {
  //     return {
  //       file,
  //       response: response[i] as unknown as FileDto,
  //     };
  //   });

  //   form.setFieldValue("documents", previous.concat(...newDocuments));
  // };

  // const handleRemove = (file: UploadedFileValue) => {
  //   return async () => {
  //     try {
  //       await removeFile.mutateAsync({
  //         pathParams: { id: file.response?.id as string },
  //       });

  //       form.setFieldValue(
  //         "documents",
  //         file.filter((document: any) => document !== file)
  //       );
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  // };

  const handleSongDrop = async (files: FileWithPath[]) => {
    const file = files[0];

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

      form.setFieldError(
        "song",
        (error as unknown as { stack?: { message?: string } })?.stack
          ?.message || "Failed to upload song"
      );

      console.error(error);
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

    // console.log("title", title);
    // console.log("genre", genre);
    // console.log("mood", mood);
    // console.log("title", title);
    // console.log("tags", tags);
    // console.log("length", length);
    // console.log("bpm", bpm);
    // console.log("instrumental", instrumental ? true : false);
    // console.log("languages", languages);
    // console.log("vocal_ranges", vocalRanges);
    // console.log("musical_key", musicalKey);
    // console.log("recording_date", selectedDate[0]);
    // console.log("recording_country", recordingCountry);
    // console.log("recording_location", recordingLocation);
    // console.log("price", price);
    // console.log("image", image);
    // console.log("song", song);

    // console.log("formattedDate", formattedDate);

    // const fileIds = [
    //   image?.response?.id,
    //   ...documents.map(({ response }: any) => response.id),
    // ].filter(Boolean) as string[];

    try {
      await createSong.mutateAsync({
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

      notifications.success({
        title: "Song sucessfully created",
      });
    } catch (error) {
      console.error(error);
      notifications.error({
        title: "Error while creating song",
      });
    }
  };

  return (
    <Card
    // withBorder
    // padding="xl"
    // radius="xl"
    // shadow="sm"
    // className={classes.card}
    >
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
              />
              {/* {documents
                ? documents.map((document: any) => (
                    <Button
                      key={document.file?.path}
                      leftIcon={
                        <ActionIcon
                          variant="transparent"
                          color="dark"
                          onClick={handleRemove(document)}
                        >
                          <X size={14} />
                        </ActionIcon>
                      }
                      size="lg"
                    >
                      {document.file?.name}
                    </Button>
                  ))
                : null} */}
            </Box>

            <Box mx="auto" mt="xl">
              <Dropzone
                // maw={50}
                // mah={50}
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
                  mt="sm"
                  thumbSize={16}
                  defaultValue={20}
                  max={200}
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

            <Field withAsterisk label="Instrimental">
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

              <Field withAsterisk label="Price in NEAR">
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
                      ? `${value} NEAR`.replace(
                          /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                          ","
                        )
                      : "NEAR "
                  }
                  {...form.getInputProps("price")}
                />
              </Field>
            </Group>

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
                  await form.reset(); // Wait for the form reset to complete
                }}
              >
                Reset Form
              </Button>
            </Group>
          </Stack>
        </form>
      </FormProvider>
    </Card>
  );
};

export default SongForm;
