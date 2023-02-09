import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// We'll probably fill this in later, but we can't use authenticated routes in the server hook
// function if the server is never called, so it appears we need to have one of these
export const load: PageServerLoad = async () => {};
