import { Input, InputWrapperProps } from "@mantine/core";

export const Field = (props: InputWrapperProps) => {
  return (
    <Input.Wrapper
      styles={{
        label: {
          fontWeight: 700,
          fontSize: 16,
        },
      }}
      {...props}
    />
  );
};
