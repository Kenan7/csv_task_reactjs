# Base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy app files
COPY . .

# Build app
RUN npm run build

# Start app
CMD ["npm", "start"]
