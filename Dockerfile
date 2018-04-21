# use the alpine image.. size is ~5MB
FROM node:8.9.1-alpine

# set the work directory directory
WORKDIR /usr/src/app

# copy files
COPY . .

# install dependencies
RUN npm install

# expose the port 3000
EXPOSE 3000

# execute the `npm start` command on a CLI
CMD ["npm", "start"]