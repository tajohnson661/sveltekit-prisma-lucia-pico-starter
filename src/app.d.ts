import type { PrismaClient } from '@prisma/client';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			validate: import('@lucia-auth/sveltekit').Validate;
			validateUser: import('@lucia-auth/sveltekit').ValidateUser;
			setSession: import('@lucia-auth/sveltekit').SetSession;
		}
		// interface PageData {}
		// interface Platform {}
		interface StringMap {
			[key: string]: string;
		}
	}
	var __prisma: PrismaClient; // eslint-disable-line no-var
}

/// <reference types="lucia-auth" />
declare namespace Lucia {
	type Auth = import('$lib/server/lucia.ts').Auth;
	type UserAttributes = {
		email: string;
		name?: string;
		role: string;
	};
}

export {};
