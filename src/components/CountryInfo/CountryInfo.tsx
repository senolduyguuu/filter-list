
import React, { useState } from 'react';
import { Country } from '../../types/types';
import './CountryInfo.css';

interface CountryInfoProps {
	countries: Country[];
	selectedCountry: Country | null;
	onSelectCountry: (country: Country | null) => void;
}

const CountryInfo: React.FC<CountryInfoProps> = ({ countries, selectedCountry, onSelectCountry }) => {
	const colorPalette = ['#9a1a17', '#ccc0b4', '#f4efe9', '#48698c'];
	const [showAll, setShowAll] = useState(false);

	const getBackgroundColor = (country: Country) => {
		if (!selectedCountry) {
			return '';
		}
		return selectedCountry.code === country.code ? colorPalette[3] : '';
	};

	const displayedCountries = showAll ? countries : countries.slice(0, 12);

	return (
		<div className="country-info-container">
			<h1 className="country-info-heading">Country Information</h1>
			<ul className="country-list">
				{displayedCountries.map((country) => (
					<li
						key={country.code}
						className="country-item"
						style={{ backgroundColor: getBackgroundColor(country) }}
						onClick={() => onSelectCountry(selectedCountry && selectedCountry.code === country.code ? null : country)}
					>
						<input
							className='country-item-input'
							type="checkbox"
							checked={selectedCountry ? selectedCountry.code === country.code : false}
							onChange={() => onSelectCountry(selectedCountry && selectedCountry.code === country.code ? null : country)}
						/>
						<strong>{country.name}</strong> - {country.native}, {country.capital}, {country.currency}
						<p>Languages: {country.languages.map((lang) => lang.name).join(', ')}</p>
					</li>
				))}
			</ul>
			{!showAll && countries.length > 12 && (
				<button className="show-more-button" onClick={() => setShowAll(true)}>
					Devamını Gör
				</button>
			)}
		</div>
	);
};

export default CountryInfo;
