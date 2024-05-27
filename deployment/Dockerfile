# Start with the official Node.js image.
FROM node:22-bookworm

# Set the working directory in the Docker container.
WORKDIR /app

COPY ./package*.json .


RUN npm install --production

COPY . .

# Build the Next.js application.
RUN npm run build


# Expose port 3000 in the Docker container.
EXPOSE 3000

# Start the Next.js application.
CMD ["npm", "start"]
