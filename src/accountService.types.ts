import type { Owner } from "./common.ts";

/**
 * The root response of the anonymous account registration API.
 */
export interface AnonymousRegisterRoot {
	type: string
	value: string
	creationTime: number
	owner: Owner
	expired: boolean
}
export default AnonymousRegisterRoot;
