import type { Owner } from "./common.ts";

/**
 * data from security service token endpoint
 */
export interface SecurityTokenRoot {
	type: string;
	value: string;
	creationTime: number;
	expirationTime: number;
	owner: Owner;
	clientApp: { name: string };
	features: { key: string }[];
	locations: { countryCode: string }[];
	package: { id: string; subscriptionAware: boolean };
	expired: boolean;
}

/**
 * data from auth proxy token endpoint
 * looked the same as SecurityTokenRoot but it removed clientApp,
 * so I just pasted it from SecurityTokenRoot and removed that field
 */
export interface AuthProxyTokenRoot {
	type: string;
	value: string;
	creationTime: number;
	expirationTime: number;
	owner: Owner;
	features: { key: string }[];
	locations: { countryCode: string }[];
	package: { id: string; subscriptionAware: boolean };
	expired: boolean;
}
