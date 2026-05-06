<<<<<<< HEAD
FROM node:18-alpine AS build
=======
# Stage 1 - Build React app
FROM node:18-alpine as build
>>>>>>> bfee763af2c2f276ef5af5966d74fa34f7e5b01a
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

<<<<<<< HEAD
=======
# Stage 2 - Serve with nginx
>>>>>>> bfee763af2c2f276ef5af5966d74fa34f7e5b01a
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
