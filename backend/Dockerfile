# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package*.json ./

RUN npm install --verbose

COPY ./src ./src
COPY app.js ./

RUN npm install -g nodemon

EXPOSE 6200

# start app
CMD ["npm", "start"]
