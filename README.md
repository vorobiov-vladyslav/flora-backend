# Flora Backend

REST API for the Flora bouquet shop — Express + Sequelize + PostgreSQL, with Joi
validation, Multer image upload, and Swagger documentation. This is the server side of the
[Flora frontend](https://vorobiov-vladyslav.github.io/UMT-markup-practice_P2-Vorobiov-Vladyslav/).

## Stack

- Node.js 22 (ESM)
- Express 4
- Sequelize 6 + PostgreSQL (`pg`)
- Joi validation
- Multer + gravatar (image handling)
- swagger-jsdoc + swagger-ui-express (`/api-docs`)

## Project structure

```
server.js            entry: connect DB then listen (process.exit(1) on DB failure)
app.js               express app: json, cors, static /public, routes, swagger, error handler
db/sequelize.js      Sequelize instance + connectDB()
models/              Bouquet, Order
routes/              endpoint wiring + @swagger docs
controllers/         request/response handlers (thin)
services/            Sequelize data access
schemas/             Joi create/update/favorite schemas
middlewares/         validateBody, isValidId, upload (multer)
helpers/             HttpError, ctrlWrapper
docs/swaggerDef.js   OpenAPI base + component schemas
seed/                seed script + bouquets seed data
temp/                multer temp landing
public/photos/       uploaded photos (served as static)
```

## API

Base URL: `/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bouquets` | List bouquets. Optional `?page&limit&category&favorite` |
| GET | `/api/bouquets/:id` | Get one bouquet (404 if missing) |
| POST | `/api/bouquets` | Create (Joi-validated; gravatar `photoURL` if none) |
| PUT | `/api/bouquets/:id` | Update passed fields (400 if empty body) |
| DELETE | `/api/bouquets/:id` | Delete |
| PATCH | `/api/bouquets/:id/favorite` | Set the favorite flag |
| PATCH | `/api/bouquets/:id/photo` | Upload photo (multipart `photo`), temp → public/photos |
| POST | `/api/orders` | Submit an order |
| GET | `/api/feedbacks` | List client feedbacks |
| GET | `/api/feedbacks/:id` | Get one feedback (404 if missing) |
| POST | `/api/feedbacks` | Create (Joi-validated) |
| PUT | `/api/feedbacks/:id` | Update passed fields (400 if empty body) |
| DELETE | `/api/feedbacks/:id` | Delete |
| GET | `/api-docs` | Swagger UI |

## Environment

Copy `.env.example` to `.env` and fill in:

```
PORT=3000
DATABASE_URL=postgres://user:password@host:5432/flora
DB_SSL=false          # true for Render / any SSL-enforcing Postgres
CORS_ORIGIN=*         # e.g. https://vorobiov-vladyslav.github.io in production
```

## Run locally

```bash
npm install
npm run seed     # loads 15 bouquets (drops/recreates the bouquets table)
npm run dev      # nodemon, or: npm start
```

Open http://localhost:3000/api-docs

## Deploy to Render

The database `flora-db` is already provisioned (Frankfurt, Free). To deploy the API:

1. Push this repo to GitHub.
2. **New → Web Service** → connect the repo. Build `npm ci`, start `npm start`, region **Frankfurt**, plan **Free**.
3. Environment variables:
   - `DATABASE_URL` → link to the existing `flora-db` (Internal connection string)
   - `DB_SSL` = `true`
   - `CORS_ORIGIN` = `https://vorobiov-vladyslav.github.io`
4. Seed once from your machine against the **External** connection string:
   ```bash
   DATABASE_URL="<external-url>" DB_SSL=true npm run seed
   ```
5. Verify at `https://<service>.onrender.com/api-docs`.

`render.yaml` is included as an optional Blueprint alternative.

> Render's free web service spins down after ~15 min idle; the first request afterward is
> slow (~30–50 s cold start).
