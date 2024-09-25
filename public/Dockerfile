# 1. Verwende ein Node.js-Basisimage
FROM node:18

# 2. Arbeitsverzeichnis im Container festlegen
WORKDIR /app

# 3. Kopiere package.json und package-lock.json
COPY package*.json ./

# 4. Installiere die Abhängigkeiten
RUN npm install
RUN npm install express

# 5. Kopiere den Rest des App-Codes
COPY . .

# 6. Exponiere den Port des Microservices
EXPOSE 3003

# 7. Startbefehl für die App
CMD ["node", "src/index.js"]
