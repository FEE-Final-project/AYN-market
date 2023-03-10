FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*

COPY ./nginx/nginx.conf /etc/nginx/conf.d/
COPY ./nginx/robots.txt /
COPY ./nginx/loaderio-88afa66c551daefa94fec7104e4d09bd.txt /
