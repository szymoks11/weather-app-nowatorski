# Etap 1: Budowanie aplikacji
FROM node:20-alpine AS builder

WORKDIR /app

# Kopiowanie plików package.json
COPY weather-app/package*.json ./

# Instalacja zależności
RUN npm ci

# Kopiowanie kodu źródłowego
COPY weather-app/ ./

# DEBUG - sprawdź strukturę
RUN echo "=== Checking file structure ===" && \
    ls -la && \
    echo "=== Checking src ===" && \
    ls -la src/ && \
    echo "=== Checking package.json ===" && \
    cat package.json

# DODAJ TE LINIE - Przekazanie klucza API do Vite
ARG VITE_OPENWEATHER_API_KEY
ENV VITE_OPENWEATHER_API_KEY=$VITE_OPENWEATHER_API_KEY

# Budowanie aplikacji Vite (tworzy folder dist/) - z więcej szczegółów
RUN npm run build -- --logLevel=info

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