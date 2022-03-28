pragma solidity ^0.8.4;

contract BugContract{


    function iss232Test() public view returns (bytes memory a, bytes memory b){
        return  add(33,4,32);
    }

    function add(uint256 b2, uint256 cc1, uint256 cc2) public view returns (bytes memory a, bytes memory b){
        assembly {
            a := mload(0x40)
            b := add(a, b2)
            codecopy(a, cc1, cc2)
        }
    }

}