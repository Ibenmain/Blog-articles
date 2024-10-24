FROM node:18

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY prisma ./prisma
COPY . .

RUN npm install

RUN npx prisma generate


RUN npm run build

ENV NODE_ENV production
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

USER node

EXPOSE 3000

CMD ["npm", "start"]
