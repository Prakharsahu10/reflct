# Reflct: Your Digital Journaling Companion

Reflct is a modern journaling application built with Next.js that helps you capture thoughts, track moods, and reflect on your journey in a beautiful, secure space.

## ✨ Features

- **Rich Text Editor**: Express yourself with a powerful editor supporting formatting, links, and more
- **Daily Prompts**: Get inspired with daily writing prompts
- **Mood Tracking**: Record your emotional state with each entry
- **Collections**: Organize your entries into custom collections
- **Analytics**: Visualize your mood trends over time
- **Secure & Private**: Your thoughts are protected with enterprise-grade security

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Editor**: [React Quill](https://github.com/zenoamaro/react-quill)

## 🏁 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/Prakharsahu10/reflct.git
   cd reflct
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with:

   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/reflct"
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

4. Set up the database

   ```bash
   npx prisma migrate dev
   ```

5. Start the development server

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application

## 📝 Project Structure

- `app/` - Next.js app router pages and layout
- `components/` - Reusable UI components
- `prisma/` - Database schema and migrations
- `actions/` - Server actions for data operations
- `lib/` - Utility functions and helpers
- `hooks/` - Custom React hooks
- `public/` - Static assets

## 📱 Features Overview

### Journal Entries

Write and format your thoughts with the rich text editor, add mood tracking to each entry, and organize them into collections.

### Mood Analytics

Track your emotional journey with visual representations of your mood over time.

### Daily Prompts

Get inspiration from curated writing prompts when you're not sure what to write about.

## 🛠️ Development

```bash
# Run development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
