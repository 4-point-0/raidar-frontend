import { MantineThemeOverride } from "@mantine/core";

export const raidarTheme: MantineThemeOverride = {
  colorScheme: "light",
  colors: {
    raidarRed: ["#000000"],
  },
  components: {
    Button: {
      defaultProps: {
        color: "#ff6b6b",
      },
    },
  },
};
