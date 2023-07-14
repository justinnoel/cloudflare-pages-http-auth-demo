// Requests with these strings should not have middleware added to them.
export const undesiredPaths = ['.ico', 'css'];

/* 
	Ignore files that don't need authentication like favicons and CSS.

	Be careful with files like images because they might have sensitive data.
*/
export function getUsesMiddleware({ url }) {
	if (url.includes('resources')) {
		return true;
	}

	return !undesiredPaths.some((undesiredString) => {
		return url.includes(undesiredString);
	});
}
