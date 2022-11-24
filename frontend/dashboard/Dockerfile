FROM node:14

RUN mkdir /frontend
WORKDIR /frontend

ADD package*.json /frontend/
RUN yarn install
RUN yarn add typescript
ADD . /frontend/

EXPOSE 3001