# Frontend Dockerfile (frontend folder)
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache for dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Install the Babel plugin
RUN npm install @babel/plugin-transform-private-property-in-object --save-dev

# Copy frontend code after dependencies are installed
COPY . .

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
