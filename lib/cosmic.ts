import { createBucketClient } from '@cosmicjs/sdk';
import type { Article, Author, Category } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging',
});

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}

export async function getArticles(): Promise<Article[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'articles' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);

    const articles = response.objects as Article[];
    return articles.sort((a, b) => {
      const dateA = new Date(a.metadata?.published_date || a.created_at).getTime();
      const dateB = new Date(b.metadata?.published_date || b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch articles');
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'articles', slug })
      .props(['id', 'title', 'slug', 'metadata', 'content', 'created_at', 'modified_at'])
      .depth(1);

    return response.object as Article;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch article');
  }
}

export async function getAuthors(): Promise<Author[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);

    return response.objects as Author[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch authors');
  }
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'authors', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);

    return response.object as Author;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch author');
  }
}

export async function getArticlesByAuthor(authorId: string): Promise<Article[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'articles', 'metadata.author': authorId })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);

    const articles = response.objects as Article[];
    return articles.sort((a, b) => {
      const dateA = new Date(a.metadata?.published_date || a.created_at).getTime();
      const dateB = new Date(b.metadata?.published_date || b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch articles by author');
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);

    return response.objects as Category[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch categories');
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categories', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);

    return response.object as Category;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch category');
  }
}

export async function getArticlesByCategory(categoryId: string): Promise<Article[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'articles', 'metadata.category': categoryId })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);

    const articles = response.objects as Article[];
    return articles.sort((a, b) => {
      const dateA = new Date(a.metadata?.published_date || a.created_at).getTime();
      const dateB = new Date(b.metadata?.published_date || b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch articles by category');
  }
}