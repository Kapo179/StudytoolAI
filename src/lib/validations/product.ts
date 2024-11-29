import * as z from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const fileSchema = z.custom<File>()
  .refine((file) => {
    if (!file) return false;
    return file instanceof File;
  }, 'Please upload a file')
  .refine((file) => {
    if (!file) return false;
    return file.size <= MAX_FILE_SIZE;
  }, 'Max file size is 5MB')
  .refine((file) => {
    if (!file) return false;
    return ACCEPTED_IMAGE_TYPES.includes(file.type);
  }, 'Only .jpg, .jpeg, .png and .webp formats are supported');

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(50),
  tagline: z.string().min(1, 'Tagline is required').max(60),
  description: z.string().min(50, 'Description must be at least 50 characters').max(500),
  contactName: z.string().min(1, 'Your name is required'),
  contactEmail: z.string().email('Please enter a valid email address'),
  logo: fileSchema.nullable().optional(),
  images: z.array(fileSchema).min(3, 'At least 3 screenshots are required').max(8, 'Maximum 8 screenshots allowed'),
  websiteUrl: z.string().url('Please enter a valid URL'),
  pricing: z.object({
    type: z.enum(['free', 'freemium', 'paid']),
    plans: z.array(z.object({
      name: z.string(),
      price: z.number(),
      features: z.array(z.string()),
    })).optional(),
  }),
});

export type Product = z.infer<typeof productSchema>;