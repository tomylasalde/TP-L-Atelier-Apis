# TP APIS

Este proyecto es una API REST construida con Node.js, Express y MongoDB, diseñada para gestionar platos, usuarios, pedidos y auditorías de un restaurante. Incluye autenticación JWT, subida de imágenes, y documentación Swagger.

# Requisitos previos

Node.js (v16 o superior)

MongoDB (local o Atlas)

Git

# Instalación

-Clonar el repositorio
-Instalar dependencias: npm install

Crear archivo .env con esta información:

PORT=4000
MONGO_URI=mongodb://localhost:27017/restaurante
JWT_SECRET=miclavesupersecreta

# Ejecutar el servidor en la carpeta /backend

npm start

El servidor estará corriendo en: http://localhost:4000

# Ejecutar el front desde /tp-apis

npm start

# Igresar a /admin

mail: adminprofe@admin.com
password: admin123

# Documentación Swagger

http://localhost:4000/api-docs
