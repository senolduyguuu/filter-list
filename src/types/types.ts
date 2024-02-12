export interface Country {
	code: string;
	name: string;
	native: string;
	capital: string;
	emoji: string;
	currency: string;
	languages: { code: string; name: string }[];
}
