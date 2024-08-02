from pyteal import *

magic='d13b010003a541d0' # CALL4PPDRTSRRZXHBMYTPVIS4RQPRXBD3WX4FD7KJKAZIIPV2LPJM5RL2M
magic='d131f90068477b8c' # CALLAPPSQPJYM5W433SPVSISNV5R5TJIS2IVYVRWJV25IF5PNRI3CJNBN4
# magic='d13d13d13d13d13d'

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
