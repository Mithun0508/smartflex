# Base image (Debian-based, ffmpeg friendly)
FROM node:20-bullseye

# Install ffmpeg
RUN apt-get update && apt-get install -y ffmpeg \
  && rm -rf /var/lib/apt/lists/*

# App directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build Next.js
RUN npm run build

# Railway default port
EXPOSE 8080

# Start app
CMD ["npm", "start"]
