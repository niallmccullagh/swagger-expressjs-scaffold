FROM 7.4.0-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json /app/package.json
RUN npm install

COPY . /app

ENV PORT 10010
EXPOSE 10010

ENTRYPOINT ["node"]
CMD ["app.js"]
