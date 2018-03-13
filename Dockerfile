FROM node:latest
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install && npm update
COPY . /app
EXPOSE 4200
CMD ["npm","start"]