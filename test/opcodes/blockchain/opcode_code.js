//opcode_code

const {ethers} = require("hardhat");
const {expect} = require("chai");
describe("opcode_code.js opcode -code ", function () {


    let contract;

    beforeEach(async function () {
        //0x881cAAcD809386af1a8dDD58fb8d4cE6A0c08771
        const blockInfoContract = await ethers.getContractFactory("opcode_code");
        contract = await blockInfoContract.deploy();
        await contract.deployed();
        console.log("contractAddress:", contract.address);
    });

    it("code ", async () => {
        let result = await contract.ass(33,4,32);
        expect(result[1].length).to.be.equal(81922)
        expect(result[0].length).to.be.equal(130)
    }).timeout(10000000000);

    it("code store", async () => {
        try {
            let tx = await contract.storeData(33,4,32);
            await tx.wait();
        }catch (error) {
            expect(error.toString()).to.be.contains("out of gas")
        }
        let ab = await  contract.getAB();
        expect(ab[0]).to.be.equal("0x")
        expect(ab[1]).to.be.equal("0x")
    }).timeout(10000000000);

})

