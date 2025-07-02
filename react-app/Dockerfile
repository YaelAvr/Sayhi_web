# Stage 1: Build the React app
FROM node:18-alpine AS build

WORKDIR /usr/src/gmail-project/react-app

EXPOSE 3000

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]

# Stage 2: Serve the static files with a lightweight server
FROM nginx:stable-alpine
COPY --from=build /usr/src/gmail-project/react-app/build /usr/share/nginx/html
EXPOSE 80
