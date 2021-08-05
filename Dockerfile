FROM registry-vpc.cn-hangzhou.aliyuncs.com/ifengniao/node:16-alpine3.11

LABEL maintainer "ifengniao.net"

WORKDIR /var/lib/www
COPY . /var/lib/www

RUN set -ex \
    && npm install \
    && cp /var/lib/www/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh \
    && chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 80

STOPSIGNAL SIGTERM

CMD ["pm2","start","ecosystem.config.js"]
