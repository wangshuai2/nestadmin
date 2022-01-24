FROM node:16

RUN node -v

RUN npm -v

RUN mkdir -p /data/nestadmin

ADD ./ /data/nestadmin

WORKDIR /data/nestadmin

RUN yarn install

RUN npm run build


ENV HOST 0.0.0.0
ENV PORT 8910

EXPOSE 8910

CMD ["node", "dist/main.js"]