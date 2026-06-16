# URL Shortener

A modern URL Shortener application built with Node.js, Express.js, MySQL, MongoDB, Prisma ORM, and Drizzle ORM. This project allows users to convert long URLs into short and shareable links with authentication, user dashboards, and URL management features.

## Features

* User Registration & Login
* User Profile Management
* Create Short URLs
* Edit & Delete Short URLs
* Custom Short URL Generation
* User Dashboard
* URL Redirection
* JWT Authentication
* Session Management
* MySQL & MongoDB Integration
* Prisma ORM & Drizzle ORM
* Responsive User Interface

## Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MySQL
* MongoDB

### ORM & Database Tools

* Prisma ORM
* Drizzle ORM

### Authentication & Security

* JSON Web Token (JWT)
* Argon2
* Bcrypt
* Express Session

### Frontend

* EJS
* HTML
* CSS
* JavaScript

### Validation & Utilities

* Zod
* Cookie Parser
* Connect Flash
* Request IP
* Dotenv

## Installation

```bash
git clone https://github.com/ankitmeenamp/your-repository-name.git
cd your-repository-name
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="mysql://username:password@localhost:3306/url_shortener"
JWT_SECRET=your_secret_key
SESSION_SECRET=your_session_secret
PORT=3000
```

## Database Setup

### Prisma

```bash
npx prisma migrate dev
npx prisma generate
```

### Drizzle

```bash
npm run db:generate
npm run db:migrate
```

## Run Project

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

## API Endpoints

### Create Short URL

```http
POST /api/shorten
```

### Redirect URL

```http
GET /:shortCode
```

## Upcoming Features

* Email Verification
* URL Analytics & Click Tracking
* QR Code Generation
* Link Expiration Management
* Password-Protected URLs

## Author

**Ankit Meena**

GitHub: https://github.com/ankitmeenamp
