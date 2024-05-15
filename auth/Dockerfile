FROM node:alpine

RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app
ARG PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING="1"
WORKDIR /usr/src/node-app

COPY package.json yarn.lock ./
COPY ./prisma prisma

USER node
ARG PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING="1"
RUN yarn install --pure-lockfile
RUN npx prisma generate
COPY --chown=node:node . .

EXPOSE 3000