import {
  Box,
  Button,
  Container,
  Grid,
  SimpleGrid,
  TextInput,
  createStyles,
  rem,
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
  useFileControllerRemove,
  useFileControllerUpdateFile,
  useFileControllerUploadFile,
} from "@/services/api/raidar/raidarComponents";
import { FileDto } from "@/services/api/raidar/raidarSchemas";
import { modals } from "@mantine/modals";
import { Check, Trash } from "tabler-icons-react";

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
  button: {
    backgroundColor: theme.colors.red[5],
    ...theme.fn.hover({
      backgroundColor: theme.colors.red[8],
    }),
  },
}));

export const AlbumForm = ({ setNewAlbumCreated = () => {} }: any): any => {
  const { classes, theme } = useStyles();
  const removeFile = useFileControllerRemove({});

  const isMutating = useIsMutating();

  const form = useForm<any>({
    validateInputOnChange: true,
    initialValues: {
      title: "",
      pka: "",
      cover_id: "",
      image: undefined,
    },
  });

  const createAlbum = useAlbumControllerCreateAlbum({
    onMutate: () => {
      notifications.create({ title: "Creating playlist" });
    },
    onSuccess: () => {
      notifications.success({ title: "Playlist created" });
      setNewAlbumCreated(true);
    },
    onError: () => {
      notifications.error({ title: "Error while creating playlist" });
      console.error("Error while creating playlist");
    },
  });

  const updateFile = useFileControllerUpdateFile({});
  const uploadFile = useFileControllerUploadFile({});

  const { documents } = form.values;

  const handleImageDrop = async (files: FileWithPath[]) => {
    const file = files[0];

    const { image } = form.values;

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
      title: "Creating Playlist",
    });

    const { title, pka, image } = values;

    try {
      await createAlbum.mutateAsync({
        body: {
          title: title,
          pka: pka,
          cover_id: image?.response?.id || "",
        },
      });

      notifications.success({
        title: "Playlist sucessfully created",
      });

      modals.closeAll();
    } catch (error) {
      console.error(error);
      notifications.error({
        title: "Error while creating Playlist",
      });
    }
  };

  const PRIMARY_COL_HEIGHT = rem(400);

  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;

  return (
    <Container my="md" mt={200}>
      <FormProvider form={form}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <SimpleGrid
            mt="5%"
            cols={1}
            spacing="md"
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
          >
            <Dropzone
              isSong={false}
              title="Upload Image"
              maw={PRIMARY_COL_HEIGHT}
              mah={PRIMARY_COL_HEIGHT}
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
            <Grid gutter="md">
              <Grid.Col>
                <Box h={SECONDARY_COL_HEIGHT}>
                  <Field withAsterisk label="Playlist Title">
                    <TextInput mt="xs" {...form.getInputProps("title")} />
                  </Field>
                  <Field withAsterisk label="Artist Name" mt="lg">
                    <TextInput mt="xs" {...form.getInputProps("pka")} />
                  </Field>
                </Box>
              </Grid.Col>
              <Grid.Col span={5}>
                <Box h={SECONDARY_COL_HEIGHT}>
                  <Button
                    className={classes.button}
                    type="submit"
                    leftIcon={<Check size={14} />}
                    disabled={isMutating > 0}
                  >
                    Create Playlist
                  </Button>
                </Box>
              </Grid.Col>
              <Grid.Col span={5}>
                <Box h={SECONDARY_COL_HEIGHT}>
                  <Button
                    className={classes.button}
                    type="submit"
                    color="red"
                    leftIcon={<Trash size={14} />}
                    disabled={isMutating > 0}
                  >
                    Reset Form
                  </Button>
                </Box>
              </Grid.Col>
            </Grid>
          </SimpleGrid>
        </form>
      </FormProvider>
    </Container>
  );
};

export default AlbumForm;
