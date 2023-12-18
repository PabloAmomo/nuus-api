# 0. Specify the base image
FROM node:14

# 1. Define the PORT number as a build argument
ARG PORT=8080

# 2. Define the working directory inside the container
WORKDIR /usr/src/app

# 3. Copy the 'package.json' file and, if it exists, 'package-lock.json'
COPY package*.json ./

# 4. Install the project dependencies
RUN npm install

# 5. Copy the application files to the working directory
COPY build/ .

# 6. Expose the port on which the application will run
EXPOSE $PORT

# 7. Run the application
CMD ["node", "server.js"]
