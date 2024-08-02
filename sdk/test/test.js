import algosdk from 'algosdk';
import { signTxn, getLsig, getAddress, } from '../dist/index.js';
import { expect } from 'expect';

const expectedAddress = "NULLCALLNLN64MIYDOS53BNRJGIHFLGXUYZXYBFYDY2GWUGG5H4VQ24Y4Y";

const suggestedParams = {
  "consensusVersion": "https://github.com/algorandfoundation/specs/tree/925a46433742afb0b51bb939354bd907fa88bf95",
  "flatFee": true,
  "fee": 0,
  "genesisHash": "yxPziGgJufdsbOwSJYlWFjZpS7KUE22L28kyxb9j2oM=",
  "genesisId": "dockernet-v1",
  "firstRound": 1,
  "lastRound": 26,
  "minFee": 1000
};

describe('app-caller', () => {
  it('getAddress', () => {
    const address = getAddress(algosdk);
    expect(address).toBe(expectedAddress);
  });

  it('getAddress error: no argument', () => {
    expect(() => getAddress()).toThrow("Expected algosdk parameter");
  });

  it('getAddress error: invalid argument', () => {
    expect(() => getAddress('aa')).toThrow("Expected algosdk parameter");
  });

  it('signTxn', () => {
    const txn = algosdk.makeApplicationNoOpTxnFromObject({
      from: getAddress(algosdk),
      appIndex: 1,
      suggestedParams,
    });
    const signed = signTxn(algosdk, txn);
    expect(signed.txID).toBe('Q47HTYL64KS6HWELDMF4KAH36LP5E4GAC34XDU275KFFDLTZD2ZA');
    expect(signed.blob).toBeInstanceOf(Uint8Array);
  });

  it('signTxn error: invalid argunent', () => {
    const txn = algosdk.makeApplicationNoOpTxnFromObject({
      from: getAddress(algosdk),
      appIndex: 1,
      suggestedParams,
    });
    expect(() => signTxn(txn)).toThrow("Expected algosdk parameter");
  });

  it('getLsig', () => {
    const lsig = getLsig(algosdk);
    expect(lsig).toBeInstanceOf(algosdk.LogicSigAccount);
    expect(lsig.lsig.address()).toBe(expectedAddress);
  });

  it('getLsig error: no argunent', () => {
    expect(() => getLsig()).toThrow("Expected algosdk parameter");
  });

  it('getLsig error: invalid argunent', () => {
    expect(() => getLsig({})).toThrow("Expected algosdk parameter");
  });
});
