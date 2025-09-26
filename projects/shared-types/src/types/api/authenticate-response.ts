import { z } from 'zod';
import { ResponseStructure } from '../api';
import { userSchema } from '../data-models/user';

export const authenticationAuthenticateResponseSchema = z.object({
  user: userSchema,
  launchDarklyHash: z.string(),
});

export type AuthenticationAuthenticateResponse = ResponseStructure<
  z.infer<typeof authenticationAuthenticateResponseSchema>
>;
