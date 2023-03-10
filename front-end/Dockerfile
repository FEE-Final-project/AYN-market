FROM node:16.13.0

WORKDIR /front-end

COPY ./package.json /front-end/
RUN yarn install

COPY . /front-end
RUN yarn build
