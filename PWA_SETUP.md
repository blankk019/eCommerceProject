# PWA (Progressive Web App) Setup Guide

## 🚀 How to Test PWA

### Development Testing:

```powershell
# 1. Build the production version
npm run build

# 2. Serve the production build locally
# Install http-server globally if not already installed
npm install -g http-server

# 3. Serve the dist folder
http-server -p 8080 -c-1 dist/e-commerce-project/browser

# 4. Open browser at http://localhost:8080
```

### Testing Features:

#### 1. **Install Prompt**

- Open the app in Chrome/Edge
- Look for "Install App" button in navbar
- Click it to install the PWA
- App should open in standalone window

#### 2. **Offline Mode**

- Install the app first
- Open DevTools (F12)
- Go to Network tab
- Check "Offline" checkbox
- Refresh the page
- App should still load and work with cached data

#### 3. **App Updates**

- Make a change in the code
- Build again (`npm run build`)
- Refresh the installed app
- Should see update prompt after detection

#### 4. **Lighthouse Audit**

```
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Progressive Web App" category
4. Click "Generate report"
5. Check PWA score (should be 90+)
```

## 🎨 Customization

### Change App Name & Colors:

Edit `public/manifest.webmanifest`:

```json
{
  "name": "Your Custom Name",
  "short_name": "Short Name",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

### Modify Caching Strategy:

Edit `ngsw-config.json`:

- **freshness**: Always try network first, fallback to cache
- **performance**: Cache first, update in background

### Add More Shortcuts:

Edit `public/manifest.webmanifest` shortcuts array:

```json
{
  "name": "New Shortcut",
  "url": "/path",
  "icons": [{ "src": "icons/icon-96x96.png", "sizes": "96x96" }]
}
```

## 📱 Browser Support

| Feature            | Chrome | Firefox | Safari         | Edge |
| ------------------ | ------ | ------- | -------------- | ---- |
| Service Worker     | ✅     | ✅      | ✅             | ✅   |
| Install Prompt     | ✅     | ❌      | ✅ (iOS 16.4+) | ✅   |
| Offline Mode       | ✅     | ✅      | ✅             | ✅   |
| Push Notifications | ✅     | ✅      | ❌             | ✅   |

## 🔧 Troubleshooting

### Issue: Install button not showing

**Solution**:

- PWA must be served over HTTPS (or localhost)
- Service worker must be registered successfully
- Check browser console for errors

### Issue: Service worker not updating

**Solution**:

```javascript
// Use PwaService method to force update
this._PwaService.forceUpdate();
```

### Issue: Offline mode not working

**Solution**:

- Build production version (service worker doesn't work in dev mode)
- Check `ngsw-config.json` for correct URL patterns
- Clear browser cache and service worker

### Issue: Cached data is stale

**Solution**:

- Adjust `maxAge` in `ngsw-config.json`
- Change strategy from "performance" to "freshness"
- Clear cache in browser DevTools

## 📊 Performance Metrics

After implementation, you should see:

- **First Contentful Paint**: < 2s
- **Time to Interactive**: < 3.5s
- **Lighthouse PWA Score**: 90+
- **Offline Functionality**: ✅
- **Installability**: ✅

## 🎯 Next Steps

1. **Custom Icons**: Replace default icons in `public/icons/` with your brand icons
2. **Push Notifications**: Implement push notification service (optional)
3. **Background Sync**: Add background sync for offline actions
4. **Analytics**: Track PWA installs and usage
5. **A2HS Prompt**: Create custom Add to Home Screen banner

## 📝 Notes

- Service worker only works in production builds (`!isDevMode()`)
- Use `registerWhenStable:30000` strategy (waits 30 seconds before registering)
- Always test in production mode for accurate PWA behavior
- Consider implementing custom offline page for better UX

## 🔗 Resources

- [Angular Service Worker Guide](https://angular.dev/ecosystem/service-workers)
- [Web.dev PWA Guide](https://web.dev/progressive-web-apps/)
- [MDN PWA Documentation](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

# Build for GitHub Pages with correct base href

ng build --base-href /eCommerceProject/

# Deploy to GitHub Pages

npx angular-cli-ghpages --dir=dist/e-commerce-project/browser
