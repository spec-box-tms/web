FROM node:18.12.1-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

RUN npm run build

FROM nginx

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

COPY nginx.conf /etc/nginx/nginx.conf
