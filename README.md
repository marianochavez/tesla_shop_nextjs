# Next.js Tesla Shop

Para correr localmente, crear la base de datos
```
docker-compose up -d
```

MongoDB URI local:
```
mongodb://localhost:27017/tesladb
```

Usar __.env.example__ para crear el __.env.development__ y __.env.production__ si es necesario

### Reconstruir módulos y levantar Next
```
yarn install
yarn dev
```

### LLenar base de datos con un seed
Llamar:
```
    http://localhost:3000/api/seed
```
