pragma solidity ^0.6.10;

contract CrossCallBugTest{

    CrossCall1 cc;
    CrossCall1 cc1;

    constructor () public {
        cc = new CrossCall1();
        cc1 = new CrossCall1();
        cc.setOtherAddress(address(cc1));
        cc1.setOtherAddress(address(cc));
    }

    function call_stack(uint stackSize) public returns(uint256){
        return cc.call_stack(stackSize-1)+stackSize;
    }

}

contract CrossCall1{

    address  otherAddress;

    function setOtherAddress(address addr) public {
        otherAddress = addr;
    }

    function call_stack(uint stackSize) public returns(uint256){
        CrossCall1 cc = CrossCall1(otherAddress);
        if(stackSize<=0){
            return 1;
        }
        try cc.call_stack(stackSize-1) returns(uint256 num){
            return num+stackSize;
        }catch {
            return cc.call_stack{gas:100000}(stackSize-1);
        }
    }

}