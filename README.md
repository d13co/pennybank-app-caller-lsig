# APP-Caller LSig

LSig helper for extra application calls.

Use this to sign extra application calls for references or opcode budget without having the user sign explicitly.

## Restrictions

- txn type must be application
- fee must be zero
- on_complete must be noop
- no rekey

## Address

CALLAPPSQPJYM5W433SPVSISNV5R5TJIS2IVYVRWJV25IF5PNRI3CJNBN4

## Structure

`js/` - example javascript client

`sdk/` - tiny typescript SDK

`sig/` - source code of logic sig

`sandbox` - sandbox setup utils
