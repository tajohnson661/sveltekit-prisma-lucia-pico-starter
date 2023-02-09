import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';
import { githubAuth } from '$lib/server/oauth/github';

export const GET = (({ cookies }) => {
	const [authUrl, state] = githubAuth.getAuthorizationUrl();

	cookies.set('authState', state, {
		path: '/',
		httpOnly: true,
		maxAge: 60 * 60
	});

	throw redirect(303, authUrl);
}) satisfies RequestHandler;
