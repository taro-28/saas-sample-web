const config = {
  project: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.js", "src/**/*.jsx"],
  ignore: ["src/gql/generated.ts", "src/components/ui/**/*.{ts,tsx}"],
  ignoreDependencies: [
    "@biomejs/biome",
    "@radix-ui/react-slot",
    "@radix-ui/react-dialog",
    "@radix-ui/react-popover",
    "cmdk",
    "class-variance-authority",
    "gzip-size",
    "mkdirp",
    "react-resizable-panels",
  ],
};

export default config;
