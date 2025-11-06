# PENNYBANK Application Caller Logic Sig

LSig helper for extra application calls.

Use this to sign extra application calls (e.g. for references or opcode budget increase) without having the user sign explicitly, or to bootstrap application calls without a user account (in which case the contract must refund the caller its transaction fees.)

## Address

PENNYBANKIIHDKNMO24WTLXFSFKSNVE2IBXBKJ7G5XTAURHOQEJSBELX3I

## Restrictions

- txn type must be application
- on_complete must be noop or optin
- no rekey

## Fee repayment

Fee repayment to the logic sig is enforced by the protocol via MBR.

The logic sig is opted in to an application, which prevents draining it entirely.

When using the logic sig, you should assume that it will (eventally) be at exactly its MBR balance, with zero spendable microALGO.

However, within an application call*, the MBR can be soft-violated, as long as it is legal by the end of all inner transactions.

To use this with non-zero transaction fees, you must enforce repayment of the sender fees in your smart contract.

## Usage

### With zero fees

Use this logic sig to sign for resource- or opcode- padding application calls:

- 1. App call: Method: real_method(); Sender: User; Fee: 0.003
- 2. App call: Method: op_up(); Sender: PENNYBANK..; Fee: 0
- 2. App call: Method: op_up(); Sender: PENNYBANK..; Fee: 0

### With fees

You can compose atomic groups where this logic sig "boostraps" an app call and pays the outer group fees. Repayment to the logic sig could be e.g. from an inner transaction.

In this example, a fictional smart contract is used to seed a new account ABCDE.. with 0.1 ALGO:

- 1. App call: Method: seed_new_account(ABCDEF..); Sender: PENNYBANK..; Fee: 0.001
  - 1a. Inner Payment: 0.1 ALGO to ABCDEF..
  - 1b. Inner Payment: 0.001 ALGO to PENNYBANK..

Within the outer app call, the MBR of PENNYBANK.. is temporarily violated (MBR - 0.001) but by the end of it the contract has repayed the MBR deficit.

> Note: If this logic sig has spendable balance when you encounter it, you SHOULD NOT assume that this will remain the case. It is designed to operate at exactly MBR, and be used in groups that repay the fees spent into it.

## Structure

`js/` - example javascript client

`sdk/` - tiny typescript SDK

`sig/` - source code of logic sig

`sandbox/` - sandbox setup utils

`algokit/` - example usage with algokit
