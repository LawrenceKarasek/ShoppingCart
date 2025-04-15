FROM node:20.9.0-alpine

WORKDIR /app

# Install curl for wait-for-it.sh
RUN apk add --no-cache curl bash

# Copy package files and install ALL dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# script to allow database to start before accessing
# Add these lines to download the script
# Download wait-for-it.sh
RUN curl -o /wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    chmod +x /wait-for-it.sh

# Build the backend (requires devDependencies)
RUN npm run build

# Optionally, remove devDependencies to reduce image size
RUN npm prune --production

# Set NODE_ENV to production
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/main"]