FROM node:16.3.0

WORKDIR /Container

ENV PORT 5000

COPY package.json /Container/package.json

RUN npm install --production

COPY . /Container/

CMD ["npm", "start"]