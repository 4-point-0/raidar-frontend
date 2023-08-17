import {
  TextInput,
  Box,
  Button,
  rem,
  createStyles,
  Container,
  SimpleGrid,
  Grid,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { FileWithPath } from "@mantine/dropzone";

import { Field } from "@/components/form/Field";
import { Dropzone } from "@/components/form/Dropzone";
import { notifications } from "@/utils/notifications";
import { useRouter } from "next/router";

import { getEditFormValidateInput } from "@/utils/validations";
import {
  UploadedFileValue,
  CreateFormValues,
  FormProvider,
  ALBUM_IMAGE_TYPES,
} from "@/components/artist/Album/AlbumForm/AlbumContext";

import { useIsMutating } from "@tanstack/react-query";

import { getFileUrl } from "@/utils/file";

import { Check, Trash } from "tabler-icons-react";
import {
  useAlbumControllerCreateAlbum,
  useFileControllerRemove,
  useFileControllerUpdateFile,
  useFileControllerUploadFile,
} from "@/services/api/raidar/raidarComponents";
import { FileDto } from "@/services/api/raidar/raidarSchemas";

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

export const AlbumForm = (): any => {
  const router = useRouter();
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
      title: "Creating album",
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
        title: "Album sucessfully created",
      });
    } catch (error) {
      console.error(error);
      notifications.error({
        title: "Error while creating album",
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
            cols={2}
            spacing="md"
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
          >
            <Dropzone
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
                  <Field withAsterisk label="Album Title">
                    <TextInput mt="xs" {...form.getInputProps("title")} />
                  </Field>
                  <Field withAsterisk label="Artist Name" mt="lg">
                    <TextInput mt="xs" {...form.getInputProps("pka")} />
                  </Field>
                </Box>
              </Grid.Col>
              <Grid.Col span={4}>
                <Box h={SECONDARY_COL_HEIGHT}>
                  <Button
                    className={classes.button}
                    type="submit"
                    leftIcon={<Check size={14} />}
                    disabled={isMutating > 0}
                  >
                    Create Album
                  </Button>
                </Box>
              </Grid.Col>
              <Grid.Col span={4}>
                <Box h={SECONDARY_COL_HEIGHT}>
                  <Button
                    className={classes.button}
                    type="submit"
                    color="red"
                    leftIcon={<Trash size={14} />}
                    disabled={isMutating > 0}
                  >
                    ResetForm
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
