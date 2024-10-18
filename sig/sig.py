from pyteal import *

magic='1cd3170486ca218b' # APPCALL3RF2SBLZDILOTQ6GOBKHBCAWVAPQEZTOZHYBJMFHTNAAD46V4ME

def sig():
    return And(
        Txn.type_enum() == TxnType.ApplicationCall, # Only app calls
        Txn.application_id() != Int(0),             # No creating applications
        Txn.on_completion() == OnComplete.NoOp,     # No optins, update, delete, etc.
        Txn.rekey_to() == Global.zero_address(),    # No rekeying the lsig
        Txn.fee() == Int(0),                        # no fees - must be paid by others in group
        Bytes('') != Bytes('base16', magic)         # used for a vanity LSig address
    )

if __name__ == "__main__":
    print(compileTeal(sig(), mode=Mode.Signature, version=5))
