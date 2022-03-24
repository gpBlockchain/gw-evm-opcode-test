pragma solidity ^0.8.6;

contract assemblyContract{


    function addOpt(bytes memory a,uint256 b1) public view returns(bytes memory b){
        assembly {
            b := add(a, b1)
        }
    }



}