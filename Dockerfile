# syntax = docker/dockerfile:1

ARG UBUNTU_VERSION=24.04

FROM bufbuild/buf:latest AS buf

FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu-${UBUNTU_VERSION}

RUN \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    --mount=type=cache,target=/var/cache/apt,sharing=locked \
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt install -y nodejs

ARG USERNAME=vscode
USER ${USERNAME}

COPY --from=buf /usr/local/bin/buf /usr/local/bin/buf

WORKDIR /workspace

CMD ["/bin/bash"]
