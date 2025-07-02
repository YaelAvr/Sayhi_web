FROM node:20-slim

WORKDIR /usr/src/gmail-project/web-server
EXPOSE 3000


COPY package*.json ./
# COPY react-app/package*.json ./react-app/
# COPY servers/src/web/package*.json ./servers/src/web/

RUN npm install

COPY ./src ./src
COPY ./pictures ./pictures
COPY ./tempUploads ./tempUploads

# COPY react-app/ react-app/
# COPY servers/src/web/ servers/src/web/
# COPY servers/data/ servers/data/

# COPY servers/pictures/ servers/pictures/
# COPY servers/tempUploads/ servers/tempUploads/



# build react + run react & express
CMD ["npm", "run", "deploy"]