import { useEffect } from 'react';

const HELLO_MESSAGE = 'Hello from';

export const useGreetFromComponent = (helloMessage = HELLO_MESSAGE, componentName: string) => {
	return useEffect(() => {
		console.log(`${helloMessage} ${componentName}`);
	}, [helloMessage, componentName]);
};
