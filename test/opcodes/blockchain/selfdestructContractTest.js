const {ethers} = require("hardhat");
const {expect} = require("chai");

describe("selfdestructContractTest.js selfdestruct ", function () {


    let contract;

    before(async function () {
        const blockInfoContract = await ethers.getContractFactory("selfdestructContractTest");
        contract = await blockInfoContract.deploy();
        await contract.deployed();
    });

    it("deploy selfdestruct", async () => {

        let tx = await  contract.test_deploy();
        let receipt = await tx.wait();
        console.log("receipt:",receipt)
    })

    it("invoke selfdestruct", async () => {
        let tx = await  contract.test_destruct_transfer({value:1});
        let receipt = await tx.wait();
        console.log("receipt:",receipt)
    })
    //get_selfdestructContract_code

    it("invoke get code ", async () => {
        let code = await  contract.get_selfdestructContract_code(false,"0x5fbdb2315678afecb367f032d93f642f64180aa3");
        console.log("code:",code);
        expect(code.toString()).to.be.equal("0x608060405260405161024d38038061024d83398181016040528101906100259190610075565b8115610044578073ffffffffffffffffffffffffffffffffffffffff16ff5b5050610126565b60008151905061005a816100f8565b92915050565b60008151905061006f8161010f565b92915050565b6000806040838503121561008c5761008b6100f3565b5b600061009a85828601610060565b92505060206100ab8582860161004b565b9150509250929050565b60006100c0826100d3565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600080fd5b610101816100b5565b811461010c57600080fd5b50565b610118816100c7565b811461012357600080fd5b50565b610118806101356000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80632c6f504714602d575b600080fd5b60436004803603810190603f91906071565b6045565b005b8073ffffffffffffffffffffffffffffffffffffffff16ff5b600081359050606b8160ce565b92915050565b600060208284031215608457608360c9565b5b6000609084828501605e565b91505092915050565b600060a28260a9565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600080fd5b60d5816099565b811460df57600080fd5b5056fea2646970667358221220d7ab9a4825f214e7cb5429d1e9accf0f3349d6530aa5c4ec0b8aee43e32eb0f664736f6c6343000806003300000000000000000000000000000000000000000000000000000000000000000000000000000000000000005fbdb2315678afecb367f032d93f642f64180aa3");
    })



})