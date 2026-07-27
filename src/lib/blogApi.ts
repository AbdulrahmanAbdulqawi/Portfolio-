import { apiClient } from './apiClient';
import type {
  BlogPostSummary,
  BlogPostDetail,
  AdminBlogPostSummary,
  AdminBlogPostDetail,
  BlogPostWrite,
} from '../types';

export const blogApi = {
  listPublic: () => apiClient.get<BlogPostSummary[]>('/api/blog'),
  getPublicBySlug: (slug: string) => apiClient.get<BlogPostDetail>(`/api/blog/${encodeURIComponent(slug)}`),
  listAdmin: (token: string | null) => apiClient.get<AdminBlogPostSummary[]>('/api/admin/blog', token),
  getAdmin: (id: string, token: string | null) => apiClient.get<AdminBlogPostDetail>(`/api/admin/blog/${id}`, token),
  create: (dto: BlogPostWrite, token: string | null) =>
    apiClient.post<AdminBlogPostDetail>('/api/admin/blog', dto, token),
  update: (id: string, dto: BlogPostWrite, token: string | null) =>
    apiClient.put<AdminBlogPostDetail>(`/api/admin/blog/${id}`, dto, token),
  remove: (id: string, token: string | null) => apiClient.delete<void>(`/api/admin/blog/${id}`, token),
};
