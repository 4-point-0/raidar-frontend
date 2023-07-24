import {
  TextInput,
  Stack,
  Box,
  Group,
  Button,
  Card,
  rem,
  createStyles,
  Switch,
  NumberInput,
} from "@mantine/core";
import { Calendar } from "@mantine/dates";

import { useForm } from "@mantine/form";
import { FileWithPath } from "@mantine/dropzone";

import { Field } from "@/components/form/Field";
import { Dropzone } from "@/components/form/Dropzone";
import { notifications } from "@/utils/notifications";
import { useRouter } from "next/router";

import { getEditFormValidateInput } from "@/utils/validations";
import { CreateSongDto, FileDto } from "@/services/api/artist/artistSchemas";
import {
  UploadedFileValue,
  CreateFormValues,
  FormProvider,
  SONG_IMAGE_TYPES,
  SONG_AUDIO_TYPES,
} from "@/components/artist/Song/SongForm/SongContext";
import {
  useAlbumControllerFindOne,
  useFileControllerUpdateFile,
  useFileControllerUploadFile,
  useSongControllerCreate,
} from "@/services/api/artist/artistComponents";

import { useIsMutating } from "@tanstack/react-query";

import { getFileUrl } from "@/utils/file";

import { Check } from "tabler-icons-react";
import { useState } from "react";
import dayjs from "dayjs";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: "#F8F8FF",
    width: "80%",
    margin: "auto",
  },

  avatar: {
    border: `${rem(2)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`,
  },
}));

export const SongForm = (): any => {
  const [selectedDate, setSelectedDate] = useState<Date[]>([]);

  const router = useRouter();
  const { classes } = useStyles();
  const albumId = router.query.id;

  const { data: albumData } = useAlbumControllerFindOne({
    pathParams: {
      id: albumId as string,
    },
  });

  console.log("data", albumData);

  const isMutating = useIsMutating();

  const handleSelect = (date: Date) => {
    const isSelected = selectedDate.some((s) => dayjs(date).isSame(s, "date"));
    if (isSelected) {
      setSelectedDate((current) =>
        current.filter((d) => !dayjs(d).isSame(date, "date"))
      );
    } else if (selectedDate.length < 3) {
      setSelectedDate((current) => [...current, date]);
    }
  };

  const form = useForm<any>({
    validateInputOnChange: true,
    initialValues: {
      title: "",
      album_id: "",
      genre: "",
      mood: "",
      tags: "",
      length: 0,
      bpm: 0,
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

  const createSong = useSongControllerCreate({
    onMutate: () => {
      notifications.create({ title: "Creating song" });
    },
    onSuccess: () => {
      notifications.success({ title: "Song created" });
      // router.push("artist/collection");
    },
    onError: () => {
      notifications.error({ title: "Error while creating album" });
    },
  });

  const updateFile = useFileControllerUpdateFile({});
  const uploadFile = useFileControllerUploadFile({});

  const { documents } = form.values;

  const handleImageDrop = async (files: FileWithPath[]) => {
    const file = files[0];
    const previousResponse = form.values.image?.response;

    try {
      let response: FileDto;

      if (previousResponse) {
        response = await updateFile.mutateAsync({
          pathParams: {
            id: previousResponse.id,
          },
          body: { file, tags: ["image"] },
        });
      } else {
        response = await uploadFile.mutateAsync({
          body: {
            file,
            tags: ["image"],
          },
        });
      }

      response = await uploadFile.mutateAsync({
        body: {
          file,
          tags: ["image"],
        },
      });

      form.setFieldValue("image", {
        file,
        response,
      });
    } catch (error) {
      form.setFieldError("image", "Failed to upload image");
      console.error(error);
    }
  };

  const handleDocumentsDrop = async (files: FileWithPath[]) => {
    const previous = documents;

    const uniqueFiles = files.filter(({ path }) => {
      return !documents.some((document: any) => document.file?.path === path);
    });

    const response = await Promise.all(
      uniqueFiles.map((file) => {
        return uploadFile.mutateAsync({
          body: {
            file,
            tags: ["document"],
          },
        });
      })
    );

    const newDocuments: UploadedFileValue[] = uniqueFiles.map((file, i) => {
      return {
        file,
        response: response[i] as unknown as FileDto,
      };
    });

    form.setFieldValue("documents", previous.concat(...newDocuments));
  };

  const handleRemove = (file: UploadedFileValue) => {
    return () => {
      form.setFieldValue(
        "documents",
        documents.filter((document: any) => document !== file)
      );
    };
  };

  const handleSongDrop = async (files: FileWithPath[]) => {
    const file = files[0];
    const previousResponse = form.values.song?.response;

    try {
      let response: FileDto;

      if (previousResponse) {
        response = await updateFile.mutateAsync({
          pathParams: {
            id: previousResponse.id,
          },
          body: { file, tags: ["song"] },
        });
      } else {
        response = await uploadFile.mutateAsync({
          body: {
            file,
            tags: ["song"],
          },
        });
      }

      response = await uploadFile.mutateAsync({
        body: {
          file,
          tags: ["song"],
        },
      });

      form.setFieldValue("song", {
        file,
        response,
      });
    } catch (error) {
      form.setFieldError("song", "Failed to upload song");
      console.error(error);
    }
  };

  const handleSubmit = async (values: CreateFormValues) => {
    form.validate();

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
      musicId,
      recordingDate,
      recordingCountry,
      recordingLocation,
      price,
      image,
      song,
    } = values;

    console.log("title", title);
    console.log("genre", genre);
    console.log("mood", mood);
    console.log("title", title);
    console.log("tags", tags);
    console.log("length", length);
    console.log("bpm", bpm);
    console.log("instrumental", instrumental);
    console.log("languages", languages);
    console.log("vocal_ranges", vocalRanges);
    console.log("musical_key", musicalKey);
    console.log("recording_date", selectedDate[0]);
    console.log("recording_country", recordingCountry);
    console.log("recording_location", recordingLocation);
    console.log("price", price);
    console.log("image", image);
    console.log("song", song);

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
          instrumental: true,
          languages: [languages],
          vocal_ranges: [vocalRanges],
          musical_key: musicalKey,
          music_id: song?.response?.id as string,
          recording_date: `2023-07-17T10:39:43.582Z`,
          recording_country: recordingCountry,
          recording_location: recordingLocation,
          art_id: image?.response?.id as string,
          pka: albumData?.pka || "",
          price: 10.0,
        },
      });

      notifications.success({
        title: "Album sucessfully created",
      });
    } catch (error) {
      console.error(error);
      notifications.error({
        title: "Error while creating album",
      });
    }
  };

  return (
    <Card
      withBorder
      padding="xl"
      radius="xl"
      shadow="sm"
      className={classes.card}
    >
      <FormProvider form={form}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Box my="xl">
              <Dropzone
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
            </Box>

            <Box my="xl">
              <Dropzone
                title="Upload Song"
                description="Drag'n' drop the audio file here. Max file size is 20MB, supported formats are PNG and JPEG"
                label="Select Audio"
                previewUrl={getFileUrl(form.values.song?.response)}
                error={form.getInputProps("song").error}
                isLoading={isMutating > 0}
                dropzone={{
                  multiple: false,
                  // accept: SONG_AUDIO_TYPES,
                  onDrop: handleSongDrop,
                  disabled: isMutating > 0,
                }}
              />
            </Box>
            <Group>
              <Field withAsterisk label="Song Title">
                <TextInput
                  mt="xs"
                  placeholder="Song Title"
                  {...form.getInputProps("title")}
                />
              </Field>

              <Field withAsterisk label="Genre">
                <TextInput
                  mt="xs"
                  placeholder="Genre"
                  {...form.getInputProps("genre")}
                />
              </Field>
            </Group>

            <Field withAsterisk label="Mood">
              <TextInput
                mt="xs"
                placeholder="mood"
                {...form.getInputProps("mood")}
              />
            </Field>

            <Field withAsterisk label="tags">
              <TextInput
                mt="xs"
                placeholder="tags"
                {...form.getInputProps("tags")}
              />
            </Field>

            <Group>
              <Field withAsterisk label="length">
                <TextInput
                  mt="xs"
                  placeholder="length"
                  {...form.getInputProps("length")}
                />
              </Field>

              <Field withAsterisk label="bpm">
                <TextInput
                  mt="xs"
                  placeholder="bpm"
                  {...form.getInputProps("bpm")}
                />
              </Field>
            </Group>

            <Field withAsterisk label="Recording Date">
              <Calendar
                getDayProps={(date) => ({
                  selected: selectedDate.some((s) =>
                    dayjs(date).isSame(s, "date")
                  ),
                  onClick: () => handleSelect(date),
                })}
              />
            </Field>

            <Field withAsterisk label="Instrimental">
              <Switch
                label="Instrumental"
                {...form.getInputProps("instrumental")}
              />
            </Field>

            <Field withAsterisk label="Languages">
              <TextInput
                mt="xs"
                placeholder="Languages"
                {...form.getInputProps("languages")}
              />
            </Field>

            <Field withAsterisk label="Vocal Ranges">
              <TextInput
                mt="xs"
                placeholder="Vocal Ranges"
                {...form.getInputProps("vocalRanges")}
              />
            </Field>

            <Group>
              <Field withAsterisk label="Musical key">
                <TextInput
                  mt="xs"
                  placeholder="Musical key"
                  {...form.getInputProps("musicalKey")}
                />
              </Field>

              {/* <Field withAsterisk label="">
              <Calendar />
            </Field> */}

              <Field withAsterisk label="Recording Country">
                <TextInput
                  mt="xs"
                  placeholder="Recording Country"
                  {...form.getInputProps("recordingCountry")}
                />
              </Field>

              <Field withAsterisk label="Recording Location">
                <TextInput
                  mt="xs"
                  placeholder="Recording Location"
                  {...form.getInputProps("recordingLocation")}
                />
              </Field>

              <Field withAsterisk label="Price">
                <NumberInput
                  mt="xs"
                  placeholder="Price"
                  {...form.getInputProps("price")}
                />
              </Field>
            </Group>

            <Group>
              <Button
                type="submit"
                color="red"
                leftIcon={<Check size={14} />}
                disabled={isMutating > 0}
              >
                Create Song
              </Button>
            </Group>
          </Stack>
        </form>
      </FormProvider>
    </Card>
  );
};

export default SongForm;