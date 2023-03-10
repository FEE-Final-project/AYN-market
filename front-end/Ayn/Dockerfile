FROM node:16.13.0

WORKDIR /frontend

COPY ./package.json /frontend/
RUN yarn install

COPY . /front-end
RUN yarn build
