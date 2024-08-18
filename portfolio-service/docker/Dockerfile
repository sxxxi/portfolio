FROM oven/bun:latest AS base
WORKDIR /app
COPY . .
RUN bun install

FROM base as runner
COPY --from=base . .
ENTRYPOINT bun src/index.ts
