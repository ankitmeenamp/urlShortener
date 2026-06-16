# URL Shortener

A modern URL Shortener application built with Node.js, TypeScript, MySQL, Prisma, and Drizzle ORM. This project allows users to convert long URLs into short and shareable links with efficient database management.

## Features

* Shorten long URLs instantly
* Unique short code generation
* Redirect short URLs to original destinations
* MySQL database integration
* Prisma ORM support
* Drizzle ORM support
* Clean and scalable architecture

## Tech Stack

* Node.js
* EJS
* Express.js
* MongoDB
* Mongoose
* MySQL
* Prisma ORM
* Drizzle ORM
* HTML
* CSS
  

## Installation

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
npm install
```

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL="mysql://username:password@localhost:3306/url_shortener"
PORT=3000
```

## Database Setup

Prisma:

```bash
npx prisma migrate dev
npx prisma generate
```

Drizzle:

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

## Run Project

Development:

```bash
npm run dev
```

Production:

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

## Features

* User Registration & Login
* User Profile Management
* Create Short URLs
* Edit & Delete Short URLs
* Custom Short URL Generation
* User Dashboard
* URL Redirection
* MySQL Database Integration
* Prisma ORM
* Drizzle ORM
* Responsive UI

## Upcoming Features

* Email Verification
* URL Analytics & Click Tracking
* QR Code Generation
* Link Expiration
* Password-Protected URLs


## Author

Ankit Meena
