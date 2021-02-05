FROM node:alpine
ENV CI=true

WORKDIR /app
COPY package.json .
RUN npm install --only=prod --force
COPY . .

CMD [ "npm", "start" ]