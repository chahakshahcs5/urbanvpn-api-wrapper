/** config data. nothing really special */
export interface Conf<S extends string, H extends string, P extends number> {
	/**
	 * they only have `http` proxies
	 * (even their browser extension hardcodes http protocol while connecting)
	 * so this should always be `http`
	 */
	scheme: S;
	/** host name, usually an IP */
	host: H;
	/** a number instead of a string since why not? */
	port: P;
}

/** why is this needed lol */
export class ProxySignature {
	/** used in the auth lol */
	static buildKey<S extends string, H extends string, P extends number>(
		conf: Conf<S, H, P>,
	): `${S}://${H}:${P}` {
		return `${conf.scheme}://${conf.host}:${conf.port}`;
	}
}

export default ProxySignature;
