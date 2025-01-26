import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handle as authenticationHandle } from './auth';

//@ts-expect-error event and resolve have any type
async function authorizationHandle({ event, resolve }) {
  // Protect any routes under /authenticated
  if (event.url.pathname !== '/sign-in') {
    const session = await event.locals.auth();
    if (!session) {
      //set cookie to redirect to the page after signing in
      try {
        const url = new URL(event.url);
        const redirectUrl = url.pathname + url.search + url.hash;
        event.cookies.set('loginRedirectUrl', redirectUrl, { path: '/', httpOnly: false });
      } catch (e) {
        console.warn('Invalid URL. Defaulting to /league-settings');
        event.cookies.set('loginRedirectUrl', '/league-settings', { path: '/', httpOnly: false });
      }
      // Redirect to the signin page
      throw redirect(303, `/sign-in`);
    }
  }

  // If the request is still here, just proceed as normally
  return resolve(event);
}

// First handle authentication, then authorization
// Each function acts as a middleware, receiving the request handle
// And returning a handle which gets passed to the next function
export const handle: Handle = sequence(authenticationHandle, authorizationHandle);
