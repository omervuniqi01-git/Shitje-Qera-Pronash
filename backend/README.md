# Backend - Shitje/Qera Pronash

API me Node.js + Express + MongoDB (Mongoose). Upload fotosh ruhet lokal ne `/uploads`.

## Instalimi

```bash
cd backend
npm install
```

## Konfigurimi

Kopjo `.env.example` ne `.env` dhe ploteso `MONGO_URI` me lidhjen nga MongoDB Atlas.

## Krijimi i adminit

```bash
node seedAdmin.js
```

## Nisja

```bash
npm run dev
```

Serveri niset ne `http://localhost:5000`.

## Endpoints

### Prona
- `GET /api/properties` - lista e pronave (filtra: `lloji`, `qellimi`, `lokacioni`, `cmimiMin`, `cmimiMax`, `kerko`)
- `GET /api/properties/:id` - nje prone
- `POST /api/properties` - shto prone (admin, form-data me foto)
- `PUT /api/properties/:id` - edito prone (admin)
- `DELETE /api/properties/:id` - fshij prone (admin)

### Autentikim
- `POST /api/auth/login` - login admin, kthen token

Per rrugat e mbrojtura dergo header-in: `Authorization: Bearer <token>`
