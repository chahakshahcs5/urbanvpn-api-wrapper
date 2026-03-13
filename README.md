# Urban VPN API Wrapper

A powerful TypeScript wrapper for Urban VPN services. This library provides a clean and structured way to interact with Urban VPN's internal APIs, allowing you to manage accounts, security services, and proxies.

## Features

- **Account Service**: Manage user accounts and authentication.
- **Security Service**: Handle security-related tokens and signatures.
- **Static Proxies**: Retrieve and manage geographic proxy locations.
- **TypeScript Support**: Full type definitions for all API responses and requests.
- **Axios-based**: Reliable HTTP requests with built-in retry logic (where applicable).

## Installation

```bash
npm install urbanvpn-api-wrapper
```

## Quick Start

```typescript
import { UrbanVPNClient } from 'urbanvpn-api-wrapper';

const client = new UrbanVPNClient();

async function main() {
    const locations = await client.staticProxies.getLocations();
    console.log(locations);
}

main();
```

## Documentation

Coming soon. Refer to the `examples/` directory for advanced usage.

## License

ISC
