const {ethers} = require("hardhat");
const {expect} = require("chai");


//todo 考虑集成到ci
describe("CrossCallTest.js cross call ", function () {

    let crossContract

    before(async function () {
        const blockInfoContract = await ethers.getContractFactory("CrossCallTest");
        crossContract = await blockInfoContract.deploy();
        await crossContract.deployed();
        console.log("contractAddress:", crossContract.address);
    });

    describe("call", function () {

        it("call demo", async () => {
           let tx = await crossContract.call_1()
            let receipt = await tx.wait()
            console.log(receipt)
        })

        it("call out of gas", async () => {
            let tx =  await crossContract.call_out_of_gas()
            let receipt = await tx.wait()
            console.log(receipt)
        })

        it("call stack", async () => {
            console.log("--------------")
            let tx = await crossContract.call_stack(403)
            let receipt = await tx.wait();
            console.log("receipt:",receipt)

        }).timeout(10000000)

    })


    describe("delegatecall", function () {
        it("delegatecall demo", async () => {
            let tx = await crossContract.call_delegatecallFunc();
            let receipt = await tx.wait()
            console.log(receipt)
        })

    })

    describe("staticcall", function () {
        it("staticcall demo", async () => {
            let tx = await crossContract.call_staticcallFunc();
            let receipt = await tx.wait()
            console.log(receipt)
        })
    })

    describe("callcode", function () {

        it("callcode demo", async () => {

        })
    })
})