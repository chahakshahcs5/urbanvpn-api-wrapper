import {
	AccountService,
	SecurityService,
	StaticProxiesService,
} from "../";

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
const formattedServerData = (servers.filter((server) => server !== undefined)
	.map((server) => server.address)
	.map((addressesObj) => {
		let secondaryAddresses = addressesObj.secondary?.map((address) =>
			`${address.host}:${address.port}`
		);
		if (secondaryAddresses === undefined) secondaryAddresses = [];
		return [
			`${addressesObj.primary.host}:${addressesObj.primary.port}`,
			...secondaryAddresses,
		];
	})
	.flat()) as `${string}:${number}`[];

formattedServerData.forEach((server) => {
	console.log(server);
});
