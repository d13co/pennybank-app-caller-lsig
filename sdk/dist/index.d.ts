import type { LogicSigAccount, Transaction } from 'algosdk';
import algosdk from 'algosdk';
export declare const logicSigStr = "BSABADEQgQYSMRgiExAxGSISEDEgMgMSEDEBIhIQgACACBzTFwSGyiGLExBD";
type Algosdk = typeof algosdk;
interface SignedTxn {
    txID: string;
    blob: Uint8Array;
}
export declare function getLsig(algosdk: Algosdk): LogicSigAccount;
export declare function signTxn(algosdk: Algosdk, txn: Transaction): SignedTxn;
export declare function getAddress(algosdk: Algosdk): string;
export {};
