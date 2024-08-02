from pyteal import *

magic='d13b4d016f7225e3' # NULLCALLNLN64MIYDOS53BNRJGIHFLGXUYZXYBFYDY2GWUGG5H4VQ24Y4Y
# magic='d13d13d13d13d13d'

def sig():
    return And(
        Txn.type_enum() == TxnType.ApplicationCall,
        Txn.rekey_to() == Global.zero_address(),
        Txn.fee() == Int(0),
        Txn.on_completion() == OnComplete.NoOp,
        Bytes('') != Bytes('base16', magic)
    )

if __name__ == "__main__":
    print(compileTeal(sig(), mode=Mode.Signature, version=5))
