import React, { useState } from 'react';
import "./app.css";
import FilteredCountryList from './components/FilteredCountryList/FilteredCountryList';
import { Country } from './types/types';
const App: React.FC = () => {
	const [filterText, setFilterText] = useState('');
	const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

	const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilterText(event.target.value);
	};

	return (
		<div className='filter-countries-inclusive'>
			<div className='filter-countries-content'>
				<h1 className='filter-countries-text'>Country List</h1>
				<input className='filter-countries-input' type="text" placeholder="Search" value={filterText} onChange={handleFilterChange} />
			</div>
			<FilteredCountryList filterText={filterText} selectedCountry={selectedCountry} onSelectCountry={setSelectedCountry} />
		</div>
	);
};

export default App;
