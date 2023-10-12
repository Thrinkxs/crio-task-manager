
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all project files to the working directory
COPY . .

# Build the React app (optional)
RUN npm run build

# Expose the port that the application will run on
EXPOSE 3000

# Start the Node.js server when the container runs
CMD ["npm", "run dev"]
