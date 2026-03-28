import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  role: z.enum(['USER', 'ADMIN']),
});

export const listingSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  price: z.string().or(z.number()), // Prisma Decimal comes as string often
  bedrooms: z.number(),
  bathrooms: z.number(),
  propertyType: z.enum(['house', 'apartment', 'townhouse', 'land']),
  suburb: z.string(),
  state: z.string(),
  address: z.string(),
  imageUrl: z.string().nullable(),
  status: z.enum(['available', 'under_offer', 'sold']),
  internalNotes: z.string().nullable().optional(),
  isFeatured: z.boolean(),
  agentId: z.number().nullable(),
  agent: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    phone: z.string().nullable(),
  }).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const listingsResponseSchema = z.object({
  data: z.array(listingSchema),
  meta: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});

export const loginResponseSchema = z.object({
  message: z.string(),
  user: userSchema,
});
