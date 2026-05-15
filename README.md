# BacSon GPS Monitoring System

## Overview

BacSon GPS is a realtime GPS monitoring and device management platform built with:

- Backend: Laravel API
- Frontend: React + TypeScript + Vite
- Database: MySQL
- Maps: Leaflet + OpenStreetMap
- Authentication: Laravel Sanctum
- Roles & Permissions: Spatie Laravel Permission
- Deployment: Railway / VPS / Shared Hosting compatible

The system supports:

- Realtime GPS device tracking
- Device state polling
- Device history tracking
- Ticket management
- User roles and permissions
- Opcenter management
- Legacy database migration
- Responsive dashboard UI

---

# Tech Stack

## Backend

- PHP 8.2+
- Laravel 12
- MySQL 8+
- Laravel Sanctum
- Spatie Permission

## Frontend

- React
- TypeScript
- Vite
- TailwindCSS
- React Leaflet
- Axios

## Infrastructure

- Railway
- Nginx / Apache
- Node.js 20+
- Composer 2+

---

# Project Structure

## Backend Structure

```txt
app/
├── Console/
│   └── Commands/
│       └── ImportLegacyDataCommand.php
│
├── Http/
│   ├── Controllers/
│   │   ├── Auth/
│   │   ├── Devices/
│   │   ├── Tickets/
│   │   ├── Maps/
│   │   └── PostData/
│   │
│   ├── Requests/
│   └── Resources/
│
├── Models/
│   ├── Device.php
│   ├── DeviceState.php
│   ├── DeviceHistory.php
│   ├── Ticket.php
│   ├── Opcenter.php
│   └── User.php
│
├── Services/
│   └── Geocoding/
│
└── Providers/
```

---

## Frontend Structure

```txt
src/
├── app/
│   ├── providers/
│   └── router/
│
├── components/
│   ├── common/
│   ├── layout/
│   ├── maps/
│   ├── pages/
│   └── ui/
│
├── hooks/
├── pages/
├── services/
├── types/
├── constants/
└── utils/
```

---

# Main Features

## Authentication

- Login
- Logout
- Protected routes
- Role-based authorization

---

## Devices

- Update device
- Delete device
- Search devices
- Pagination
- Realtime device states
- Device history

---

## Realtime GPS Map

- Realtime polling
- Leaflet map integration
- Device popup info
- Device sidebar list
- Device search
- Current user centered map

---

## Tickets

- Create tickets
- Ticket table
- Device selection
- Truck number
- Meter number
- GPS coordinates
- Ticket actions

---

## Legacy Data Migration

Migration supports:

- Users
- Devices
- Device states
- Device histories
- Opcenters
- Tickets

---

# Database Schema Overview

## Main Tables

### users

Stores application users.

### roles

Spatie permission roles.

### devices

Stores master device information.

### device_states

Stores latest realtime device state.

### device_histories

Stores historical GPS sessions.

### tickets

Stores field tickets.

### opcenters

Stores operation centers/groups.

---

# Local Development Setup

## 1. Clone Repository

```bash
git clone <your-repository-url>
```

```bash
cd bacson-gps
```

---

# Backend Setup

## 2. Install PHP Dependencies

```bash
composer install
```

---

## 3. Create Environment File

```bash
cp .env.example .env
```

---

## 4. Generate App Key

```bash
php artisan key:generate
```

---

## 5. Configure Database

Update `.env`:

```env
APP_NAME=BacSonGPS
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=bacson_gps
DB_USERNAME=root
DB_PASSWORD=
```

---

## 6. Run Migrations

```bash
php artisan migrate
```

---

## 7. Seed Roles

Example:

```bash
php artisan db:seed
```

or custom role seeder:

```bash
php artisan db:seed --class=RoleSeeder
```

---

## 8. Start Laravel Server

```bash
php artisan serve
```

Backend URL:

```txt
http://127.0.0.1:8000
```

---

# Frontend Setup

## 9. Install Node Modules

```bash
npm install
```

---

## 10. Configure Frontend Environment

Create `.env`:

```env
VITE_API_URL="/api"
```

---

## 11. Start Frontend

```bash
npm run dev
```

Frontend URL:

```txt
http://localhost:5173
```

---

# Realtime GPS Post Data API

The system receives GPS data using:

```txt
GET /api/postdata
```

Example:

```txt
https://your-domain.com/api/postdata?uid=GPS001&fwv=1.0.2&coord=16.047079,108.206230&temp=55&pwr=1&t=RUNNING&sim=1
```

---

## Example Using curl

```bash
curl "https://your-domain.com/api/postdata?uid=GPS001&fwv=1.0.2&coord=16.047079,108.206230&temp=55&pwr=1&t=RUNNING&sim=1"
```

---

## Example Using wget

```bash
wget -t 1 "https://your-domain.com/api/postdata?uid=GPS001&fwv=1.0.2&coord=16.047079,108.206230&temp=55&pwr=1&t=RUNNING&sim=1"
```

---

# Device Polling System

Frontend automatically polls:

- Device states
- Map devices
- Histories

Polling interval is configurable in:

```txt
src/constants/config.ts
```

---

# Leaflet Map Setup

The project uses:

- React Leaflet
- OpenStreetMap

Install:

```bash
npm install leaflet react-leaflet
```

Import CSS:

```ts
import "leaflet/dist/leaflet.css";
```

---

# Legacy Database Migration

## Configure Legacy Database

Add to `.env`:

```env
LEGACY_DB_HOST=127.0.0.1
LEGACY_DB_PORT=3306
LEGACY_DB_DATABASE=legacy_database
LEGACY_DB_USERNAME=root
LEGACY_DB_PASSWORD=
```

---

## Configure database.php

```php
'legacy_mysql' => [
    'driver' => 'mysql',
    'host' => env('LEGACY_DB_HOST'),
    'port' => env('LEGACY_DB_PORT'),
    'database' => env('LEGACY_DB_DATABASE'),
    'username' => env('LEGACY_DB_USERNAME'),
    'password' => env('LEGACY_DB_PASSWORD'),
    'charset' => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
    'prefix' => '',
    'strict' => true,
    'engine' => null,
],
```

---

## Run Migration Command

```bash
php artisan app:import-legacy-data-command
```

---

## Migration Includes

- Import opcenters
- Import devices
- Import device states
- Import device histories
- Import users
- Import tickets
- Assign roles

---

# Production Deployment

The project can be deployed to:

- Railway
- VPS
- Ubuntu Server
- DigitalOcean
- AWS EC2
- Shared Hosting
- Docker

---

# Railway Deployment

## 1. Install Railway CLI

Official website:

url Railway CLI Documentation [https://docs.railway.com/guides/cli](https://docs.railway.com/guides/cli)

Install:

```bash
npm install -g @railway/cli
```

---

## 2. Login

```bash
railway login
```

---

## 3. Link Existing Project

```bash
railway link
```

Select:

- Workspace
- Project
- Environment
- Service

---

## 4. Configure Variables

Add environment variables in Railway dashboard.

Required:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com

DB_CONNECTION=mysql
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

---

## 5. Deploy

Railway automatically deploys after:

```bash
git push
```

---

## 6. Run Migrations On Production

Open shell:

```bash
railway shell
```

Run:

```bash
php artisan migrate --force
```

---

## 7. Generate App Key

```bash
php artisan key:generate
```

---

# VPS Deployment

## Recommended Stack

- Ubuntu 22+
- Nginx
- PHP-FPM
- MySQL
- Node.js
- Supervisor

---

## Install PHP

```bash
sudo apt install php php-fpm php-mysql php-mbstring php-xml php-curl unzip
```

---

## Install Composer

```bash
curl -sS https://getcomposer.org/installer | php
```

---

## Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
```

```bash
sudo apt install -y nodejs
```

---

## Clone Project

```bash
git clone <repository>
```

---

## Install Dependencies

```bash
composer install --optimize-autoloader --no-dev
```

```bash
npm install
```

```bash
npm run build
```

---

## Configure Permissions

```bash
sudo chmod -R 775 storage
```

```bash
sudo chmod -R 775 bootstrap/cache
```

---

## Configure Nginx

Example:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/bacson-gps/public;

    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.2-fpm.sock;
    }
}
```

---

## Restart Services

```bash
sudo systemctl restart nginx
```

```bash
sudo systemctl restart php8.2-fpm
```

---

# Shared Hosting Deployment

## Requirements

- PHP 8.2+
- MySQL
- SSH access recommended

---

## Steps

1. Upload project files
2. Upload `.env`
3. Run composer install
4. Configure database
5. Point public folder to `/public`
6. Run migrations
7. Build frontend assets

---

# Production Optimization

## Cache Config

```bash
php artisan config:cache
```

```bash
php artisan route:cache
```

```bash
php artisan view:cache
```

---

## Queue Worker

```bash
php artisan queue:work
```

---

## Scheduler

Crontab:

```bash
* * * * * php /path-to-project/artisan schedule:run >> /dev/null 2>&1
```

---

# Common Commands

## Clear Cache

```bash
php artisan optimize:clear
```

---

## Fresh Migration

```bash
php artisan migrate:fresh --seed
```

---

## Run Tests

```bash
php artisan test
```

---

# Troubleshooting

## 502 Bad Gateway

Check:

- PHP-FPM running
- Correct Nginx config
- Railway service health
- APP_KEY exists

---

## Database Connection Refused

Check:

- DB credentials
- Database host
- Database port
- Railway variables

---

## CORS Errors

Configure Laravel CORS.

Check:

```txt
config/cors.php
```

---

## React Leaflet Errors

Install:

```bash
npm install leaflet react-leaflet
```

Import CSS:

```ts
import "leaflet/dist/leaflet.css";
```

---

## Permission Errors

```bash
chmod -R 775 storage
```

```bash
chmod -R 775 bootstrap/cache
```

---

# Recommended Production Flow

## Development

```txt
Local Development
    ↓
Git Commit
    ↓
Push Github
    ↓
Railway Auto Deploy
```

---

## Production Migration Flow

```txt
Backup Database
    ↓
Clear Production Data
    ↓
Import Production SQL
    ↓
Run Laravel Migrations
    ↓
Verify Data
    ↓
Test GPS API
```

---

# Future Improvements

Possible future upgrades:

- WebSocket realtime updates
- Redis caching
- Queue-based GPS processing
- Notifications
- Device alerts
- Multi-tenant support
- Export reports
- Advanced analytics
- Mobile application

---

# License

Private internal project.

---

# Author

BacSon GPS Monitoring System

Built with Laravel + React + TypeScript.
