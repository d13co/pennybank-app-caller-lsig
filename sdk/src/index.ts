import type { LogicSigAccount, Transaction } from 'algosdk';
import algosdk from 'algosdk';

export const logicSigStr = 'BSYBCN2N1cmh+e8dMRCBBhIxIDIDEhAxGYEAEjEZgQESERA=';

type Algosdk = typeof algosdk;

interface SignedTxn {
  txID: string;
  blob: Uint8Array;
}

function base64ToUint8Array(base64: string): Uint8Array {
  var binaryString = atob(base64);
  return new Uint8Array(binaryString.split("").map((l) => l.charCodeAt(0)));
}

function validateAlgosdk(obj: Algosdk): void {
  if (!(typeof obj === "object" && obj && obj.LogicSigAccount && obj.signLogicSigTransaction)) {
    throw new Error(`Expected algosdk parameter, instead found: ${obj}`);
  }
}

export function getLsig(algosdk: Algosdk): LogicSigAccount {
  validateAlgosdk(algosdk);
  const logicSigBytes = base64ToUint8Array(logicSigStr);
  return new algosdk.LogicSigAccount(logicSigBytes);
}

export function signTxn(algosdk: Algosdk, txn: Transaction): SignedTxn {
  validateAlgosdk(algosdk);
  return algosdk.signLogicSigTransaction(txn, getLsig(algosdk));
}

export function getAddress(algosdk: Algosdk): string {
  validateAlgosdk(algosdk);
  return getLsig(algosdk).lsig.address();
}
