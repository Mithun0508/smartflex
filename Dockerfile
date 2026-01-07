FROM node:20-bullseye

# Install ffmpeg
RUN apt-get update && apt-get install -y ffmpeg \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 8080
CMD ["npm", "start"]
