export const validateFormData = async (formData: FormData, schema: any) => {
	const body = Object.fromEntries(formData);
	const result = schema.safeParse(body);
	if (!result.success) {
		const errors = result.error?.flatten();
		return {
			formData: body,
			errors
		};
	}
	return {
		formData: result.data,
		errors: null
	};
};
