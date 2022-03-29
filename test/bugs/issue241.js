const {ethers} = require("hardhat");
const {expect} = require("chai");
//https://github.com/nervosnetwork/godwoken-web3/issues/241

//todo 考虑集成到ci
describe.only("issue241.js cross call ", function () {

    let crossContract

    before(async function () {
        const blockInfoContract = await ethers.getContractFactory("CrossCallTest");
        crossContract = await blockInfoContract.deploy();
        console.log("deployTransaction tx hash:",crossContract.deployTransaction)
        await crossContract.deployed();
        console.log("contractAddress:", crossContract.address);
    });

    it("call  call_stack(2)", async () => {

        console.log("================")
        let tx = await crossContract.call_stack(2)
        let receipt = await tx.wait();
        console.log("receipt:", receipt)
    }).timeout(10000000)

    it("call  call_stack(3)", async () => {
        console.log("================")
        let tx = await crossContract.call_stack(3)
        let receipt = await tx.wait();
        console.log("receipt:", receipt)
    }).timeout(10000000)

    it("call  call_stack(5)", async () => {
        console.log("--------------")

        let tx = await crossContract.call_stack(5)
        let receipt = await tx.wait();
        console.log("receipt:", receipt)

    }).timeout(10000000)

    it("call  call_stack(100)", async () => {
        let tx = await crossContract.call_stack(100)
        let receipt = await tx.wait();
        console.log("receipt:", receipt)

    }).timeout(10000000)


})