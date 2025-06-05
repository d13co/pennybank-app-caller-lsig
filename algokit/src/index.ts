import * as algokit from "@algorandfoundation/algokit-utils";
import algosdk, {
  LogicSigAccount,
  makeLogicSigAccountTransactionSigner,
  OnApplicationComplete,
} from "algosdk";

const logicSig = Buffer.from(
  "BSYBCN2N1cmh+e8dMRCBBhIxIDIDEhAxGYEAEjEZgQESERA=",
  "base64"
);

const logicSigAccount = new LogicSigAccount(logicSig);

const signer = makeLogicSigAccountTransactionSigner(logicSigAccount);

const client = algokit.AlgorandClient.mainNet();

const sender = logicSigAccount.address().toString()

console.log({sender})

console.log(await client.send.appCall({
  appId: 987654321n,
  sender,
  signer,
  onComplete: OnApplicationComplete.OptInOC,
}));