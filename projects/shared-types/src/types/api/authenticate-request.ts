import { z } from 'zod';
import { RequestStructure } from '../api';

export const authenticationAuthenticateRequestSchema = z.object({
  email: z.email({ message: 'Invalid email format' }),
  password: z.string().min(1, 'Password is required'),
});

export type AuthenticationAuthenticateRequest = RequestStructure<
  z.infer<typeof authenticationAuthenticateRequestSchema>
>;
