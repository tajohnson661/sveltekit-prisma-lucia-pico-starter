import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import github from '@lucia-auth/oauth/github';
import { auth } from '$lib/server/lucia';

export const githubAuth = github(auth, {
	clientId: GITHUB_CLIENT_ID,
	clientSecret: GITHUB_CLIENT_SECRET,
	scope: ['user:email']
});
