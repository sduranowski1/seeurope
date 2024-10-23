# Frontend Dockerfile (frontend folder)
# Use a lightweight Node.js image
FROM node:20-slim AS builder

# Set working directory
WORKDIR /app

# Copy only the package.json and package-lock.json first to leverage Docker layer caching
COPY package*.json ./

# Install only production dependencies first
RUN npm install --production

# Install the Babel plugin
RUN npm install @babel/plugin-transform-private-property-in-object --save-dev

# Copy the rest of the application code
COPY . .

# Install dependencies and build the app
RUN npm install && npm run build

# Expose port 3000
EXPOSE 3000

CMD ["npm", "start"]
