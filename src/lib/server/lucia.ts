import lucia from 'lucia-auth';
import prismaAdapter from '@lucia-auth/adapter-prisma';
import { dev } from '$app/environment';
import prisma from '$lib/server/prisma';

const getRole = async (roleId: number): Promise<string> => {
	const role = await prisma.role.findUnique({
		where: {
			id: roleId
		},
		select: {
			name: true
		}
	});
	return role?.name ?? 'user';
};

export const auth = lucia({
	adapter: prismaAdapter(prisma),
	env: dev ? 'DEV' : 'PROD',
	transformUserData: async (userData) => {
		const retval = {
			id: userData.id,
			email: userData.email,
			name: userData.name,
			role: await getRole(userData.roleId)
		};
		return retval;
	}
});

export type Auth = typeof auth;
