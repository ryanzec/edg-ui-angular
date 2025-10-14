import { z } from 'zod';
import { ResponseStructure } from '../utils';

export type UserRoleName = 'admin' | 'user';

export const assignableUserRoles: UserRoleName[] = ['admin', 'user'];

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

export const createUserSchema = userSchema.pick({
  name: true,
  email: true,
  roles: true,
});

export type CreateUser = z.infer<typeof createUserSchema>;

export const updateUserSchema = userSchema
  .pick({
    id: true,
    name: true,
    email: true,
    roles: true,
  })
  .partial({
    name: true,
    email: true,
    roles: true,
  });

export type UpdateUser = z.infer<typeof updateUserSchema>;

export type GetUsersResponse = ResponseStructure<User[]>;

export type GetUserResponse = ResponseStructure<User>;

export type CreateUserResponse = ResponseStructure<User>;

export type UpdateUserResponse = ResponseStructure<User>;

export type DeleteUserResponse = ResponseStructure<User>;
