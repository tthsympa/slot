FROM node:14.4-stretch as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn --pure-lockfile

# Bundle app source
COPY . .

RUN yarn build

EXPOSE 5000
CMD [ "npx", "serve", "-s", "-l", "5000", "build" ]
