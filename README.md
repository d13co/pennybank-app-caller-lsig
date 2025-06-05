# APP-Caller LSig

LSig helper for extra application calls.

Use this to sign extra application calls for references or opcode budget without having the user sign explicitly.

## Restrictions

- txn type must be application
- fee must be zero
- on_complete must be noop or optin
- no rekey

## Address

PENNYBANKIIHDKNMO24WTLXFSFKSNVE2IBXBKJ7G5XTAURHOQEJSBELX3I

## Structure

`js/` - example javascript client

`sdk/` - tiny typescript SDK

`sig/` - source code of logic sig

`sandbox` - sandbox setup utils
