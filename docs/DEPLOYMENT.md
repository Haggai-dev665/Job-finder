# Deployment Guide

This guide provides comprehensive instructions for deploying the Job Finder application to various environments and platforms.

## Table of Contents

1. [Deployment Overview](#deployment-overview)
2. [Environment Setup](#environment-setup)
3. [Docker Deployment](#docker-deployment)
4. [Cloud Deployment](#cloud-deployment)
5. [Database Deployment](#database-deployment)
6. [CI/CD Pipeline](#cicd-pipeline)
7. [Monitoring and Logging](#monitoring-and-logging)
8. [Troubleshooting](#troubleshooting)

## Deployment Overview

### Architecture Components

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Load Balancer │    │   Web Servers    │    │    Database     │
│    (Nginx)      │◄──►│  (Node.js/PM2)   │◄──►│   (MongoDB)     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │   Static Files   │
                       │      (CDN)       │
                       └──────────────────┘
```

### Deployment Options

1. **Traditional Server Deployment**
   - VPS/Dedicated servers
   - Self-managed infrastructure
   - Full control over environment

2. **Cloud Platform Deployment**
   - AWS, Google Cloud, Azure
   - Managed services
   - Auto-scaling capabilities

3. **Container Deployment**
   - Docker containers
   - Kubernetes orchestration
   - Microservices architecture

4. **Serverless Deployment**
   - Function-as-a-Service
   - Pay-per-use model
   - Automatic scaling

## Environment Setup

### Production Environment Variables

#### Backend (.env.production)
```env
# Environment
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jobfinder_prod
REDIS_URL=redis://redis-server:6379

# Security
JWT_SECRET=your_super_secure_jwt_secret_minimum_32_characters
JWT_EXPIRE=7d
BCRYPT_ROUNDS=12

# External APIs
JSEARCH_API_KEY=your_production_jsearch_api_key
JSEARCH_API_HOST=jsearch.p.rapidapi.com

# Email Service
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your_sendgrid_api_key
EMAIL_FROM=noreply@jobfinder.com

# File Storage
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=jobfinder-uploads
AWS_REGION=us-east-1

# Monitoring
SENTRY_DSN=your_sentry_dsn
NEW_RELIC_LICENSE_KEY=your_newrelic_key

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100

# CORS
CORS_ORIGIN=https://jobfinder.com,https://www.jobfinder.com

# Session
SESSION_SECRET=your_session_secret
```

#### Frontend (.env.production)
```env
# API Configuration
VITE_API_URL=https://api.jobfinder.com/api
VITE_NODE_ENV=production

# Analytics
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_HOTJAR_ID=your_hotjar_id

# External Services
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
VITE_GOOGLE_MAPS_API_KEY=your_maps_api_key

# Feature Flags
VITE_ENABLE_CHAT=true
VITE_ENABLE_VIDEO_INTERVIEWS=true

# CDN
VITE_CDN_URL=https://cdn.jobfinder.com
```

### Security Configuration

#### SSL/TLS Setup
```nginx
# Nginx SSL configuration
server {
    listen 443 ssl http2;
    server_name jobfinder.com www.jobfinder.com;
    
    ssl_certificate /etc/letsencrypt/live/jobfinder.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/jobfinder.com/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;
    
    add_header Strict-Transport-Security "max-age=63072000" always;
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
}
```

## Docker Deployment

### Dockerfile Configuration

#### Backend Dockerfile
```dockerfile
# Multi-stage build for production
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Set ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 5000

CMD ["npm", "start"]
```

#### Frontend Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose

#### docker-compose.yml
```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d
      - ./nginx/ssl:/etc/nginx/ssl
    depends_on:
      - backend
    restart: unless-stopped

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=${MONGODB_URI}
      - JWT_SECRET=${JWT_SECRET}
    volumes:
      - ./uploads:/app/uploads
    depends_on:
      - mongodb
      - redis
    restart: unless-stopped

  mongodb:
    image: mongo:6.0
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=${MONGO_ROOT_USERNAME}
      - MONGO_INITDB_ROOT_PASSWORD=${MONGO_ROOT_PASSWORD}
      - MONGO_INITDB_DATABASE=jobfinder
    volumes:
      - mongodb_data:/data/db
      - ./mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

volumes:
  mongodb_data:
  redis_data:
```

### Docker Deployment Commands

```bash
# Build and start services
docker-compose up -d

# View logs
docker-compose logs -f

# Scale backend service
docker-compose up -d --scale backend=3

# Update services
docker-compose pull
docker-compose up -d

# Backup database
docker exec mongodb mongodump --out /data/backup

# Restore database
docker exec mongodb mongorestore /data/backup
```

## Cloud Deployment

### AWS Deployment

#### Using AWS ECS (Elastic Container Service)

1. **Create ECS Cluster**
```bash
aws ecs create-cluster --cluster-name jobfinder-cluster
```

2. **Task Definition (task-definition.json)**
```json
{
  "family": "jobfinder-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::account:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "jobfinder-backend",
      "image": "your-account.dkr.ecr.region.amazonaws.com/jobfinder-backend:latest",
      "portMappings": [
        {
          "containerPort": 5000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ],
      "secrets": [
        {
          "name": "MONGODB_URI",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:jobfinder/mongodb-uri"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/jobfinder-backend",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

3. **Deploy with ECS Service**
```bash
aws ecs create-service \
  --cluster jobfinder-cluster \
  --service-name jobfinder-backend-service \
  --task-definition jobfinder-backend \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-12345],securityGroups=[sg-12345],assignPublicIp=ENABLED}"
```

#### Using AWS Lambda (Serverless)

1. **Install Serverless Framework**
```bash
npm install -g serverless
```

2. **Serverless Configuration (serverless.yml)**
```yaml
service: jobfinder-api

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1
  environment:
    MONGODB_URI: ${env:MONGODB_URI}
    JWT_SECRET: ${env:JWT_SECRET}

functions:
  api:
    handler: lambda.handler
    events:
      - http:
          path: /{proxy+}
          method: ANY
          cors: true

plugins:
  - serverless-offline
  - serverless-dotenv-plugin

custom:
  serverless-offline:
    httpPort: 3000
```

3. **Lambda Handler (lambda.js)**
```javascript
const serverless = require('serverless-http');
const app = require('./app');

module.exports.handler = serverless(app);
```

### Google Cloud Platform Deployment

#### Using Google Cloud Run

1. **Build and Push Container**
```bash
# Build image
docker build -t gcr.io/your-project/jobfinder-backend .

# Push to Container Registry
docker push gcr.io/your-project/jobfinder-backend
```

2. **Deploy to Cloud Run**
```bash
gcloud run deploy jobfinder-backend \
  --image gcr.io/your-project/jobfinder-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production \
  --memory 1Gi \
  --cpu 1 \
  --min-instances 1 \
  --max-instances 10
```

### Azure Deployment

#### Using Azure Container Instances

1. **Create Resource Group**
```bash
az group create --name jobfinder-rg --location eastus
```

2. **Deploy Container**
```bash
az container create \
  --resource-group jobfinder-rg \
  --name jobfinder-backend \
  --image your-registry/jobfinder-backend:latest \
  --cpu 1 \
  --memory 1 \
  --ports 5000 \
  --environment-variables NODE_ENV=production \
  --secure-environment-variables MONGODB_URI=$MONGODB_URI
```

## Database Deployment

### MongoDB Atlas Setup

1. **Create Cluster**
```bash
# Using MongoDB Atlas CLI
atlas clusters create jobfinder-cluster \
  --provider AWS \
  --region US_EAST_1 \
  --tier M10 \
  --diskSizeGB 10
```

2. **Database Configuration**
```javascript
// Database initialization script
use jobfinder;

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.jobs.createIndex({ title: "text", description: "text" });
db.jobs.createIndex({ location: 1, jobType: 1 });
db.applications.createIndex({ candidate: 1, job: 1 }, { unique: true });

// Create collections with validation
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "userType"],
      properties: {
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        }
      }
    }
  }
});
```

### Database Migration

```javascript
// Migration script: migrate-v1-to-v2.js
const { MongoClient } = require('mongodb');

async function migrate() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db();
    
    // Add new field to existing documents
    await db.collection('users').updateMany(
      { preferences: { $exists: false } },
      { $set: { preferences: { jobTypes: [], locations: [] } } }
    );
    
    // Update schema version
    await db.collection('migrations').insertOne({
      version: '2.0.0',
      appliedAt: new Date(),
      description: 'Add user preferences'
    });
    
    console.log('Migration completed successfully');
  } finally {
    await client.close();
  }
}

migrate().catch(console.error);
```

## CI/CD Pipeline

### GitHub Actions Workflow

#### .github/workflows/deploy.yml
```yaml
name: Deploy Job Finder

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      mongodb:
        image: mongo:6.0
        env:
          MONGO_INITDB_ROOT_USERNAME: test
          MONGO_INITDB_ROOT_PASSWORD: test
        ports:
          - 27017:27017
        options: >-
          --health-cmd mongo
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: |
            frontend/package-lock.json
            backend/package-lock.json
      
      - name: Install Backend Dependencies
        run: |
          cd backend
          npm ci
      
      - name: Install Frontend Dependencies
        run: |
          cd frontend
          npm ci
      
      - name: Run Backend Tests
        run: |
          cd backend
          npm test
        env:
          NODE_ENV: test
          MONGODB_URI: mongodb://test:test@localhost:27017/jobfinder_test?authSource=admin
          JWT_SECRET: test_secret
      
      - name: Run Frontend Tests
        run: |
          cd frontend
          npm test
      
      - name: Build Frontend
        run: |
          cd frontend
          npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Docker Buildx
        uses: docker/setup-buildx-action@v2
      
      - name: Login to DockerHub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      
      - name: Build and Push Backend Image
        uses: docker/build-push-action@v4
        with:
          context: ./backend
          push: true
          tags: |
            jobfinder/backend:latest
            jobfinder/backend:${{ github.sha }}
      
      - name: Build and Push Frontend Image
        uses: docker/build-push-action@v4
        with:
          context: ./frontend
          push: true
          tags: |
            jobfinder/frontend:latest
            jobfinder/frontend:${{ github.sha }}
      
      - name: Deploy to Production
        uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /opt/jobfinder
            docker-compose pull
            docker-compose up -d
            docker system prune -f
```

### GitLab CI/CD

#### .gitlab-ci.yml
```yaml
stages:
  - test
  - build
  - deploy

variables:
  DOCKER_IMAGE_BACKEND: $CI_REGISTRY_IMAGE/backend
  DOCKER_IMAGE_FRONTEND: $CI_REGISTRY_IMAGE/frontend

test_backend:
  stage: test
  image: node:18
  services:
    - mongo:6.0
  variables:
    MONGODB_URI: mongodb://mongo:27017/jobfinder_test
  script:
    - cd backend
    - npm ci
    - npm test

test_frontend:
  stage: test
  image: node:18
  script:
    - cd frontend
    - npm ci
    - npm test

build_backend:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker build -t $DOCKER_IMAGE_BACKEND:$CI_COMMIT_SHA ./backend
    - docker push $DOCKER_IMAGE_BACKEND:$CI_COMMIT_SHA
  only:
    - main

deploy_production:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache ssh
  script:
    - ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$DEPLOY_HOST "
        cd /opt/jobfinder &&
        docker-compose pull &&
        docker-compose up -d
      "
  only:
    - main
  when: manual
```

## Monitoring and Logging

### Application Monitoring

#### Sentry Configuration
```javascript
// backend/config/sentry.js
const Sentry = require('@sentry/node');
const { ProfilingIntegration } = require('@sentry/profiling-node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [
    new ProfilingIntegration(),
  ],
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  profilesSampleRate: 0.1,
});

module.exports = Sentry;
```

#### New Relic Configuration
```javascript
// backend/newrelic.js
exports.config = {
  app_name: ['Job Finder API'],
  license_key: process.env.NEW_RELIC_LICENSE_KEY,
  logging: {
    level: 'info'
  },
  allow_all_headers: true,
  attributes: {
    exclude: [
      'request.headers.cookie',
      'request.headers.authorization',
      'request.headers.proxyAuthorization',
      'request.headers.setCookie*',
      'request.headers.x*',
      'response.headers.cookie',
      'response.headers.authorization',
      'response.headers.proxyAuthorization',
      'response.headers.setCookie*',
      'response.headers.x*'
    ]
  }
};
```

### Logging Configuration

#### Winston Logger Setup
```javascript
// backend/utils/logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'jobfinder-api' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
```

### Health Check Endpoints

```javascript
// backend/routes/health.js
const express = require('express');
const mongoose = require('mongoose');
const redis = require('../config/redis');

const router = express.Router();

router.get('/health', async (req, res) => {
  const health = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version,
    environment: process.env.NODE_ENV,
    services: {}
  };

  try {
    // Check MongoDB connection
    if (mongoose.connection.readyState === 1) {
      health.services.mongodb = { status: 'connected' };
    } else {
      health.services.mongodb = { status: 'disconnected' };
      health.status = 'DEGRADED';
    }

    // Check Redis connection
    const pong = await redis.ping();
    health.services.redis = { 
      status: pong === 'PONG' ? 'connected' : 'disconnected' 
    };

    res.json(health);
  } catch (error) {
    health.status = 'ERROR';
    health.error = error.message;
    res.status(503).json(health);
  }
});

module.exports = router;
```

## Troubleshooting

### Common Deployment Issues

#### 1. Database Connection Issues

**Problem**: Cannot connect to MongoDB
```
MongoServerError: Authentication failed
```

**Solution**:
```bash
# Check connection string format
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Test connection
mongo "mongodb+srv://cluster.mongodb.net/database" --username username

# Check network access in MongoDB Atlas
# Ensure IP whitelist includes your server IP
```

#### 2. Environment Variables Not Loading

**Problem**: Environment variables undefined in production

**Solution**:
```bash
# Check if .env file exists and is readable
ls -la .env*

# Verify environment variables are set
printenv | grep NODE_ENV

# For Docker, check container environment
docker exec container_name printenv
```

#### 3. Port Binding Issues

**Problem**: Port already in use
```
Error: listen EADDRINUSE :::5000
```

**Solution**:
```bash
# Find process using port
sudo lsof -i :5000

# Kill process
sudo kill -9 <PID>

# Use different port
PORT=3001 npm start
```

#### 4. SSL Certificate Issues

**Problem**: SSL certificate expired or invalid

**Solution**:
```bash
# Check certificate expiration
openssl x509 -in /path/to/certificate.crt -text -noout | grep "Not After"

# Renew Let's Encrypt certificate
sudo certbot renew

# Test SSL configuration
openssl s_client -connect yourdomain.com:443
```

#### 5. Docker Build Failures

**Problem**: Docker build fails due to dependencies

**Solution**:
```dockerfile
# Use specific node version
FROM node:18.17.1-alpine

# Clear npm cache
RUN npm cache clean --force

# Use npm ci instead of npm install
RUN npm ci --only=production

# Set npm registry
RUN npm config set registry https://registry.npmjs.org/
```

### Performance Optimization

#### 1. Database Optimization

```javascript
// Add database indexes
db.jobs.createIndex({ "location": 1, "jobType": 1, "createdAt": -1 });
db.users.createIndex({ "email": 1 }, { unique: true });

// Use aggregation for complex queries
const pipeline = [
  { $match: { status: 'active' } },
  { $lookup: { from: 'companies', localField: 'company', foreignField: '_id', as: 'company' } },
  { $sort: { createdAt: -1 } },
  { $limit: 20 }
];
```

#### 2. Caching Strategy

```javascript
// Redis caching middleware
const cache = (duration) => {
  return async (req, res, next) => {
    const key = req.originalUrl;
    const cached = await redis.get(key);
    
    if (cached) {
      return res.json(JSON.parse(cached));
    }
    
    res.sendResponse = res.json;
    res.json = (body) => {
      redis.setex(key, duration, JSON.stringify(body));
      res.sendResponse(body);
    };
    
    next();
  };
};
```

#### 3. Load Balancing

```nginx
# Nginx load balancer configuration
upstream backend {
    server backend1:5000;
    server backend2:5000;
    server backend3:5000;
}

server {
    listen 80;
    location /api {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Monitoring Alerts

#### Prometheus + Grafana Setup

```yaml
# docker-compose.monitoring.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana_data:/var/lib/grafana

volumes:
  grafana_data:
```

This deployment guide provides comprehensive instructions for deploying the Job Finder application across various environments and platforms. Choose the deployment strategy that best fits your requirements and infrastructure.