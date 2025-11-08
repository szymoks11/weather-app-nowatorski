# Etap 1: Budowanie aplikacji
FROM node:18-alpine AS builder

WORKDIR /app

# Kopiowanie plików package.json
COPY weather-app/package*.json ./

# Instalacja zależności
RUN npm ci

# Kopiowanie kodu źródłowego
COPY weather-app/ ./

# Budowanie aplikacji Vite (tworzy folder dist/)
RUN npm run build

# Etap 2: Serwowanie aplikacji przez nginx (produkcja)
FROM nginx:alpine

# Kopiowanie zbudowanej aplikacji z etapu builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Kopiowanie konfiguracji nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Eksponowanie portu 80
EXPOSE 80

# Nginx startuje automatycznie
CMD ["nginx", "-g", "daemon off;"]
