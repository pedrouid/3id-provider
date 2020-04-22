# 3id-provider [![npm version](https://badge.fury.io/js/3id-provider.svg)](https://badge.fury.io/js/3id-provider)

3ID Provider Library

## Example

```javascript
import ThreeIdProvider from '3id-provider';

const connection: IRpcConnection

const provider = new ThreeIdProvider(connection);

await provider.enable();
```
