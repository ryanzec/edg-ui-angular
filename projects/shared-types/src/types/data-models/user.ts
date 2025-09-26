import { z } from 'zod';

export const UserRoleName = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export type UserRoleName = (typeof UserRoleName)[keyof typeof UserRoleName];

export const assignableUserRoles = [UserRoleName.ADMIN, UserRoleName.USER];

export const userSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  name: z.string(),
  email: z.email(),
  roles: z.array(z.enum(['admin', 'user'])),
  hasPassword: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type User = z.infer<typeof userSchema>;
