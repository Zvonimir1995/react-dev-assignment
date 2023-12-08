export const getQueryParamsString = (
	queryParams: { [key: string]: string | string[] | number | number[] | boolean | null } | undefined
) => {
	let queryParamsString = '';
	if (!queryParams) return queryParamsString;
	queryParamsString += '?';
	Object.keys(queryParams).forEach((key) => {
		if (queryParams[key] === undefined) return;
		if (queryParams[key] && Array.isArray(queryParams[key])) {
			(queryParams[key] as string[]).forEach((arrayEl) => {
				queryParamsString += `${key}=${arrayEl}&`;
			});
		} else {
			queryParamsString += `${key}=${queryParams[key]}&`;
		}
	});
	return queryParamsString;
};
