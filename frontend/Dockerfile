# Frontend Dockerfile (frontend folder)
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy the build files
COPY build ./build

# Copy package.json and package-lock.json if you need them for the dependencies
COPY package*.json ./

# Install only the production dependencies (if any)
RUN npm install --production

# Expose the port your app runs on (typically 3000 for a React app)
EXPOSE 3000

# Start the application using a static server (optional)
# You may use serve, http-server, or any other static file server
RUN npm install -g serve  # Install serve globally
CMD ["serve", "-s", "build", "-l", "3000"]
#Serve the build folder
