import { useEffect } from 'react';

export const useLocalStorageLoad = <T>(
	key: string,
	setState: (value: T) => void
) => {
	useEffect(() => {
		const savedData = localStorage.getItem(key);

		if (savedData) {
			setState(JSON.parse(savedData));
		}
	}, [key, setState]);
};
