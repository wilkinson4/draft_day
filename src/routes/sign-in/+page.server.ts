import { signIn } from '../../auth';
import type { Actions } from '../signin/$types';

export const actions: Actions = {
  default: signIn
};
