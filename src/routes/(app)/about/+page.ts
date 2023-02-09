import type { PageLoad } from './$types';

export const load = (async () => {
	return {
		status: 200,
		message: 'About page loaded'
	};
}) satisfies PageLoad;
