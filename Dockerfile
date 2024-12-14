#define the node verson base image for the application 
FROM node:20-alpine

#define the working directory
WORKDIR /app

#copy the pacakage.json files
COPY ./package*.json ./

#install the dependiences
RUN npm install

#copy the rest of the files/codes
COPY . .

#run the app
CMD ["npm","start"]