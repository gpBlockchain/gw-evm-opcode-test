const {ethers} = require("hardhat");
const {expect} = require("chai");
//https://github.com/nervosnetwork/godwoken-web3/issues/242


describe.only("CrossCallTest.js cross call ", function () {
    let crossContract

    before(async function () {
    });

    it.only("deploy contract failed ", async () => {
        const blockInfoContract = await ethers.getContractFactory("CrossCallBugTest");
        crossContract = await blockInfoContract.deploy();
        console.log("deployTransaction tx hash:",crossContract.deployTransaction)
        await crossContract.deployed();
        console.log("contractAddress:", crossContract.address);
    })

    // it("call stack call_stack(5)", async () => {
    //     console.log("--------------")
    //     try {
    //         let tx = await crossContract.call_stack(5)
    //         let receipt = await tx.wait();
    //         console.log("receipt:", receipt)
    //     }catch (e) {
    //         console.log(e)
    //     }
    // }).timeout(10000000)
    //
    // it("call stack call_stack(100)", async () => {
    //     console.log("--------------")
    //     try {
    //         let tx = await crossContract.call_stack(100)
    //         let receipt = await tx.wait();
    //         console.log("receipt:", receipt)
    //     }catch (e) {
    //         console.log(e)
    //     }
    //
    // }).timeout(10000000)


})