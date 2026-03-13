import type { ClientApp } from "./clientApp.ts";
import type {
	AuthProxyTokenRoot,
	SecurityTokenRoot,
} from "./securityService.types.ts";
/**
 * Service for managing security tokens.
 * This class provides methods to send requests to the API and retrieve security tokens.
 * Defined in bg/build.js: Line 51576
 */
export class SecurityService {
	/**
	 * Defined in bg/build.js: Line 51577
	 */
	constructor(
		public clientApp: ClientApp = "URBAN_SHIELD_BROWSER_EXTENSION",
		public API_URL: URL | string = "https://api-pro.urban-vpn.com/rest/v1/",
	) {
	}
	/**
	 * Builds a complete endpoint URL by combining the provided endpoint with the base API URL.
	 * @param endpoint The endpoint to build the URL for.
	 * @returns The built endpoint.
	 * @internal
	 */
	private buildEndpoint(endpoint: string): URL {
		return new URL(endpoint, this.API_URL);
	}
	/**
	 * Defined in bg/build.js: Line 51582
	 * Gets the authentication token, returns `unknown` since I can't test it.
	 */
	async getAuthToken(username: string, password: string): Promise<unknown> {
		// It looks like the output basic auth token is base64
		const encoded = btoa(`${username}:${password}`);
		const headers = new Headers({
			"Authorization": `Basic ${encoded}`,
			"Content-Type": "application/json",
		});
		const response = await fetch(this.buildEndpoint("auth/token"), {
			method: "POST",
			headers: headers,
		});
		return await response.json();
	}
	/**
	 * Defined in bg/build.js: Line 51604
	 * This method sends a POST request to the API to create a new security token.
	 * It includes the client application information in the request body.
	 * @param bearerAuthorization The Bearer token used for authorization in API requests.
	 * @returns Some extra data with a security token
	 */
	async getSecurityToken(
		bearerAuthorization: string,
	): Promise<SecurityTokenRoot> {
		const response = await fetch(this.buildEndpoint("security/tokens/accs"), {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${bearerAuthorization}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				clientApp: {
					name: this.clientApp,
				},
				type: "accs",
			}),
		});
		return await response.json() as SecurityTokenRoot;
	}
	/**
	 * Defined in bg/build.js: Line 51628
	 * This method sends a POST request to the API to create a new security token.
	 * It includes the client application information in the request body.
	 * Returns `unknown` since I can't test it.
	 * @param bearerAuthorization security service token
	 * @param signature The signature used for authorization in API requests.
	 * @returns A promise that resolves to the response of the security token request.
	 */
	async getAuthProxyToken(
		bearerAuthorization: string,
		signature: string,
	): Promise<AuthProxyTokenRoot> {
		return await fetch(this.buildEndpoint("security/tokens/accs-proxy"), {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${bearerAuthorization}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				type: "accs-proxy",
				clientApp: {
					name: this.clientApp,
				},
				signature,
			}),
		}).then((response) => response.json());
	}
}
export default SecurityService;
