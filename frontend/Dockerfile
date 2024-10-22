# Frontend Dockerfile (frontend folder)
FROM node:20

# Set working directory
WORKDIR /app

# Copy frontend code
COPY . .

# Install dependencies and build the app
RUN npm install && npm run build

# Expose port 3000
EXPOSE 3000

CMD ["npm", "start"]
