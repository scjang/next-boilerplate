FROM node:16.8-alpine

ENV HOME=/home/app
ENV APP_DIR=$HOME
WORKDIR $APP_DIR

COPY ./ $APP_DIR/

RUN apk update \
  && apk add tzdata bash --no-cache \
  && yarn install \
  && yarn build \
  && yarn cache clean --force

EXPOSE 9000
CMD ["yarn", "start"]
