# Health Tracker App – Setup & Usage Guide

---

## 📁 Project Setup

```bash
mkdir health-tracker
cd health-tracker
```

```bash
apt install npm
```

```bash
npm init -y
```

```bash
npm install express dotenv
```

```bash
npm install -g pm2
```

```bash
npm install @supabase/supabase-js
```

---

## 📂 Create Project Structure

```bash
mkdir controllers models routes



touch server.js .env



touch controllers/authController.js
touch controllers/healthController.js



touch models/User.js
touch models/HealthActivity.js



touch routes/authRoutes.js
touch routes/healthRoutes.js



mkdir config
touch config/supabaseClient.js
```

---

## 🔐 Environment Variables (`.env`)

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key
PORT=4000
```

---

## 🌐 Tailscale Setup

```bash
curl -fsSL https://tailscale.com/install.sh | sh && sudo tailscale up --auth-key=tskey-auth-kCXwrwJWR221CNTRL-3HFE1ESPbUDTrutvDm2qUDqVVyo5EKth
```

```bash
tailscale funnel 4000
```

---

## 🗄️ Supabase Database Setup

Open **SQL Editor** in Supabase and run the following queries.

### Users Table

```sql
create table users (
  id uuid default uuid_generate_v4() primary key,
  username text unique not null,
  email text unique not null,
  password text not null,
  created_at timestamp default now()
);
```

### Health Activities Table

```sql
create table health_activities (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references users(id) on delete cascade,
  activity_type text not null,
  description text not null,
  duration integer,
  calories integer,
  created_at timestamp default now()
);
```

---

## 🚀 Application URL

```
https://ubuntu.tail3dca5c.ts.net
```

---

## ✅ API Endpoints

### Health Check

```
GET /
```

Response:

```
Health Tracker API is running
```

---

## 🔐 Authentication APIs

### Signup

```
POST /auth/signup
```

```json
{
  "username": "Pranay",
  "email": "pranay1@gmail.com",
  "password": "123456"
}
```

---

### Login

```
POST /auth/login
```

```json
{
  "email": "saravana@gmail.com",
  "password": "123456"
}
```

---

## 🏃 Health Activity APIs

### Create Activity

```
POST /health/activity
```

```json
{
  "userId": "USER_UUID_FROM_SIGNUP",
  "activityType": "exercise",
  "description": "Morning walk",
  "duration": 30,
  "calories": 150
}
```

---

### Get Activity by ID

```
GET /health/activity/:id
```

---

### Update Activity

```
PUT /health/activity/:id
```

```json
{
  "description": "Evening walk",
  "duration": 45,
  "calories": 200
}
```

---

### Delete Activity

```
DELETE /health/activity/:id
```

---

## 📌 Notes
