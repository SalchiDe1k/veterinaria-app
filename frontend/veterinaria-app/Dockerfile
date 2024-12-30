# Etapa 1: Construcción
FROM node:current-alpine3.21 AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./ 

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Etapa 2: Producción
FROM node:current-alpine3.21

# Establecer el directorio de trabajo
WORKDIR /app

# Instalar solo las dependencias necesarias para producción
COPY package.json package-lock.json ./
RUN npm install --production

# Copiar los archivos necesarios del builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./

# Exponer el puerto que usará Next.js
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
