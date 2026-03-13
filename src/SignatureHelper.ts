import { type Conf, ProxySignature } from "./ProxySignature";
import type { Server } from "./staticProxiesService.types";

type S2S = { [k: string]: string };

/** helper for signatures, copied and pasted from their code lol */
export class SignatureHelper {
	/**
	 * @param sigKeys Signature to Server Signature key
	 * @param proxy Proxy data
	 * @returns signature
	 */
	static getSignature(
		sigKeys: S2S,
		proxy: Conf<string, string, number>,
	): string {
		const key = ProxySignature.buildKey(proxy);
		const signature = sigKeys[key];
		return signature;
	}
	/**
	 * @param sigKeys Signature to Server Signature key
	 * @param proxy Proxy data
	 * @returns signature and proxy data
	 */
	static getSignatureWithProxy<P extends Conf<string, string, number>>(
		sigKeys: S2S,
		proxy: P,
	): {
		signature: string;
		proxy: P;
	} {
		const signature = SignatureHelper.getSignature(sigKeys, proxy);
		return {
			signature,
			proxy,
		};
	}

	/**
	 * @returns a dictionary of [signature key]: server.signature, why do they do it like this? idk
	 */
	static accumulateSignatures(
		server: Server,
	): { [key: string]: (typeof server)["signature"] } {
		const sigs: { [key: string]: (typeof server)["signature"] } = {};
		const addr = server.address.primary;
		const key = ProxySignature.buildKey({
			scheme: "http",
			host: addr.ip,
			port: addr.port,
		});
		sigs[key] = server.signature;
		// if there's a secondary address, add it too
		if (server.address.secondary) {
			for (const secondary of server.address.secondary) {
				const skey = ProxySignature.buildKey({
					scheme: "http",
					...secondary,
				});
				sigs[skey] = server.signature;
			}
		}
		return sigs;
	}
}
export default SignatureHelper;
