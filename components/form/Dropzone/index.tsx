import { useRef, useState } from "react";

import {
  Box,
  Button,
  Group,
  Image,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";

import {
  FileWithPath,
  Dropzone as MantineDropzone,
  DropzoneProps as MantineDropzoneProps,
} from "@mantine/dropzone";

import { Check, Upload, X } from "tabler-icons-react";

import { MAX_FILE_SIZE } from "@/components/artist/Album/AlbumForm/AlbumContext";

interface DropzoneProps extends Partial<MantineDropzoneProps> {
  title: string;
  description: string;
  label: string;
  error?: string;
  previewUrl?: string;
  formValue?: FileWithPath[];
  isLoading: boolean;
  dropzone: Omit<MantineDropzoneProps, "children">;
  isSong: boolean;
}

export const Dropzone = ({
  title,
  description,
  label,
  error,
  previewUrl,
  dropzone,
  isLoading,
  isSong,
}: DropzoneProps) => {
  const [aspectRatio, setAspectRatio] = useState<number>();
  const openRef = useRef<() => void>(null);
  const theme = useMantineTheme();
  const [uploadedImage, setUploadedImage] = useState<boolean>(false);

  const { onDrop, ...rest } = dropzone;

  const handleDrop = (files: FileWithPath[]) => {
    onDrop(files);
  };

  const handlePreviewLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.target as HTMLImageElement;
    setUploadedImage(true);
    setAspectRatio(img.naturalWidth / img.naturalHeight);
  };

  return (
    <Box
      sx={{
        position: "relative",
        aspectRatio: aspectRatio ? `${aspectRatio}` : undefined,
      }}
    >
      {previewUrl && (
        <Image
          src={previewUrl}
          sx={{ position: "absolute" }}
          onLoad={handlePreviewLoad}
          alt=""
          radius="xl"
        />
      )}
      <MantineDropzone
        styles={{
          root: {
            height: "100%",
            borderRadius: 32,
            paddingBottom: 32,
            borderColor: error ? theme.colors.red[6] : undefined,
            borderWidth: 1,
            background: uploadedImage ? "transparent !important" : undefined,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          inner: { pointerEvents: "all" },
        }}
        onDrop={handleDrop}
        maxSize={MAX_FILE_SIZE}
        {...rest}
      >
        <Box
          sx={{
            color: error
              ? theme.colors.red[6]
              : previewUrl
              ? theme.white
              : theme.colors.dark[9],
            backgroundColor:
              previewUrl && theme.fn.rgba(theme.colors.gray[8], 0.5),
            margin: "0 auto",
            borderRadius: theme.radius.xl,
            padding: theme.spacing.sm,
          }}
        >
          <Stack
            align="center"
            spacing="xs"
            style={{ margin: "0 auto", pointerEvents: "none" }}
          >
            <MantineDropzone.Accept>
              <Upload size={50} color={theme.colors[theme.primaryColor][6]} />
              <Check size={50} color={theme.colors[theme.primaryColor][6]} />
            </MantineDropzone.Accept>
            <MantineDropzone.Reject>
              <X size={50} color="red.6" />
            </MantineDropzone.Reject>
            <MantineDropzone.Idle>
              {/* <Photo size={50} /> */}
            </MantineDropzone.Idle>

            <Text size="xl" inline color="gray.6">
              {previewUrl && isSong ? `SONG UPLOADED SUCCESSFULLY` : title}
            </Text>
            <Text size="sm" inline mt={7} color="gray.6">
              {previewUrl && isSong ? <Check size={25} /> : description}
            </Text>
          </Stack>
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            transform: "translateY(50%)",
          }}
        >
          <Group position="center">
            <Button
              color="red"
              onClick={() => openRef.current?.()}
              loading={isLoading}
            >
              {label}
            </Button>
          </Group>
        </Box>
      </MantineDropzone>
      {error && (
        <Text size="xs" color="red.6">
          {error}
        </Text>
      )}
    </Box>
  );
};
