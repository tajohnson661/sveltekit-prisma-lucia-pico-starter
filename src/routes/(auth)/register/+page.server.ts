import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { validateFormData } from '$lib/utils';
import type { Actions, PageServerLoad } from './$types';

const registerSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.trim()
		.email({ message: 'Must be a valid email' })
		.min(1),
	password: z
		.string({ required_error: 'Password is required' })
		.trim()
		.min(6, { message: 'Password must be at least 6 characters long' }),
	name: z.string({ required_error: 'What is your name?' }).trim().min(1)
});

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.validate();
	if (session) {
		// User is already logged in, so they don't need to register
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	default: async ({ request }) => {
		const { formData, errors } = await validateFormData(await request.formData(), registerSchema);
		console.log('formData', formData);
		console.log('errors after validateFormData:', errors);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			await auth.createUser({
				key: {
					providerId: 'email',
					providerUserId: formData.email,
					password: formData.password
				},
				// TODO: Query for roleId by role name since id can be inconsistent
				attributes: {
					name: formData.name,
					email: formData.email,
					roleId: 2
				}
			});
		} catch (err) {
			console.error(err);
			console.error(err);
			return fail(400, {
				data: formData,
				errors: { message: 'Could not register user' }
			});
		}
		throw redirect(302, '/login');
	}
};
