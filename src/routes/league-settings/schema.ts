import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(2).max(50),
  numberOfTeams: z.coerce.number().min(8).max(12).default(12),
  teams: z
    .array(z.string().min(3).max(50))
    .default(['', '', '', '', '', '', '', '', '', '', '', ''])
});

export type FormSchema = typeof formSchema;
