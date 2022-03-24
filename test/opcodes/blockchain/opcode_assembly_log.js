const {ethers} = require("hardhat");
const {expect} = require("chai");

describe("opcode -block ", function () {


    let contract;

    beforeEach(async function () {
        const blockInfoContract = await ethers.getContractFactory("opcode_assembly_log");
        contract = await blockInfoContract.deploy();
        await contract.deployed();

    });

    it("opcode - logs", async () => {
        let tx = await contract.log1234();
        let receipt = await tx.wait();
        expect(receipt.events[0].data).to.be.equal("0x50cb9fe53daa9737b786ab3646f04d0150dc50ef4e75f59509d83667ad5adb20");
        expect(receipt.events[1].data).to.be.equal("0x50cb9fe53daa9737b786ab3646f04d0150dc50ef4e75f59509d83667ad5adb20");
        expect(receipt.events[1].topics[0]).to.be.equal("0x50cb9fe53daa9737b786ab3646f04d0150dc50ef4e75f59509d83667ad5adb20");
        expect(receipt.events[2].data).to.be.equal("0x50cb9fe53daa9737b786ab3646f04d0150dc50ef4e75f59509d83667ad5adb20");
        expect(receipt.events[2].topics[0]).to.be.equal("0x50cb9fe53daa9737b786ab3646f04d0150dc50ef4e75f59509d83667ad5adb20");
        expect(receipt.events[2].topics[1]).to.be.contains(contract.signer.address.substring(2).toLowerCase());
        expect(receipt.events[3].topics[0]).to.be.equal("0x50cb9fe53daa9737b786ab3646f04d0150dc50ef4e75f59509d83667ad5adb20");
        expect(receipt.events[3].topics[1]).to.be.contains(contract.signer.address.substring(2).toLowerCase());
        expect(receipt.events[3].topics[2]).to.be.equal("0x0000000000000000000000000000000000000000000000000000000000420042");
        expect(receipt.events[3].data).to.be.equal("0x50cb9fe53daa9737b786ab3646f04d0150dc50ef4e75f59509d83667ad5adb20");

        expect(receipt.events[4].data).to.be.equal("0x50cb9fe53daa9737b786ab3646f04d0150dc50ef4e75f59509d83667ad5adb20");
        expect(receipt.events[4].topics[0]).to.be.equal("0x50cb9fe53daa9737b786ab3646f04d0150dc50ef4e75f59509d83667ad5adb20");
        expect(receipt.events[4].topics[1]).to.be.contains(contract.signer.address.substring(2).toLowerCase());
        expect(receipt.events[4].topics[2]).to.be.equal("0x0000000000000000000000000000000000000000000000000000000000420042");
        expect(receipt.events[4].topics[3]).to.be.equal("0x0000000000000000000000000000000000000000000000000000000000420042");
        expect(receipt.events[4].data).to.be.equal("0x50cb9fe53daa9737b786ab3646f04d0150dc50ef4e75f59509d83667ad5adb20");

    }).timeout(10000000000);


})