/**
 * The root response of the countries API.
 */
export interface CountriesRoot {
	countries: Countries
}

/**
 * The root response of the auto server API.
 */
export interface AutoServerRoot {
	server: Server
}

/**
 * Literally just a wrapper around a list of {@link CountryEx CountryEx instances}.
 */
export interface Countries {
	elements: CountryEx[]
}

/**
 * from bg/build.js, line 47040
 * RANDOM is only for the AutoServer API
 */
export type AccessType =
	"ACCESSIBLE"
		| "RANDOM"
		| "INACCESSIBLE";

/**
 * Contains data about a country which has no servers or access type.
 * @see {@link CountryEx} has `accessType` and `servers`, you're most likely going to use this.
 */
export interface BaseCountry {
	code: Code
	title: string
	continent: string
	subRegion: string
	intermediateRegion: string
}

/**
 * An extended version of {@link BaseCountry} with the `accessType` and `servers` property,
 * you're most likely using this.
 */
export interface CountryEx extends BaseCountry {
	accessType: AccessType
	servers: Servers
}

// export type Country = BaseCountry | CountryEx;

/**
 * Simply contains the ISO2 and ISO3 codes for a country.
 * @example
 * 
 * ```ts
 * {
 * 	iso2: "US",
 * 	iso3: "USA"
 * }
 * ```
 */
export interface Code {
	/**
	 * The 2 letters of the ISO code that this interface represents.
	 * @example "US"
	 */
	iso2: string
	/**
	 * The 3 letters of the ISO code that this interface represents.
	 * @example "USA"
	 */
	iso3: string
}

/**
 * A list of countries in {@link elements Servers.elements}
 * with a count property which is useless and can be replaced using `elements.length`.
 */
export interface Servers {
	count: number
	elements?: Server[]
}

/**
 * A server.
 */
export interface Server {
	/**
	 * If you can access it or it's a random server returned by the auto server API.
	 */
	accessType: AccessType
	/**
	 * The name of the server.
	 */
	name: string
	/**
	 * What group the server is in.
	 */
	group: string
	/**
	 * What type of server it is.
	 */
	type: string
	/**
	 * The address details of the server.
	 */
	address: Address
	/**
	 * The weight / load of the server.
	 */
	weight: number
	/**
	 * A signature of the server.
	 */
	signature: string
}

/**
 * Contains a primary and optionally a list of secondary addresses.
 */
export interface Address {
	primary: Primary
	secondary?: Secondary[]
}

/**
 * The primary address of a server, host / IP and port.
 */
export interface Primary {
	host: string
	port: number
	ip: string
}

/**
 * A secondary address of a server, host and port.
 */
export interface Secondary {
	host: string
	port: number
}
