import { redirect, type Handle } from '@sveltejs/kit';
import { handleHooks } from '@lucia-auth/sveltekit';
import { auth } from '$lib/server/lucia';
import { sequence } from '@sveltejs/kit/hooks';

export const checkProtectedRoutes: Handle = async ({ resolve, event }) => {
	// Looks like a bug in validateUser where the user is returned as a promise.
	// We can just await for it, whether it's a promise or not.
	const { user: userPromise, session } = await event.locals.validateUser();
	const user = await userPromise;
	if (event.url.pathname.startsWith('/admin')) {
		if (!session || user.role !== 'ADMIN') {
			console.log('hook: admin protected route:', event.url.pathname);
			throw redirect(303, '/');
		}
	}

	if (event.url.pathname.startsWith('/protectedroute')) {
		if (!session) {
			console.log('hook: protected route:', event.url.pathname);
			throw redirect(303, '/');
		}
	}

	return resolve(event);
};

export const handle: Handle = sequence(handleHooks(auth), checkProtectedRoutes);
