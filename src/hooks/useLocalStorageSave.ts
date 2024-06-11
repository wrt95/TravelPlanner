import { useEffect } from 'react';

export const useLocalStorageSave = <T>(key: string, value: T) => {
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);
};
