FROM node:16.14.2
MAINTAINER pysga1996
WORKDIR /opt/pixie-chat-service
COPY ./package.json /opt/pixie-chat-service/
RUN npm install
RUN mkdir dist
ENTRYPOINT ["node"]
CMD ["dist/main"]
VOLUME /opt/pixie-chat-service/dist
#VOLUME /opt/pixie-chat-service/node_modules
EXPOSE 3000
