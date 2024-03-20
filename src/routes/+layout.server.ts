import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
  return {
    session: await event.locals.auth(),
    loginRedirectUrl: event.cookies.get('loginRedirectUrl')
  };
};
