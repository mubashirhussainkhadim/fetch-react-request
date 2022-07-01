import { useState, useEffect } from 'react';
import useBreedList from './useBreedList';
import Pet from './Pet';
const ANIMALS = [ 'bird', 'cat', 'dog', 'rabbit', 'reptile' ];
const SearchParams = () => {
	const [ location, setLocation ] = useState('');
	const [ animal, setAnimal ] = useState('');
	const [ breed, setBreed ] = useState('');
	const [BREEDS] = useBreedList(animal)
	const [ pets, setPets ] = useState([]);

	useEffect(() => {
		requestPets();
	}, []);
	async function requestPets() {
		const response = await fetch(
			`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
		);
		const json = await response.json();

		setPets(json.pets);
	}
	const locationChangeHandler = (e) => setLocation(e.target.value);
	return (
		<div className='search-params'>
			<form
            onSubmit={(e) => {
                e.preventDefault();
                requestPets();
            }}>
				<lablel htmlFor='location'>
					<input id='location' placeholder='Location' value={location} onChange={locationChangeHandler} />
				</lablel>
				<label htmlFor='animal'>
					animal
					<select
						id='animal'
						value={animal}
						onChange={(e) => {
							setAnimal(e.target.value);
						}}
						onBlur={(e) => {
							setAnimal(e.target.value);
						}}>
						<option />
						{ANIMALS.map((animal) => (
							<option key={animal} value={animal}>
								{animal}
							</option>
						))}
					</select>
				</label>
				<label htmlFor='breed'>
					breed
					<select
						
						id='breed'
						value={breed}
						onChange={(e) => {
							setBreed(e.target.value);
						}}
						onBlur={(e) => {
							setBreed(e.target.value);
						}}>
						<option />
						{BREEDS.map((breed) => (
							<option key={breed} value={breed}>
								{breed}
							</option>
						))}
					</select>
				</label>
				<button>Submit</button>
			</form>
			{pets.map((pet) => <Pet name={pet.name} animal={pet.animal} breed={pet.breed} key={pet.id} />)}
		</div>
	);
};

export default SearchParams;
