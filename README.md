<p align="center">
  <a href="https://mem.tech">
    <img src="https://mem-home.vercel.app/icons/mem/mem-logo-v2.svg" height="180">
  </a>
  <h3 align="center"><code>@decentldotland/mem-kwil-ext</code></h3>
  <p align="center">Kwil Extension for the MEM protocol</p>
</p>

## Build Locally

```bash
git clone https://github.com/decentldotland/mem-kwil-ext.git

cd mem-sdk

npm install && npm run build

docker build -t mem_kwil .
```

## About

The `mem-kwil-ext` is a [Kwil Extension](https://docs.kwil.com/docs/extensions/quickstart/) designed to enable the utilization of [MEM serverless functions](https://mem.tech) within Kwil SQL databases. In its present iteration, this extension exclusively facilitates MEM [write operations](https://docs.mem.tech/mem-api/write-operations) from a Kwil DB.

It offers support for both MEM's mainnet and testnet RPCs, along with [MEM Named Functions resolution](https://github.com/decentldotland/mem-sdk/tree/main?tab=readme-ov-file#usage-guide). The primary method employed by the extension is `write()`, which accepts the MEM Input object in a stringified JSON format.

## Usage

In this Kuneiform database example, we import the `mem_kwil` extension as `mem`, then submit a `write` interaction to the [ans.mem](https://api.mem.tech/api/state/Tih8T1uESATJNzdwBIY3rpe25kWTzjw8uNiMRYe9I5M) MEM function. The extension method returns the MEM TXID in case the interaction succeeds.

```sql
database mem_kwil_test;

use mem_kwil {
    network: 'mainnet',
    function_id: 'ans.mem'
} as mem;

table reqs {
    txid text primary notnull
}

action writeMem() public {
    $txid = mem.write('{"function": "mint", "domain": "memkwilext"}');
    INSERT INTO reqs
    VALUES($txid);
}


``` 
## License
This repository is licensed under the [MIT License](./LICENSE)
