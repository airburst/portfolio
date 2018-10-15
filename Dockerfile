FROM nginx:alpine
WORKDIR /var/www
COPY ./build /var/www
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
VOLUME  ["/var/www", "/etc/nginx"]
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# FROM node as build-deps
# WORKDIR /usr/src/app
# COPY package.json yarn.lock ./
# RUN yarn
# COPY . ./
# RUN yarn build

# # Stage 2 - the production environment
# FROM nginx:alpine
# COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
# VOLUME  ["/usr/share/nginx/html"]
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]