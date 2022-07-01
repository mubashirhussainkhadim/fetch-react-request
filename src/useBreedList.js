import { useState, useEffect } from 'react';

const localCache = {};

export default function useBreedList(animal) {
	const [ BreedList, setBreedList ] = useState([]);
	const [ status, setStatus ] = useState('unload');
    // useEffect(() => {
    //     alert(status)
    // },[status])
	useEffect(
		() => {
			if (!animal) {
				setBreedList([]);
			} else if (localCache[animal]) {
				setBreedList(localCache[animal]);
			} else {
				requesyBreedList();
			}

			async function requesyBreedList() {
				setBreedList([]);
				setStatus('Loading');

				const response = await fetch(`http://pets-v2.dev-apis.com/breeds?animal=${animal}`);
				const json = await response.json();
				localCache[animal] = json.breeds || [];
				setBreedList(localCache[animal]);
				setStatus('Loaded');
			}
		},
		[ animal ]
	);
	return [ BreedList, status ];
}
