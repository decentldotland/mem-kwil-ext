import { ExtensionBuilder, InitializeFn } from "@kwilteam/extensions";

import { write } from "./utils/mem";
const initialize: InitializeFn = async (metadata: Record<string, string>) => {
  return metadata;
};

function buildServer(): void {
  const server = new ExtensionBuilder()
    .named("mem_kwil")
    .withInitializer(initialize)
    .withMethods({
      write,
    })
    .build();

  process.on("SIGINT", () => {
    server.stop();
  });

  process.on("SIGTERM", () => {
    server.stop();
  });
}

buildServer();
