/**
 * Contains {@link AccountService},
 * which is a service for managing
 * account-related operations
 * for the client application.
 * @example
 * ```ts
 * import { AccountService } from "../accountService.ts";
 * import { SecurityService } from "../securityService.ts";
 * import StaticProxiesService from "../staticProxiesService.ts";
 * const accountService = new AccountService();
 * const account = await accountService.registerAnonymous();
 * const token = account.value;
 * //! Use `token`
 * console.log(`account token: ${token}`);
 * ```
 * @module
 */

import type { AnonymousRegisterRoot } from "./accountService.types.ts";
import type { ClientApp } from "./clientApp.ts";

/**
 * Service for managing account-related operations for the client application.
 * This class provides methods to build API endpoints and register anonymous users,
 * facilitating user management within the Urban VPN ecosystem.
 */
export class AccountService {
	/**
	 * Constructs an instance of the AccountService.
	 * Initializes the `clientApp` and `API_URL` properties, allowing for interaction
	 * with the Urban VPN API for account management.
	 *
	 * @param clientApp - The name of the client application (default is "URBAN_SHIELD_BROWSER_EXTENSION").
	 * @param API_URL - The base URL for the API (default is "https://api-pro.urban-vpn.com/rest/v1/").
	 */
	constructor(
		public clientApp: ClientApp = "URBAN_SHIELD_BROWSER_EXTENSION",
		public API_URL: URL | string = "https://api-pro.urban-vpn.com/rest/v1/",
	) {}

	/**
	 * Builds a complete endpoint URL by combining the provided endpoint with the base API URL.
	 *
	 * @param endpoint - The specific endpoint to be appended to the API_URL.
	 * @returns A URL object representing the complete endpoint.
	 * @internal
	 */
	buildEndpoint(endpoint: string): URL {
		return new URL(endpoint, this.API_URL);
	}
	// functions skipped because I don't care about them:
	// - restorePassword
	// - emitRestorePasswordRequestEvent
	// - loadProfile
	// currently just want to be able to get proxy details
	// maybe I'll implement them later

	/**
	 * Registers an anonymous user for the client application.
	 * This method sends a POST request to the API to create an anonymous user,
	 * including the client application information in the request body.
	 *
	 * @returns A promise that resolves to the response of the registration,
	 *          cast to the AnonymousRegisterRoot type.
	 */
	async registerAnonymous(): Promise<AnonymousRegisterRoot> {
		// also overcomplicated with generators lol
		return await fetch(
			this.buildEndpoint(
				`registrations/clientApps/${this.clientApp}/users/anonymous`,
			),
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					// ☠️☠️☠️ Why is this ALSO here???
					// why not just remove either the part in the path or the clientApp field?
					clientApp: {
						// also why is this in a new field
						// instead of this clientApp field just being a string?
						name: this.clientApp,
					},
				}),
			},
		).then((res) => res.json()).then((json) => json as AnonymousRegisterRoot);
	}
}
export default AccountService;
