# Stage 1: build image
FROM node:20-slim AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Stage 2: definitive image
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
