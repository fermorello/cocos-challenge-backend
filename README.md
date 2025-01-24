# Cocos Challenge Backend

### Summary
This project is an API that allows obtaining information about user portfolios, searching for assets, and sending orders to the market. The API supports MARKET and LIMIT buy and sell orders.

### Project Structure

```
.env
.gitignore
docker-compose.yml
dockerfile
jest.config.js
package.json
prisma/
  schema.prisma
README.md
routes.postman_collection.json
src/
  config/
    base.entity.ts
    base.router.ts
    base.service.ts
    config.ts
    repository.interface.ts
  instruments/
    controller/
    dto/
    entities/
    interfaces/
    repository/
    router/
    services/
  marketdata/
    controllers/
    dto/
    entities/
    interfaces/
    repositories/
    services/
  orders/
    controller/
    dto/
    entities/
    interfaces/
    repositories/
    router/
    services/
  portfolio/
    interfaces/
    services/
    utils/
  server.ts
  shared/
    errors/
    instances/
    middleware/
    response/
  tests/
    services/
  users/
    controller/
    dto/
    entities/
    interfaces/
    repositories/
    router/
    services/
tsconfig.json
```

## Installation

1. Clone the repository:

```
git clone https://github.com/fermorello/cocos-challenge-backend.git
cd be-cocos
```

2. Install the dependencies:

```
npm install
```

3. Configure the environment variables in the .env file

```
PORT=
DATABASE_URL=
```

4. Generate the Prisma client:

```
npx prisma generate
```

## Usage

### Development
To start the server in development mode:

```
npx run dev
```

### Production
To build and run the server in production:

```
npm run build
npm start
```

### Docker
To run the project using Docker:

```
docker-compose up --build
```

## Endpoints

- Portfolio
  - **GET /api/users/portfolio?userId=1**
    - Retrieves the portfolio of a user.
- Instruments
  - **GET /api/instrument/search?q=TECO**
    - Searches for instruments by name or ticker.
- Orders
  - **POST /api/orders**
    - Sends a new order to the market
    - Body:
      ```
      {
        "instrumentId": 54,
        "userId": 1,
        "side": "BUY",
        "type": "LIMIT",
        "size": 1,
        "price": 150
      }
      ```
  - **DELETE /api/orders**
    - Cancels an order with status "NEW"
    - Body:
      ```
      {
          "userId": 1,
          "orderId": 12
      }
      ```

## Tests
To run the tests:
```
npm test
```

## Folder Structure

config/: Base project configuration.
instruments/: Instruments module.
marketdata/: Market data module.
orders/: Orders module.
portfolio/: Portfolio module.
shared/: Shared code between modules.
tests/: Project tests.
users/: Users module.

## Database
The database schema is located in "schema.prisma".

## Considerations

### Functional Considerations
Asset prices are in pesos.
MARKET orders are executed immediately.
LIMIT orders are created with status NEW.
Only orders with status NEW can be canceled.
Transfers are modeled as orders with side CASH_IN or CASH_OUT.

### Technical Considerations
The API is developed with Node.js and Express.
Prisma is used as ORM.
Data is validated with Zod.
Errors are handled with Express middlewares.

## Improvement Considerations

1. Authentication and Authorization
2. Data Caching
3. Order Service Scalability
4. Parallel Processing with Queues
5. Monitoring and Logging

## Postman Collection
The Postman collection is located in routes.postman_collection.json.


# Cocos Challange Backend

### Resumen
Este proyecto es una API que permite obtener información sobre portafolios de usuarios, buscar activos y enviar órdenes al mercado. La API soporta órdenes de compra y venta de tipo MARKET y LIMIT.

### Estructura del Proyecto

```
.env
.gitignore
docker-compose.yml
dockerfile
jest.config.js
package.json
prisma/
  schema.prisma
README.md
routes.postman_collection.json
src/
  config/
    base.entity.ts
    base.router.ts
    base.service.ts
    config.ts
    repository.interface.ts
  instruments/
    controller/
    dto/
    entities/
    interfaces/
    repository/
    router/
    services/
  marketdata/
    controllers/
    dto/
    entities/
    interfaces/
    repositories/
    services/
  orders/
    controller/
    dto/
    entities/
    interfaces/
    repositories/
    router/
    services/
  portfolio/
    interfaces/
    services/
    utils/
  server.ts
  shared/
    errors/
    instances/
    middleware/
    response/
  tests/
    services/
  users/
    controller/
    dto/
    entities/
    interfaces/
    repositories/
    router/
    services/
tsconfig.json
```

## Instalación

1. Clonar el repositorio:

```
git clone https://github.com/fermorello/cocos-challenge-backend.git
cd be-cocos
```

2. Instalar las dependencias: 

```
npm install
```

3. Configurar las variables de entorno del archivo .env

```
PORT=
DATABASE_URL=
```

4. Generar el cliente de Prisma: 

```
npx prisma generate
```

## Uso

### Desarrollo
Para iniciar el servidor en modo desarrollo: 

```
npx run dev
```

### Producción
Para construirr y ejecutar el servidor en producción: 

```
npm run build
npm star
```

### Docker
Para ejecutar el proyecto usando Docker:

```
docker-compose up --build
```

## Endpoints

- Portfolio
  - **GET /api/users/portfolio?userId=1**
    - Obtiene el portafolio de un usuario.
- Instrumentos
  - **GET /api/instrument/search?q=TECO**
    - Busca instrumentos por nombre o ticker.
- Ordenes
  - **POST /api/orders**
    - Envía una nueva orden al mercado
    - Body:
      ```
      {
        "instrumentId": 54,
        "userId": 1,
        "side": "BUY",
        "type": "LIMIT",
        "size": 1,
        "price": 150
      }
      ```
  - **DELETE /api/orders**
    - Cancela una orden de tipo "NEW"
    - Body:
      ```
      {
          "userId": 1,
          "orderId": 12
      }
      ```

## Tests
Para ejecutar los tests:
```
npm test
```

## Estructura de Carpetas

config/: Configuración base del proyecto.
instruments/: Módulo de instrumentos.
marketdata/: Módulo de datos de mercado.
orders/: Módulo de órdenes.
portfolio/: Módulo de portafolio.
shared/: Código compartido entre módulos.
tests/: Tests del proyecto.
users/: Módulo de usuarios.

## Base de Datos
El esquema de la base de datos se encuentra en "schema.prisma".

## Consideraciones

### Consideraciones Funcionales
Los precios de los activos están en pesos.
Las órdenes MARKET se ejecutan inmediatamente.
Las órdenes LIMIT se crean con estado NEW.
Solo se pueden cancelar órdenes con estado NEW.
Las transferencias se modelan como órdenes con side CASH_IN o CASH_OUT.

### Consideraciones Técnicas
La API está desarrollada con Node.js y Express.
Se utiliza Prisma como ORM.
Los datos se validan con Zod.
Los errores se manejan con middlewares de Express.

## Consideraciones de Mejora

1. Autenticación y Autorización
2. Cacheo de Datos
3. Escalabilidad del Servicio de Órdenes
4. Procesamiento en Paralelo con colas
5. Monitoreo y Logs

## Colección de Postman
La colección de Postman se encuentra en routes.postman_collection.json.
