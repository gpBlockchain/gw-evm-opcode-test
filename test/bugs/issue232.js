//https://github.com/nervosnetwork/godwoken-web3/issues/232
const {expect} = require("chai");
const {ethers} = require("hardhat");
describe.only("issue232.js", function () {


    let contract;

    before(async function () {
        const blockInfoContract = await ethers.getContractFactory("BugContract");
        contract = await blockInfoContract.deploy();
        await contract.deployed();
        console.log("contractAddress:", contract.address);
    });

    it.only("issue232", async () => {
        let result  = await contract.iss232Test();
        console.log("invoke add(33,4,32)")
        console.log("result",result)
        console.log("a:",result[0])
        console.log("b:",result[1])
        expect(result[0].length).to.be.equal(130)
        expect(result[1].length).to.be.equal(81922)
    })
})