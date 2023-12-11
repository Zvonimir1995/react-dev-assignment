import { useEffect } from 'react';

import { HELLO_MESSAGE } from './constants';

export const useGreetFromComponent = (helloMessage = HELLO_MESSAGE, componentName: string) => {
	return useEffect(() => {
		console.log(`${helloMessage} ${componentName}`);
	}, [helloMessage, componentName]);
};
