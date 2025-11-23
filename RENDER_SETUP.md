# Render Setup - IMPORTANT: Use Web Service, NOT Static Site

## ⚠️ Problem with Static Site

Render Static Site **does NOT support custom MIME types**. This causes JavaScript files to be served as `binary/octet-stream` instead of `application/javascript`, which breaks the website.

## ✅ Solution: Use Web Service Instead

You **MUST** use a **Web Service** (not Static Site) to properly serve the website with correct MIME types.

## Step-by-Step Setup

### 1. Delete Current Static Site (if exists)
- Go to Render Dashboard
- Find your Static Site
- Click "Delete" or "Remove"

### 2. Create New Web Service

1. Go to Render Dashboard → **New** → **Web Service**
2. Connect your GitHub repository: `lkristof55/-ame`
3. Configure the service:

   **Basic Settings:**
   - **Name**: `samecoin` (or any name you prefer)
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: (leave empty)

   **Build & Deploy:**
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

   **Advanced Settings (optional):**
   - **Node Version**: `22` (or latest)
   - **Auto-Deploy**: `Yes` (recommended)

4. **Environment Variables** (if needed):
   - `VITE_HELIUS_API_KEY` = (your API key)
   - `NODE_ENV` = `production`

5. Click **Create Web Service**

### 3. Wait for Deployment

- Render will automatically:
  1. Install dependencies
  2. Run build command
  3. Start the Express server
  4. Your site will be live!

### 4. Add Custom Domain (Optional)

1. In your Web Service settings, go to **Custom Domains**
2. Add your domain: `samecoin.wtf`
3. Follow DNS instructions from Render
4. Wait for SSL certificate (automatic)

## Why Web Service Works

The Express server (`server.js`) automatically sets correct MIME types:
- `.js` files → `application/javascript`
- `.css` files → `text/css`
- Handles SPA routing (all routes return `index.html`)

## Cost

- **Free tier**: Web Services are free with some limitations
- **Static Sites**: Also free, but won't work for this project due to MIME type limitations

## Troubleshooting

### Website still shows blank/white screen

1. Check **Logs** tab in Render dashboard
2. Look for errors in build or start command
3. Verify `npm start` is working (should see "Server running on port XXXX")

### MIME type errors persist

1. Check browser console (F12)
2. Verify server is running (check Render logs)
3. Make sure you're using **Web Service**, not Static Site

### Build fails

1. Check build logs in Render
2. Verify all dependencies are in `package.json`
3. Check that `server.js` exists in root directory

## Quick Checklist

- [ ] Deleted Static Site (if exists)
- [ ] Created Web Service
- [ ] Set Build Command: `npm install && npm run build`
- [ ] Set Start Command: `npm start`
- [ ] Environment: `Node`
- [ ] Added environment variables (if needed)
- [ ] Deployment successful
- [ ] Website loads correctly

