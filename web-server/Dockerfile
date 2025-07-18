FROM node:20-slim

WORKDIR /usr/src/gmail-project/web-server
EXPOSE 3000

COPY package*.json ./

RUN npm install

COPY ./src ./src
COPY ./pictures ./pictures
COPY ./tempUploads ./tempUploads

# build react + run react & express
CMD ["npm", "start"]