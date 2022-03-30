const {ethers} = require("hardhat");
const {expect} = require("chai");


describe("blockhash_bug ", function () {


    let contract;

    before(async function () {
        const blockInfoContract = await ethers.getContractFactory("BlockMsgContract");
        contract = await blockInfoContract.deploy();
        await contract.deployed();
        console.log("contractAddress:", contract.address);
    });

    it("blockhash", async () => {
        let receipt = await contract.getBlockHashEventTopre256View()
        let height = await ethers.provider.getBlockNumber()
        for (let i = 0; i < receipt.length; i++) {
            if (height + 1 - i < 0) {
                //节点区块hash不够
                expect(receipt[i]).to.be.equal("0x0000000000000000000000000000000000000000000000000000000000000000");
                continue;
            }
            if (i < 2 || i >= 258) {
                //之前256个区块的hash不为0
                expect(receipt[i]).to.be.equal("0x0000000000000000000000000000000000000000000000000000000000000000");
            } else {
                // 当前区块hash和未来区块hash为0x0
                // 256之后的区块hash返回0x0
                expect(receipt[i]).to.be.not.equal("0x0000000000000000000000000000000000000000000000000000000000000000");
            }
        }
    })


});