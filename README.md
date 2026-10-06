# Kalaiyarasi R - Portfolio

Personal portfolio for R. Kalaiyarasi (MERN Stack Developer).

- **client/** - React + TypeScript + MUI + Motion (Vite)
- **server/** - Node.js + Express + TypeScript API
- **database/** - MySQL schema (XAMPP)

## Run it

1. Open the **XAMPP Control Panel** and start **MySQL**.
2. Install everything once:

   ```bash
   npm run install:all
   ```

3. Start the site and the API together:

   ```bash
   npm run dev
   ```

4. Open <http://localhost:5173>.

The API runs on <http://localhost:5050>. On first start it creates the
`kalai_portfolio` database and the `contact_messages` table by itself, so there
is nothing to import. (`database/schema.sql` is there if you prefer to create
them by hand in phpMyAdmin.)

Database settings live in `server/.env`. The defaults match a standard XAMPP
install (`root` user, empty password). Copy `server/.env.example` if the file
is missing.

## Contact form

Messages sent from the Contact page are saved in MySQL. To read them, open
<http://localhost/phpmyadmin>, choose `kalai_portfolio` > `contact_messages`.

## Editing content

All text, links and projects come from one file:

```
client/src/data/content.ts
```

### Change the photo

The portrait is `client/public/images/profile.webp`, a cut-out with a transparent
background so the hero arch shows through behind it.

1. Replace that file (or add another cut-out PNG/WebP next to it).
2. In `content.ts`, point `photo` at it, e.g. `photo: '/images/profile.png'`.

Setting `photo: ''` shows an illustrated placeholder instead.

### Project screenshots

Screenshots are in `client/public/images/projects/`. Each project uses:

| File | Used for |
| --- | --- |
| `<name>-card.jpg` | project cards and the highlights slideshow |
| `<name>-cover.jpg` | large image on the project page |
| `<name>-1.jpg`, `<name>-2.jpg` | the two tall images on the project page |

Baani Jewels currently uses a title card because the live site could not be
reached when the screenshots were taken. Replace `baani-card.jpg` and
`baani-cover.jpg` with real screenshots, and add `baani-1.jpg` / `baani-2.jpg`
to its `gallery` in `content.ts` if you want the tall images too.

## Production build

```bash
npm run build
npm start
```

`npm start` runs the Express server, which serves both the API and the built
site at <http://localhost:5050>.
