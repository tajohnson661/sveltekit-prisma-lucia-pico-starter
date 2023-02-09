import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { validateFormData } from '$lib/utils';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';

const loginSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.trim()
		.email({ message: 'Must be a valid email' })
		.min(1),
	password: z
		.string({ required_error: 'Password is required' })
		.trim()
		.min(6, { message: 'Password must be at least 6 characters long' })
});

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.validate();
	if (session) {
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const { formData, errors } = await validateFormData(await request.formData(), loginSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		// It passed form validation. Now we can start the login process. If it fails,
		// pass an error back in same format as form validation errors, but with a message.

		try {
			const key = await auth.validateKeyPassword('email', formData.email, formData.password);
			const session = await auth.createSession(key.userId);
			locals.setSession(session);
		} catch (err) {
			console.error(err);
			return fail(400, {
				data: formData,
				errors: { message: 'Invalid email or password' }
			});
		}
		throw redirect(302, '/');
	}
};
