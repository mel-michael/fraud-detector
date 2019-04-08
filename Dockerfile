# Dockerfile
FROM node:8

WORKDIR '/usr/src/app'

RUN echo "Copying package.json for both client and server side"

COPY package.json .
COPY client/package.json client/
COPY server/package.json server/

RUN echo "Installing app dependencies"

RUN npm run app-install

RUN echo "Copying application files"

COPY . .

RUN npm start

# EXPOSE 5000
# EXPOSE 4200
# EXPOSE 27017