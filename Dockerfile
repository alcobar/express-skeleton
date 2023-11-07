FROM node:20-bookworm-slim as base

RUN \
    apt-get update && \
    apt-get upgrade -y && \
    apt-get autoremove -y && \
    apt-get autoclean -y && \
    apt-get clean -y

FROM base as build
COPY . /build
RUN \
    cd /build && \
    yarn install --frozen-lockfile && \
    yarn build && \
    rm -rf node_modules && \
    yarn install --frozen-lockfile --production=true

FROM base
RUN \
    mkdir /opt/app && \
    groupadd -g 2000 http && \
    useradd -d /opt/app -g 2000 -u 2000 -s /bin/false http && \
    chown http.http /opt/app && \
    chmod 700 /opt/app

USER http
COPY --from=build /build/dist /opt/app
COPY --from=build /build/node_modules /opt/app/node_modules
WORKDIR /opt/app

ENV NODE_ENV production

ENTRYPOINT [ "node", "./index.js" ]
