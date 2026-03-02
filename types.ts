export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface AuthorMetadata {
  name?: string;
  bio?: string;
  avatar?: {
    url: string;
    imgix_url: string;
  };
  twitter_handle?: string;
}

export interface Author extends CosmicObject {
  type: 'authors';
  metadata: AuthorMetadata;
}

export interface CategoryMetadata {
  name?: string;
  description?: string;
  color?: string;
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: CategoryMetadata;
}

export interface ArticleMetadata {
  headline?: string;
  excerpt?: string;
  content?: string;
  featured_image?: {
    url: string;
    imgix_url: string;
  };
  author?: Author;
  category?: Category;
  published_date?: string;
}

export interface Article extends CosmicObject {
  type: 'articles';
  metadata: ArticleMetadata;
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}