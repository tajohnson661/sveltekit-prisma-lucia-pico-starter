import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const text = formData.get('text');
		console.log(text);

		const answer = '1';
		return { answer, success: true };
	}
} satisfies Actions;
