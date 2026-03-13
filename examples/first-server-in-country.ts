import {
	AccountService,
	SecurityService,
	StaticProxiesService,
} from "../src";

const accountService = new AccountService();
const account = await accountService.registerAnonymous();
const token = account.value;
const securityTokenWrap = await new SecurityService().getSecurityToken(token);
const securityToken = securityTokenWrap.value;
const countries = await new StaticProxiesService(securityToken).getCountries();
// I want a Brazil proxy
//! adjust "BR" to the ISO 2 code of a country (e.g. United States is "US", etc...)
const brazil = countries.elements.find((country) => country.code.iso2 === "BR");
if (!brazil) {
	throw new Error("I guess we aren't going to Brazil today (couldn't find it)"); // meme lol
}
if (brazil.accessType === "INACCESSIBLE") {
	throw new Error("We can't access Brazil");
}
if (!brazil.servers.elements) throw new Error("No servers in Brazil lol");
// get some random server in the brazil.servers.elements array
// you could use the count variable in `brazil.servers`, but it's just more safe to do this.
const servers = brazil.servers.elements.filter((server) =>
	server.accessType !== "INACCESSIBLE"
)
	.sort((a, b) => a.weight - b.weight); // sort by weight
console.log(servers, "(sorted by lowest to highest weight)");
const server = servers[0];
const { address } = server;
console.log("1st server (lowest weight):", server);
console.log(
	"...as Host:Port (primary)",
	`${address.primary.host}:${address.primary.port}`,
);
if (server.address.secondary) {
	server.address.secondary.forEach(
		(secondary, i) =>
			console.log(
				`...as Host:Port (secondary #${i + 1})`,
				`${secondary.host}:${secondary.port}`,
			),
	);
}
