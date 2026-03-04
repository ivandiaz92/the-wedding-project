# Strapi setup for The Wedding Project

This project uses **Strapi v5** in the `strapi/` folder for the "Meet the Team" section. Follow these steps to get Strapi running and create the collection type.

---

## 1. Run Strapi

```bash
cd strapi
npm run develop
```

- Strapi API: **http://localhost:1337**
- Admin panel: **http://localhost:1337/admin**

On first run you’ll be asked to create an **admin user** (email + password). Do that so you can log in.

---

## 2. Create the “Team Member” collection type

In the admin panel (**Content-Type Builder**):

1. Go to **Content-Type Builder** → **Create new collection type**.
2. **Display name:** `Team Member`  
   (API ID will be `api::team-member.team-member`; the REST API path will be `/api/team-members`.)

Then add these **fields** (match names and types exactly so the frontend can use them):

| Field name   | Type        | Required | Notes                          |
|-------------|-------------|----------|--------------------------------|
| `name`      | Text (Short)| Yes      | Full name, e.g. "CECY DE LA GARZA" |
| `role`      | Text (Short)| No       | e.g. "THE PLANNER"             |
| `profession`| Text (Short)| No       | e.g. "MERCADÓLOGA & DISEÑADORA FLORAL" |
| `experience`| Text (Short)| No       | e.g. "+15 AÑOS EN LA INDUSTRIA" |
| `description` | Text (Long)| No     | Bio / about text               |
| `nickname`  | Text (Short)| No       | e.g. "MAC"                     |
| `image`     | Media (Single image) | Yes | Profile photo                  |
| `order`     | Integer     | No       | Optional sort order (lower = first) |

3. Save the content type and restart the server when Strapi asks you to.

---

## 3. Allow public API access for Team Members

1. Go to **Settings** → **Users & Permissions** → **Roles**.
2. Open the **Public** role.
3. Under **Permissions**, find **Team-member** (or **Team Member**).
4. Enable:
   - **find** (list all team members)
   - **findOne** (get one by id)

Save. The Next.js app will call `GET /api/team-members` without auth.

---

## 4. Add content and test

1. In the admin, go to **Content Manager** → **Team Member**.
2. Create a few entries and upload images.
3. Check the API in the browser: **http://localhost:1337/api/team-members**

You should see JSON with a `data` array of team members. Each item will have `id`, `documentId`, `name`, `role`, `profession`, `experience`, `description`, `nickname`, `image` (with `url`), `order`, etc.

---

## API token (optional)

If you use an **API token** instead of (or in addition to) public permissions:

**1. Create the token in Strapi**

- Go to **Settings** → **API Tokens** → **Create new API Token**.
- Name it (e.g. `Next.js frontend`).
- Token type: **Read-only** (or Custom with only `team-member` find/findOne).
- Copy the token; Strapi shows it only once.

**2. Put the token in the Next.js app**

Create or edit **`.env.local`** in the **root of the Next.js project** (same folder as `package.json` and `app/`), and add:

```env
# Strapi
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-token-here
```

- Use the **exact token** you copied from Strapi (no quotes).
- **Do not commit** `.env.local`; it’s already in `.gitignore`.
- If you use a token, you can leave the **Public** role without `find`/`findOne` and rely on the token instead.

The frontend will send this token in the `Authorization: Bearer <token>` header when fetching team members.

---

## 5. Connect the frontend

After the collection type exists and returns data:

- In the **Next.js** app we’ll add an env variable for the Strapi URL, e.g.  
  `NEXT_PUBLIC_STRAPI_URL=http://localhost:1337`
- The “Meet the Team” section will be updated to fetch from `GET ${STRAPI_URL}/api/team-members` instead of `data/team.json`.

When your collection type is ready and you’ve tested the API, say so and we’ll wire the “Meet the Team” section to Strapi.

---

## CORS

Strapi is already configured to allow requests from:

- `http://localhost:3000`
- `http://localhost:3001`
- `http://127.0.0.1:3000`
- `http://127.0.0.1:3001`

So your Next.js dev server can call the Strapi API from the browser or from the server.
