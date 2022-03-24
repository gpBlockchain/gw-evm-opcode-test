pragma solidity ^0.8.4;

contract Keccak256Contract {

    bytes32 public  hashResult;

    event KeccakEvent(uint256 idx,bytes data);
    function setKeccak256(bytes memory data) public returns(bytes32 result){
        hashResult = callKeccak256(data);
        emit KeccakEvent(1,data);
        return hashResult;
    }

    function callKeccak256(bytes memory data) public pure returns(bytes32 result){
        return keccak256(data);
    }

    function callKeccak2561(bytes memory data) public pure returns(bytes32 result){
        return keccak256(data);
    }

}