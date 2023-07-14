import { auth } from '../../utils/auth';

export async function onRequest({ env, next, request }) {
	return auth({ env, next, request });
}
