import { getUsesMiddleware } from './get-uses-middleware';

/* 
	Use HTTP Basic authentication to control access to protected resources

	User credentials are stored in a KV namespace called REALTOR_PAGES_AUTH
*/
export async function auth({ env, next, request }) {
	try {
		const usesMiddleware = getUsesMiddleware({ url: request.url });

		if (!usesMiddleware) {
			return await next();
		}

		const authHeader = request?.headers?.get('authorization');

		if (!authHeader?.includes('Basic')) {
			return new Response('Unauthorized', { status: 401, headers: { 'WWW-Authenticate': 'Basic' } });
		}

		const base64Credentials = authHeader?.split(' ')[1];
		const [username, password] = atob(base64Credentials).split(':');
		const userPasswordKV = await env?.REALTOR_PAGES_AUTH?.get(username);

		if (userPasswordKV !== password) {
			return new Response('Unauthorized', { status: 401, headers: { 'WWW-Authenticate': 'Basic' } });
		}

		return await next();
	} catch (error) {
		console.log(error);
		return new Response(`Server Error`, { status: 500 });
	}
}
