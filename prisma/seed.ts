import { PrismaClient, Prisma } from '@prisma/client';

enum Roles {
	ADMIN = 'ADMIN',
	USER = 'USER'
}

const prisma = new PrismaClient();

const roleData: Prisma.RoleCreateInput[] = [
	{
		name: Roles.ADMIN
	},
	{
		name: Roles.USER
	}
];

const userData: Prisma.UserCreateInput[] = [
	{
		id: 'id4admin',
		name: 'Admin',
		email: 'admin@example.com',
		role: { connect: { name: Roles.ADMIN } }
	},
	{
		id: 'id4firstuser',
		name: 'Tom',
		email: 'tom@example.com',
		role: { connect: { name: Roles.USER } }
	}
];

const hashedAdminPassword =
	's2:xYMLvu8uWkwOdf6E:0bcc793878c673aedb14aa64de0d2b6110c2f4798e64525e61b17112bac72589f5b3e5395e914f12ba2945e98b211d27ab18b97b35d02a0420b2040ed817a9ce';
const hashedUserPassword =
	's2:vLq9vsiaHqjFaDZa:044c1f9be5d98a8ed4667fe5dcc5278e9a8cda0c57a0349f38132ae5f3e87c3e90bc88545feb2632ea9d41d57292da8da2ee198b3efb3f9bcb04766bc3405628';

async function main() {
	console.log(`Start seeding ...`);

	// Add roles
	for (const r of roleData) {
		const role = await prisma.role.create({
			data: r
		});
		console.log(`Created role with id: ${role.id}`);
	}

	// Add Users
	for (const u of userData) {
		const pw = u.name === 'Admin' ? hashedAdminPassword : hashedUserPassword;
		const user = await prisma.user.create({
			data: u
		});
		const key = await prisma.key.create({
			data: {
				id: `email:${user.email}`,
				primary: true,
				user_id: user.id,
				hashed_password: pw
			}
		});
		console.log(`Created user with id: ${user.id}`);
		console.log('key:', key);
	}
	console.log(`Seeding finished.`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
