# Stage 1: Build the React app
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the built app with NGINX
FROM nginx:alpine

# Copy built files from the builder stage to NGINX's default public directory
COPY --from=builder /app/dist /usr/share/nginx/html
# For React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf  
# Expose port 80 for serving the frontend
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
