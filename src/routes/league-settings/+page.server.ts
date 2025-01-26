import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { leagues } from '../../schema/league';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types.js';
import { formSchema } from './schema';
import { db } from '$lib/db.js';

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(formSchema))
  };
};

export const actions: Actions = {
  default: async (event) => {
    const { request, locals } = event;
    //@ts-expect-error userId is not defined
    const { userId } = await locals.auth();
    const form = await superValidate(request, zod(formSchema));
    if (!form.valid) {
      return fail(400, { form, message: 'Invalid form data' });
    }

    const league = await db.insert(leagues).values({ userId, ...form.data });

    form.data.teams.forEach((teamName) => console.log(teamName));

    // Display a success status message
    // redirect to league page
    return message(form, 'Form posted successfully!');
  }
};
