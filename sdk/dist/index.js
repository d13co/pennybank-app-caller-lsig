export const logicSigStr = 'BSABADEQgQYSMSAyAxIQMQEiEhAxGSISEIAAgAjRO00Bb3Il4xMQQw==';
function base64ToUint8Array(base64) {
    var binaryString = atob(base64);
    return new Uint8Array(binaryString.split("").map((l) => l.charCodeAt(0)));
}
function validateAlgosdk(obj) {
    if (!(typeof obj === "object" && obj && obj.LogicSigAccount && obj.signLogicSigTransaction)) {
        throw new Error(`Expected algosdk parameter, instead found: ${obj}`);
    }
}
export function getLsig(algosdk) {
    validateAlgosdk(algosdk);
    const logicSigBytes = base64ToUint8Array(logicSigStr);
    return new algosdk.LogicSigAccount(logicSigBytes);
}
export function signTxn(algosdk, txn) {
    validateAlgosdk(algosdk);
    return algosdk.signLogicSigTransaction(txn, getLsig(algosdk));
}
export function getAddress(algosdk) {
    validateAlgosdk(algosdk);
    return getLsig(algosdk).lsig.address();
}
