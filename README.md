# Afalagi

Afalagi is a web-based pharmacy management and directory platform built with Next.js. It allows pharmacies to register, manage their profile and inventory, and be reviewed by administrators. The platform also provides a public-facing view of approved pharmacies and medicines for users.

## Project Overview

The system is designed to support three main user groups:

- Users who can browse pharmacies and medicines
- Pharmacists who can manage their pharmacy profile and inventory
- Administrators who can review and approve pharmacy registrations

## Main Features

- Pharmacy registration and profile management
- Medicine catalog and inventory handling
- Pharmacy approval and verification flow for administrators
- Search and filtering for pharmacies and medicines
- Authentication and role-based access

## Technology Stack

- Next.js 14
- React 18
- TypeScript
- Prisma ORM
- MySQL
- bcryptjs for password hashing
- JWT-based authentication

## Project Structure

The project is organized as follows:

- src/app: application pages and route-based UI
- src/actions: server actions for business logic
- src/services: service layer for database operations
- src/lib: shared utilities, Prisma client, and auth helpers
- prisma: database schema and migrations

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 18 or newer
- npm
- MySQL database

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and configure your database connection:

```env
DATABASE_URL="mysql://user:password@localhost:3306/afalagi"
```

4. Generate the Prisma client and run migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

### Run the Application

Start the development server:

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

## Available Scripts

- `npm run dev` - start the development server
- `npm run build` - build the application for production
- `npm run start` - start the production server
- `npm run lint` - run the linter

## Notes

The current implementation includes a working admin verification flow, pharmacy management pages, and inventory-related features. The database schema is managed through Prisma and is located in the `prisma` directory.
