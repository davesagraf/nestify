FROM node:16

WORKDIR /nestify

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

ENV API_SECRET=process.env.API_SECRET

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
