import type { RequestHandler } from './$types';
import { auth } from '$lib/server/lucia';
import prisma from '$lib/server/prisma';
import { error, redirect } from '@sveltejs/kit';
import { githubAuth } from '$lib/server/oauth/github';

export const GET = (async ({ url, cookies }) => {
	const code = url.searchParams.get('code') ?? '';
	const authState = url.searchParams.get('state') ?? '';
	const storedAuthState = cookies.get('authState');

	if (authState !== storedAuthState) throw error(500, 'Auth state mismatch.');

	console.log(code);
	const { existingUser, providerUser, createUser, createKey } = await githubAuth.validateCallback(
		code
	);
	console.log('existingUser', existingUser);
	console.log('providerUser', providerUser);

	// existinguser is only returned if there is a github user, not an email user (a different key)
	// If the user already has a user record in the database, we need to call createKey
	let user = existingUser;
	if (user) {
		console.log('existing user', user);
	} else {
		try {
			// First search for the email
			user = await prisma.user.findUnique({
				where: { email: providerUser.email }
			});
			if (!user) {
				// Create the user and add the key (specific to provider) by passing in the key attributes to the lucia createUser call
				user = await createUser({
					name: providerUser.name,
					email: providerUser.email,
					roleId: 2
				});
				console.log('**** user created', user);
			} else {
				// The user already exists, so we need to add the key (specific to provider) to the existing user
				console.log('*** found user by email', user);
				await createKey(user.id);
			}
		} catch (err) {
			console.error(err);
		}
	}

	const newSession = await auth.createSession(user.id);
	const sessionCookies = auth.createSessionCookies(newSession);
	sessionCookies.forEach((cookie) => {
		cookies.set(cookie.name, cookie.value, cookie.attributes);
	});

	throw redirect(307, '/');
}) satisfies RequestHandler;
