# Tesla Shop

Ecommerce para venta de indumentaria creado con Nextjs, Chakra UI y MongoDB; NextAuth para la autenticación, Cloudinary para la subida de imágenes, Paypal para el pago, entre otras.

## Deploy
https://tesla-shop-nextjs.vercel.app/

## Local
Para correr localmente, crear la base de datos
```
docker-compose up -d
```

MongoDB URI local:
```
mongodb://localhost:27017/tesladb
```

Usar __.env.example__ para crear el __.env.development__ y __.env.production__ si es necesario

## Reconstruir módulos y levantar Next
```
yarn install
yarn dev
```

## Llenar base de datos con un seed
Llamar (sólo en desarrollo):
```
http://localhost:3000/api/seed
```
## Algunos Endpoints

https://documenter.getpostman.com/view/15545641/VUjLLnSC