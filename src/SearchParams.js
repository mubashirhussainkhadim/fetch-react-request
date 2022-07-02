import { useState, useEffect, useContext } from 'react';
import useBreedList from './useBreedList';
import Results from './Results';
import ThemeContext from './ThemeContext';
const ANIMALS = [ 'bird', 'cat', 'dog', 'rabbit', 'reptile' ];
const SearchParams = () => {
	const [ location, setLocation ] = useState('');
	const [ animal, setAnimal ] = useState('');
	const [ breed, setBreed ] = useState('');
	const [ BREEDS ] = useBreedList(animal);
	const [ theme, setTheme ] = useContext(ThemeContext);

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
				<label htmlFor='theme'>
					<select
						value={theme}
						onChange={(e) => setTheme(e.target.value)}
						onBlur={(e) => setTheme(e.target.value)}>
						<option value='peru'>Peru</option>
						<option value='darkblue'>Dark Blue</option>
						<option value='chartreuse'>Chartreuse</option>
						<option value='mediumorchid'>Medium Orchid</option>
					</select>
				</label>
				<button style={{ backgroundColor: theme }}>Submit</button>
			</form>
			{<Results pets={pets} />}
		</div>
	);
};

export default SearchParams;
