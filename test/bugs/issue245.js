const {ethers} = require("hardhat");
const {expect} = require("chai");

describe.only("create2_test.js ", function () {
//https://github.com/nervosnetwork/godwoken-web3/issues/245

    let contract;

    before(async function () {
        // console.log("------")
        //gw-evm-opcode-test/contracts/opcodes/blockchain/opcode_create2.sol
        const blockInfoContract = await ethers.getContractFactory("create2_test");
        contract = await blockInfoContract.deploy();
        await contract.deployed();
        console.log("contractAddress:", contract.address);
    });

    it("issue245 2times(create2 selfdestruct )", async () => {
        let tx = await  contract.test_create2_destruct();
        let receipt = await tx.wait();
        console.log("----")
        expect(receipt.events[2].args[1].toString()).to.be.not.equal("0x0000000000000000000000000000000000000000")
        tx = await  contract.test_create2_destruct();
        receipt = await tx.wait();
        console.log("----")
        expect(receipt.events[2].args[1].toString()).to.be.not.equal("0x0000000000000000000000000000000000000000")
    })




})
