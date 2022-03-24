const {ethers} = require("hardhat");
const {expect} = require("chai");

describe("assemblyContract.js opcode -assemblyContract ", function () {

    let contract;

    beforeEach(async function () {
        const blockInfoContract = await ethers.getContractFactory("assemblyContract");
        contract = await blockInfoContract.deploy();
        await contract.deployed();
    });

    it("opcode - assemblyContract", async () => {
        //    function addOpt(bytes memory a,uint256 b1) public returns(bytes memory b){
        try {
            let result = await contract.addOpt(ethers.utils.arrayify("0x2001"), 33)
        } catch (error) {
            expect(error.toString()).to.be.contains("out of gas")
        }
    }).timeout(10000000000);


})