import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Country } from '../../types/types';
import CountryInfo from '../CountryInfo/CountryInfo';

const GET_COUNTRY_INFO = gql`
  query {
    countries {
      code
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;

interface FilteredCountryListProps {
	filterText: string;
	selectedCountry: Country | null;
	onSelectCountry: (country: Country | null) => void;
}

const FilteredCountryList: React.FC<FilteredCountryListProps> = ({ filterText, selectedCountry, onSelectCountry }) => {
	const { loading, error, data } = useQuery(GET_COUNTRY_INFO);
	const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

	useEffect(() => {
		if (loading || error || !data) return;

		const filtered = data.countries.filter((country: Country) =>
			country.name.toLowerCase().includes(filterText.toLowerCase())
		);

		setFilteredCountries(filtered);
	}, [loading, error, data, filterText]);

	useEffect(() => {
		if (filteredCountries.length > 0) {
			const lastIndex = Math.min(filteredCountries.length - 1, 10);
			const defaultSelection = filteredCountries.length <= 10 ? filteredCountries[filteredCountries.length - 1] : filteredCountries[lastIndex];
			onSelectCountry(defaultSelection);
		}
	}, [filteredCountries, onSelectCountry]);

	return (
		<div className="filtered-country-list-container">
			<CountryInfo countries={filteredCountries} selectedCountry={selectedCountry} onSelectCountry={onSelectCountry} />
		</div>
	);
};

export default FilteredCountryList;
