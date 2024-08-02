import { readFileSync } from 'fs';
import algosdk from "algosdk";
import { getAddress, signTxn, } from "algo-appcaller-sdk";

const appId = Number(readFileSync('../sandbox/appid').toString());
const algod = new algosdk.Algodv2("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "http://localhost", "4001");

const mnem = "grass universe negative theme energy hill cattle field cabbage until aim oyster immune tuna figure approve cute episode liar desert rotate poem fragile above critic";

const { addr: owner, sk } = algosdk.mnemonicToSecretKey(mnem);

const lsigAddress = getAddress(algosdk);

console.log({owner, appId, lsigAddress});

const suggestedParams = await algod.getTransactionParams().do();

const txns = [];

txns.push(algosdk.makePaymentTxnWithSuggestedParamsFromObject({
  from: owner,
  to: owner,
  amount: 0,
  suggestedParams: {
    ...suggestedParams,
    flatFee: true,
    fee: 2000,
  },
}));

// LSig can call applications with onComplete=noop and zero fees
txns.push(algosdk.makeApplicationNoOpTxnFromObject({
  from: lsigAddress,
  appIndex: appId,
  suggestedParams: {
    ...suggestedParams,
    flatFee: true,
    fee: 0,
  }, 
  appArgs: [],
  foreignAssets: [],
}));

const gtxns = algosdk.assignGroupID(txns);

const signed = [
  txns[0].signTxn(sk),
  signTxn(algosdk, gtxns[1]).blob,
];

try {
  const { txId } = await algod.sendRawTransaction(signed).do();
  console.log('OK', txId);
} catch(e) {
  console.error(e);
}
