FROM nginx:1.27-alpine

WORKDIR /usr/share/nginx/html
COPY . /usr/share/nginx/html/

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
