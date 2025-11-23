# Deployment Instructions for Render

## Option 1: Node.js Web Service (Recommended)

1. In Render dashboard, create a new **Web Service**
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: `Node`
4. Add environment variables:
   - `VITE_HELIUS_API_KEY` (if needed)
   - `NODE_ENV=production`
   - `PORT=3000` (Render will set this automatically)
5. Deploy

The `render.yaml` file is already configured for this setup.

## Option 2: Static Site (Alternative)

If you prefer static hosting:

1. In Render dashboard, create a new **Static Site**
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add custom domain if needed
5. Deploy

The `render-static.yaml` file is configured for this setup.

## Troubleshooting

### Website shows blank/blue screen

1. **Check browser console** for errors (F12 → Console)
2. **Verify MIME types**: JavaScript files should be `application/javascript`
3. **Check network tab**: Are all assets loading? (F12 → Network)
4. **Verify build**: Run `npm run build` locally and check `dist/` folder

### MIME Type Errors

If you see errors like "Expected a JavaScript module script but got binary/octet-stream":
- The Node.js server (`server.js`) should fix this automatically
- For static hosting, ensure your hosting provider supports proper MIME types

### Assets Not Loading

- Check that all files in `dist/assets/` are uploaded
- Verify paths in `dist/index.html` are correct
- Check browser console for 404 errors

### Custom Domain Issues

- Ensure DNS is properly configured
- Check that SSL certificate is active
- Verify that Render has detected your custom domain

