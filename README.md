# TechSmash

![TechSmash](https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=1200&h=300&fit=crop&auto=format)

A bold, modern tech news publication platform inspired by TechCrunch. Built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com) CMS for seamless content management.

## Features

- 🏠 Dynamic homepage with hero article and latest news grid
- 📰 Individual article pages with rich content rendering
- 🏷️ Category pages with color-coded filtering
- ✍️ Author profile pages with article listings
- 📱 Fully responsive design for all screen sizes
- ⚡ Server-side rendering for blazing fast performance
- 🎨 Bold editorial design with vibrant green accents
- 🔍 SEO optimized with dynamic metadata

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=69a5f018a044bdbdb857e4d8&clone_repository=69a5f158a044bdbdb857e4fd)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: TechSmash Techcrunch clone"

### Code Generation Prompt

> "Build a Next.js application for a website called 'TechSmash'. The content is managed in Cosmic CMS with the following object types: authors, categories, articles. Create a beautiful, modern, responsive design with a homepage and pages for each content type. TechSmash Techcrunch clone"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS for content management
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) — Beautiful prose styling

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with your bucket configured

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Set up environment variables:
   ```
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```
4. Run the development server:
   ```bash
   bun dev
   ```

## Cosmic SDK Examples

### Fetching Articles
```typescript
const { objects: articles } = await cosmic.objects
  .find({ type: 'articles' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Article by Slug
```typescript
const { object: article } = await cosmic.objects
  .findOne({ type: 'articles', slug: 'my-article' })
  .props(['id', 'title', 'slug', 'metadata', 'content'])
  .depth(1)
```

## Cosmic CMS Integration

This app uses the following Cosmic object types:

| Object Type | Description |
|------------|-------------|
| `articles` | News articles with headlines, excerpts, content, images, authors, and categories |
| `authors` | Writer profiles with names, bios, avatars, and Twitter handles |
| `categories` | Topic categories with names, descriptions, and colors |

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy

### Netlify
1. Push your code to GitHub
2. Import the project on [Netlify](https://netlify.com)
3. Set build command to `bun run build`
4. Add environment variables
5. Deploy

<!-- README_END -->