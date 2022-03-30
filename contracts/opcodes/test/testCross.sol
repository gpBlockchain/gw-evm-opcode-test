pragma solidity ^0.8.4;
import "hardhat/console.sol";
contract A{

    function invokeA() public {
        console.log("a begin");
        console.logBytes4(msg.sig);
        console.log("a end");
        B b = new B();
        b.invokeB();
    }

}

contract B {
    function invokeB() public {
        console.log("b begin");
        console.logBytes4(msg.sig);
        console.log("b end");
         C c = new C();
        c.invokeC();
    }
}

contract C{
    function invokeC() public {
        console.log("c begin");
        console.logBytes4(msg.sig);
        console.log("c end");    }
}