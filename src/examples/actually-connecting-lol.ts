import { HttpProxyAgent, HttpsProxyAgent } from "http-proxy-agent";
import {
	AccountService,
	ProxySignature,
	SecurityService,
	SignatureHelper,
	StaticProxiesService,
} from "../";

const accountService = new AccountService();
const account = await accountService.registerAnonymous();
const accountToken = account.value;
const ss = new SecurityService();
const { value: securityToken } = await ss.getSecurityToken(accountToken);

const sps = new StaticProxiesService(securityToken);
const server = await sps.getAutoServer();
const sigs = SignatureHelper.accumulateSignatures(server);
const addr = server.address.primary;

const ps = ProxySignature.buildKey({
	scheme: "http",
	...addr,
});

const apt = await ss.getAuthProxyToken(securityToken, sigs[ps]);

const proxyUrl = `http://${apt.value}:1@${addr.ip}:${addr.port}`;
const httpAgent = new HttpProxyAgent(proxyUrl);
const httpsAgent = new HttpsProxyAgent(proxyUrl);

const r = await fetch(`https://proxycheck.io/v3/${addr.ip}`, {
	agent: { http: httpAgent, https: httpsAgent },
} as any);

console.log(await r.json());
