# BizCard Platform – README3

## Major Changes Since `readme2.md`

### 1. **New Features & UI/UX Improvements**
- **About Me**: Added a 150-word "About Me" field for SEO and card personalization.
- **Tags**: Global tags system for SEO, with tags stored in a new `tags` table and linked via `card_tags`.
- **Custom URL**: Users can set a unique, LinkedIn-style custom URL for their card (e.g., `/page/yourname`).
- **Featured Video**: Accepts YouTube/Vimeo links, validated and shown as a button on the card.
- **SEO Fields**: Meta title, meta keywords, and tags for each card.
- **Live Preview**: All new fields are reflected in the live preview and PDF export.
- **PDF Download**: High-quality, single-page PDF export with all card content, QR code, and branding.
- **Error Handling**: Toast notifications for all major user actions and errors.
- **Minimal Public Card Page**: `/page/:customUrl` and `/digital-card` routes show a minimal, headerless, footerless card for sharing.

### 2. **Backend & Routing**
- **Custom URL Routing**: `/page/:customUrl` now resolves to the correct card, case-insensitive.
- **Public Card API**: `/api/publiccard?custom_url=...` or `/api/publiccard?id=...` returns the correct card if public.
- **Case-insensitive custom URL lookup** for best UX.

### 3. **Database Changes**

#### **New Columns in `savedcards`**
```sql
ALTER TABLE savedcards
  ADD COLUMN about_yourself TEXT,
  ADD COLUMN custom_url VARCHAR(255) UNIQUE,
  ADD COLUMN meta_keywords TEXT,
  ADD COLUMN meta_title VARCHAR(255),
  ADD COLUMN tags_json JSON,
  ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

ALTER TABLE savedcards
  MODIFY COLUMN tags_json JSON;

ALTER TABLE savedcards
  CHANGE COLUMN aboutVideo featured_video VARCHAR(255);

CREATE UNIQUE INDEX idx_custom_url ON savedcards(custom_url);
```

#### **New Tables**
```sql
CREATE TABLE tags (
  tag_id INT AUTO_INCREMENT PRIMARY KEY,
  tag_name VARCHAR(100) NOT NULL UNIQUE,
  usage_count INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE card_tags (
  card_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (card_id, tag_id),
  FOREIGN KEY (card_id) REFERENCES savedcards(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE
);
```

---

## How to Run the Program

### 1. **Database Setup**
- Ensure MySQL is running and you have a database (e.g., `bizcard`).
- Run all the SQL commands above to update your schema.
- If migrating from an old version, back up your data first.

### 2. **Backend Setup**
```sh
cd bizcard-demo-backup/newBackend
npm install
# or yarn install
node server.js
# or use nodemon for auto-reload
```
- The backend will run on the port specified in `.env` or default to 5001.

### 3. **Frontend Setup**
```sh
cd bizcard-demo-backup/frontend
npm install
# or yarn install
npm run dev
# or yarn dev
```
- The frontend will run on the port specified by Vite (default: 5173).

### 4. **Accessing the App**
- Main site: [http://localhost:5173/](http://localhost:5173/)
- Public card (custom URL): [http://localhost:5173/page/your-custom-url](http://localhost:5173/page/your-custom-url)
- Public card (share link): [http://localhost:5173/digital-card?query=...](http://localhost:5173/digital-card?query=...)

---

## How the New Features Work

### **Custom URL**
- Set a custom URL in the Build page (must be unique, lowercase, 3-50 chars).
- After saving, your card is accessible at `/page/your-custom-url`.
- The QR code in the PDF and on the card will point to the custom URL if set.

### **Tags & SEO**
- Add tags for SEO; tags are stored globally and linked to cards.
- Meta title and keywords are used for search engine optimization.

### **About Me & Featured Video**
- About Me: 150-word description for your card and SEO.
- Featured Video: Paste a YouTube/Vimeo link; it will be validated and shown as a button.

### **PDF Download**
- Download your card as a high-quality, single-page PDF.
- The PDF includes all card content, QR code (with custom URL if set), and branding.

### **Error Handling**
- All major actions (save, copy, download, validation) show toast notifications for success or error.

---

## Troubleshooting
- If you see blank pages or errors, check the browser console and backend logs.
- Make sure all database migrations are applied and both backend/frontend dependencies are installed.
- For missing packages, run `npm install` in both backend and frontend directories.
- If custom URLs do not resolve, ensure the backend is running and the `/api/publiccard` endpoint is accessible.

---

## Contact
For further help, contact the Onfra dev team or open an issue in your project tracker. 