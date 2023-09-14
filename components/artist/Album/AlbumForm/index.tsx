import {
  Box,
  Button,
  Group,
  Paper,
  Stack,
  TextInput,
  createStyles,
} from "@mantine/core";
import { FileWithPath } from "@mantine/dropzone";
import { useForm } from "@mantine/form";

import { Dropzone } from "@/components/form/Dropzone";
import { Field } from "@/components/form/Field";
import { notifications } from "@/utils/notifications";
import { useRouter } from "next/router";

import {
  ALBUM_IMAGE_TYPES,
  CreateFormValues,
  FormProvider,
  UploadedFileValue,
} from "@/components/artist/Album/AlbumForm/AlbumContext";

import { useIsMutating } from "@tanstack/react-query";

import { getFileUrl } from "@/utils/file";

import {
  useAlbumControllerCreateAlbum,
  useFileControllerUpdateFile,
  useFileControllerUploadFile,
} from "@/services/api/raidar/raidarComponents";
import { FileDto } from "@/services/api/raidar/raidarSchemas";
import { modals } from "@mantine/modals";
import { Check } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  // card: {
  //   backgroundColor: "#F8F8FF",
  //   width: "80%",
  //   margin: "auto",
  // },
  // avatar: {
  //   border: `${rem(2)} solid ${
  //     theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
  //   }`,
  // },
}));

export const AlbumForm = (): any => {
  const router = useRouter();
  const { classes, theme } = useStyles();

  const isMutating = useIsMutating();

  const form = useForm<any>({
    validateInputOnChange: true,
    initialValues: {
      title: "",
      pka: "",
      cover_id: "",
      image: undefined,
    },
    //TODO: needs to check why validations doesn't work
    // validate: getEditFormValidateInput(),
  });

  const createAlbum = useAlbumControllerCreateAlbum({
    onMutate: () => {
      notifications.create({ title: "Creating album" });
    },
    onSuccess: () => {
      notifications.success({ title: "Album created" });
      router.push("/artist/albums");
    },
    onError: () => {
      notifications.error({ title: "Error while creating album" });
      console.error("Error while creating album");
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
          body: { file, tags: ["image"] } as any,
        });
      } else {
        response = await uploadFile.mutateAsync({
          body: {
            file,
            tags: ["image"],
          } as any,
        });
      }

      response = await uploadFile.mutateAsync({
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
          } as any,
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

  const handleSubmit = async (values: CreateFormValues) => {
    form.validate();

    if (!form.isValid) {
      return;
    }

    notifications.create({
      title: "Creating album",
    });

    const { title, pka, cover_id, image } = values;

    // const fileIds = [
    //   image?.response?.id,
    //   ...documents.map(({ response }: any) => response.id),
    // ].filter(Boolean) as string[];

    try {
      await createAlbum.mutateAsync({
        body: {
          title: title,
          pka: pka,
          cover_id: image?.response?.id || "",
        },
      });

      notifications.success({
        title: "Album sucessfully created",
      });

      modals.closeAll();
    } catch (error) {
      console.error(error);
      notifications.error({
        title: "Error while creating album",
      });
    }
  };

  return (
    <Paper
      radius="sm"
      sx={{
        overflow: "hidden",
      }}
      // className={classes.card}
    >
      <FormProvider form={form}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Box my="xl">
              <Dropzone
                title="Upload Image"
                description="Drag'n' drop the campaing banner here. Max file size is 20MB, supported formats are PNG and JPEG"
                label="Select Image"
                previewUrl={getFileUrl(form.values.image?.response)}
                error={form.getInputProps("image").error}
                isLoading={isMutating > 0}
                dropzone={{
                  multiple: false,
                  accept: ALBUM_IMAGE_TYPES,
                  onDrop: handleImageDrop,
                  disabled: isMutating > 0,
                }}
              />
            </Box>
            <Field withAsterisk label="Album Title">
              <TextInput
                mt="xs"
                placeholder="Album Title"
                {...form.getInputProps("title")}
              />
            </Field>

            <Field withAsterisk label="Artist Name">
              <TextInput
                mt="xs"
                placeholder="Artist Name"
                {...form.getInputProps("pka")}
              />
            </Field>

            <Group>
              <Button
                type="submit"
                color="red"
                leftIcon={<Check size={14} />}
                disabled={isMutating > 0}
              >
                Create Album
              </Button>
            </Group>
          </Stack>
        </form>
      </FormProvider>
    </Paper>
  );
};

export default AlbumForm;
