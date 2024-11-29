# Golden Lobster Expenses

A mobile-first Progressive Web Application (PWA) for tracking business expenses.

## Features

- Mobile-optimized expense form
- Photo upload capability
- Offline support
- Easy expense categorization
- VAT tracking
- Multiple payment methods support

## Tech Stack

- Next.js
- TypeScript
- Ant Design
- DrizzleORM
- PostgreSQL
- PWA support

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up your environment variables:
Create a `.env` file with:
```
DATABASE_URL=your_postgres_connection_string
```

3. Run database migrations:
```bash
npm run drizzle-kit generate:pg
npm run drizzle-kit push:pg
```

4. Start the development server:
```bash
npm run dev
```

## Deployment

This application is configured for deployment on Railway. Connect your repository to Railway and set the required environment variables.

## Database Schema

The application uses a PostgreSQL database with DrizzleORM. The schema includes:
- Date and Time
- Business name
- Description
- Price
- Payment type
- VAT
- Categories
- Notes
- Photo attachments

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
