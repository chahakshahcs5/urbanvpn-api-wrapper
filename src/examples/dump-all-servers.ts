import { writeFileSync } from "fs";
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
const servers = (countries
	.elements
	.filter((country) => country.servers.elements !== undefined)
	.map((country) => country.servers.elements)
	.flat()
	.filter((server) => server !== undefined)
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

writeFileSync("./servers.txt", servers.join("\n"));
