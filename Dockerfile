# -------- DEPENDENCIES --------
FROM node:20 AS deps

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev


# -------- RUNTIME --------
FROM node:20-slim

WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy app source
COPY . .

# App listens on 4000
EXPOSE 4000

# Run as non-root (security best practice)
USER node

CMD ["npm", "start"]
