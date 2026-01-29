# BitByteLabs - Deployment Guide

Complete guide for deploying BitByteLabs to production.

## 🌐 Deployment Overview

BitByteLabs can be deployed to various cloud platforms. Choose based on your needs:

- **Free Tier**: Heroku (backend), Vercel/Netlify (frontend)
- **Production**: AWS, Google Cloud, Azure
- **Simple**: VPS or dedicated server

## 📊 Architecture for Production

```
┌─────────────────────┐
│   User Browser      │
│  (Frontend: React)  │
└──────────┬──────────┘
           │ HTTPS
           ▼
┌─────────────────────┐     ┌──────────────┐
│ CDN / Web Server    │────▶│  MongoDB     │
│  (Vercel/Netlify)   │     │ Atlas/Cloud  │
└──────────┬──────────┘     └──────────────┘
           │ API Calls
           ▼
┌─────────────────────────────┐
│   API Server                │
│   (Node.js/Express)         │
│   (Heroku/AWS/Google Cloud) │
└─────────────────────────────┘
```

## 🚀 Deploy Backend to Heroku (Free)

### Prerequisites
- Heroku account (create at heroku.com)
- Heroku CLI installed
- Git installed

### Step 1: Prepare Backend

1. **Ensure MongoDB Connection String in .env:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bitbytelabs
```

2. **Update Procfile:**
```bash
cd backend
echo "web: npm start" > Procfile
```

3. **Ensure package.json has start script:**
```json
"scripts": {
  "start": "node server.js"
}
```

### Step 2: Deploy to Heroku

```bash
# Login to Heroku
heroku login

# Create new app
heroku create bitbytelabs-api

# Add MongoDB
heroku addons:create mongolab:sandbox

# Push code
git push heroku main

# View logs
heroku logs --tail

# Get API URL
heroku open
# Note the URL: https://bitbytelabs-api.herokuapp.com
```

### Step 3: Set Environment Variables

```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-super-secret-key-here
```

## 🌍 Deploy Frontend to Vercel (Free)

### Step 1: Prepare Frontend

1. **Update API URL in `frontend/js/app.js`:**
```javascript
const appState = {
  API_URL: 'https://bitbytelabs-api.herokuapp.com/api'
  // Instead of localhost
};
```

2. **Create vercel.json in frontend:**
```json
{
  "buildCommand": "echo 'Frontend ready'",
  "framework": "html",
  "outputDirectory": "."
}
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
cd frontend
npm install -g vercel
vercel login
vercel deploy --prod
```

#### Option B: Using Git
1. Push to GitHub
2. Connect to Vercel.com
3. Select repository
4. Vercel auto-deploys on push

### Step 3: Configure Domain (Optional)
1. Go to Vercel dashboard
2. Add custom domain
3. Update DNS records

## 🌐 Deploy to Netlify (Free)

### Step 1: Prepare
```bash
cd frontend
```

### Step 2: Deploy
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --dir=.

# Deploy to production
netlify deploy --dir=. --prod
```

## 🗄️ Setup MongoDB Atlas (Database)

### Step 1: Create Account
1. Go to mongodb.com/atlas
2. Create free account
3. Create new organization

### Step 2: Create Cluster
1. Click "Build a Database"
2. Select "Shared" (free)
3. Choose AWS region closest to you
4. Click "Create Cluster"

### Step 3: Get Connection String
1. Click "Connect"
2. Select "Drivers"
3. Copy connection string
4. Replace `<password>` with your password
5. Add to `.env` or Heroku config

### Step 4: Create Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Create username and password
4. Save credentials

## 🔐 Security Checklist

Before deploying:

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Enable HTTPS everywhere
- [ ] Set `NODE_ENV=production`
- [ ] Hide sensitive data in environment variables
- [ ] Enable CORS only for your domain
- [ ] Set rate limiting on API
- [ ] Enable database authentication
- [ ] Regular backups enabled
- [ ] Error logging configured
- [ ] HTTPS certificate installed

## 📝 Update API URLs

### In Frontend (js/app.js)
```javascript
// Development
const API_URL = 'http://localhost:5000/api';

// Production (update to your backend URL)
const API_URL = 'https://bitbytelabs-api.herokuapp.com/api';
```

### In Backend (.env)
```env
# Production
NODE_ENV=production
PORT=5000
JWT_SECRET=your-production-secret-key
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/bitbytelabs
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy BitByteLabs

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy Backend
      run: |
        cd backend
        git push heroku main
        
    - name: Deploy Frontend
      run: |
        cd frontend
        npm install
        vercel deploy --prod --token ${{ secrets.VERCEL_TOKEN }}
```

## 📊 Performance Optimization

### Backend
1. **Enable gzip compression:**
```javascript
const compression = require('compression');
app.use(compression());
```

2. **Add caching headers:**
```javascript
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=3600');
  next();
});
```

3. **Database indexing** for MongoDB
4. **Connection pooling**

### Frontend
1. **Minify CSS and JS:**
```bash
npm install -D terser csso-cli
```

2. **Lazy load images:**
```html
<img src="..." loading="lazy">
```

3. **Use CDN for assets:**
   - CloudFlare (free)
   - Fastly
   - CloudFront

## 🚨 Monitoring & Logging

### Error Tracking
```bash
# Use Sentry for error tracking
npm install @sentry/node
```

### Logging
```javascript
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### Monitoring
- Use Heroku monitoring
- Set up Datadog or New Relic
- Monitor database performance
- Track API response times

## 📈 Scaling Strategy

### Phase 1: MVP (Current)
- Single Heroku dyno
- Shared MongoDB tier
- Basic monitoring

### Phase 2: Growth
- Upgrade to Standard Heroku dynos
- Dedicated MongoDB cluster
- Add Redis for caching
- CDN for static assets

### Phase 3: Enterprise
- Multiple server instances
- Load balancer
- Database replication
- Microservices architecture

## 🔄 Continuous Deployment

### Automated Testing
```bash
# Add to package.json
"test": "jest",
"test:coverage": "jest --coverage"
```

### Deployment Commands
```bash
# Backend
npm run test
npm run build (if needed)
git push heroku main

# Frontend
npm run test
npm run build
vercel deploy --prod
```

## 🆘 Troubleshooting Deployment

### Backend won't start
```bash
# Check logs
heroku logs --tail

# Verify Procfile exists
cat Procfile

# Check port configuration
# Server should use process.env.PORT || 5000
```

### API calls failing
```bash
# Check CORS is enabled for your frontend domain
# Update in backend/server.js:
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}));
```

### Database connection issues
```bash
# Test connection string
mongosh "mongodb+srv://user:pass@cluster.mongodb.net/"

# Check MongoDB Atlas IP whitelist
# Add your Heroku/server IP
```

## 📱 Mobile Deployment

### iOS/Android Apps
1. Use React Native or Flutter
2. Build against API
3. Deploy to App Store and Google Play

### Progressive Web App (PWA)
```json
{
  "manifest.json": {
    "name": "BitByteLabs",
    "short_name": "BitByteLabs",
    "icons": [...],
    "theme_color": "#1f2937",
    "background_color": "#ffffff",
    "display": "standalone"
  }
}
```

## 💰 Cost Estimation (Monthly)

### Free Tier
- Heroku: $0 (limited)
- Vercel: $0 (generous free tier)
- MongoDB Atlas: $0 (512MB shared)
- **Total: $0-5**

### Starter Tier
- Heroku: $7-50
- Vercel: $0-20
- MongoDB Atlas: $10-100
- **Total: $17-170**

### Production Tier
- AWS EC2: $20-500
- RDS/MongoDB: $50-500
- CloudFront CDN: $0-100
- Other services: $50-500
- **Total: $120-1600+**

## 📚 Additional Resources

- [Heroku Docs](https://devcenter.heroku.com)
- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- [Express.js Production Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Node.js Production Checklist](https://github.com/goldbergyoni/nodebestpractices)

## ✅ Pre-Launch Checklist

- [ ] Backend deployed and tested
- [ ] Frontend deployed and tested
- [ ] Database configured and backed up
- [ ] Environment variables set
- [ ] HTTPS enabled
- [ ] CORS configured
- [ ] API rate limiting enabled
- [ ] Error tracking enabled
- [ ] Monitoring configured
- [ ] Backups automated
- [ ] Domain configured
- [ ] SSL certificate installed
- [ ] Performance tested
- [ ] Security audit completed
- [ ] Documentation updated

---

**You're ready to deploy! 🚀**

For detailed setup instructions for each platform, see the specific deployment guides above.
