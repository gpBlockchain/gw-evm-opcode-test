const { expect } = require("chai");
const { ethers, web3 } = require("hardhat");


describe("keccak256 ", function () {

    let contract;

    beforeEach(async function () {
        const blockInfoContract = await ethers.getContractFactory("EcrecoverContract");
        contract = await blockInfoContract.deploy();
        await contract.deployed();
    });

    it("keccak256 demo ", async () => {
        // check if chain id from web3 is same as chainId opcode
        let reuslt = await contract.callKeccak256();
        console.log("result :",reuslt);
        expect(reuslt.toString()).to.be.equal("0xe1629b9dda060bb30c7908346f6af189c16773fa148d3366701fbaa35d54f3c8")
    })


});