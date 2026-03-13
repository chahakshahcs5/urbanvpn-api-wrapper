import type { ClientApp } from "./clientApp.ts";
import type {
	AutoServerRoot,
	Countries,
	CountriesRoot,
	Server,
} from "./staticProxiesService.types.ts";

/**
 * Service for managing static proxies and client application interactions.
 * This class provides methods to send requests to the API and retrieve server and country information.
 */
export class StaticProxiesService {
	/**
		Constructs an instance of the StaticProxiesService.
		Initializes the `bearerAuthorization` and `clientApp` properties,
		allowing for API requests to be authenticated and associated with a specific client application.
		The default client application is set to "URBAN_SHIELD_BROWSER_EXTENSION".


		This constructor sets the `clientApp` property,
		which can be used to identify
		the client application associated with
		this instance
		for further processing or configuration.
		Note that setting the `clientApp` property to
		something other
		than one of the official client apps
		will make you stick out like a sore thumb.
		Line defined in bg/build.js: Line 14111

		@param bearerAuthorization - The Bearer token used for authorization in API requests.
		@param API_URL - The base URL for the API (default is "https://stats.urban-vpn.com/api/rest/v2/").
		@param clientApp - The name of the client application (default is "URBAN_SHIELD_BROWSER_EXTENSION").
	*/
	constructor(
		public bearerAuthorization: string,
		public clientApp: ClientApp = "URBAN_SHIELD_BROWSER_EXTENSION",
		public API_URL: URL | string = "https://stats.urban-vpn.com/api/rest/v2/",
	) {
	}
	/**
	 *  Sends a GET request to the specified URL and returns the parsed JSON response.
	 * This method constructs the necessary headers including client application and authorization.
	 *
	 * Line defined in bg/build.js: Line 14383
	 * @param url The endpoint to request, relative to the API_URL.
	 * @returns A promise that resolves to the parsed JSON response of type T.
	 */
	async request<T>(url: string): Promise<T> {
		const headers = new Headers({
			"X-Client-App": this.clientApp,
			"Accept": "application/json",
			"Pragma": "no-cache",
			"Cache-Control": "no-cache",
			"Authorization": `Bearer ${this.bearerAuthorization}`,
		});
		return await fetch(new URL(url, this.API_URL), {
			method: "GET",
			headers: headers,
		}).then((response) => response.json());
	}

	/**
	 * Retrieves the best server to use for the client application.
	 * This method makes a request to the autoserver endpoint and returns the server information.
	 * Line defined in bg/build.js:
	 * 	Line 144118
	 */
	async getAutoServer(): Promise<Server> {
		// what I can see
		// from the built code
		// seems overcomplicated.
		// it's using generators & etc
		// and the function is
		// REALLY large.
		// The function body starts at line 14119
		// and ends at 14188
		// (excluding the 2 closing braces).
		// I wonder if it's because someone didn't or couldn't use async,
		// so they made this mess :skull:
		const response = await this.request<AutoServerRoot>(
			"entrypoints/autoserver",
		);
		return response.server;
	}
	/**
	 * Retrieves a list of countries supported by the service.
	 * This method makes a request to the countries endpoint and returns the country information.
	 *
	 * @returns A promise that resolves to an array of countries.
	 */
	async getCountries(): Promise<Countries> {
		const response = await this.request<CountriesRoot>("entrypoints/countries");
		return response.countries;
	}
}

export default StaticProxiesService;
