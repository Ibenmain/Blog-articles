FROM node:18

WORKDIR /Blog-articles

COPY package.json package-lock.json ./

RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

COPY . .

RUN npm run build 
RUN mkdir -p /Blog-articles/.next/cache/images && chown -R node:node /Blog-articles/.next

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

USER node

EXPOSE 3000

CMD ["npm", "start"]
