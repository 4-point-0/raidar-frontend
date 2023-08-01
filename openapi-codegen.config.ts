import env from "@next/env";
import { defineConfig } from "@openapi-codegen/cli";
import {
  generateReactQueryComponents,
  generateSchemaTypes,
} from "@openapi-codegen/typescript";

const projectDir = process.cwd();
env.loadEnvConfig(projectDir);

export default defineConfig({
  raidar: {
    from: {
      source: "url",
      url: `http://raidardev.eba-pgpaxsx2.eu-central-1.elasticbeanstalk.com/swagger-json`,
    },
    outputDir: "services/api/raidar",
    to: async (context) => {
      const filenamePrefix = "raidar";
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
});
