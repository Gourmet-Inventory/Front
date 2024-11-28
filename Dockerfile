FROM node:18-alpine AS build-react

RUN apk add --no-cache git

WORKDIR /app

RUN git clone https://github.com/Gourmet-Inventory/Front.git .

WORKDIR /app/gourmet-inventory

RUN npm install axios react-router-dom react-toastify

RUN npm run build

#RUN ls -la /app/gourmet-inventory
#RUN ls -la /app/gourmet-inventory/build
#RUN ls -la /app/gourmet-inventory/build/static

FROM nginx:stable-alpine AS serve-nginx

COPY default.conf /etc/nginx/conf.d/default.conf

COPY --from=build-react /app/gourmet-inventory/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

