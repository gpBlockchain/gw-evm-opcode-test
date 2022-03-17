pragma solidity ^0.8.4;

contract EcrecoverContract {

    function recoverSignerFromSignature(uint8 v, bytes32 r, bytes32 s, bytes32 hash) external returns(address){
        address signer = ecrecover(hash, v, r, s);
        require(signer != address(0), "ECDSA: invalid signature");
        return signer;
    }

    function callKeccak256() public pure returns(bytes32 result){
        return keccak256("ABC");
    }

}