###################
# PRODUCTION
###################

FROM node:lts-alpine3.20 As production

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY  package*.json ./

# Install dependencies
RUN npm ci --only=production

COPY dist dist

# Start the server using the production build
CMD [ "node", "dist/src/main.js" ]