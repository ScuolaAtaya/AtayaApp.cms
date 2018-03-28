#step 1: build angular

FROM node:9.9-alpine as builder

WORKDIR /app
COPY package.json /app/

RUN npm install
COPY ./ /app/
#set environment
ARG env=prod
RUN npm run build -- --prod --environment ${env}

### STAGE 2: Setup ###

FROM nginx:1.13.3-alpine

COPY default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]