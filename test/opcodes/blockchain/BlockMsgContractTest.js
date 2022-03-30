const {ethers} = require("hardhat");
const {expect} = require("chai");
//todo 考虑集成到ci
describe("BlockMsgContractTest.js opcode -blockchain -block ", function () {


    let contract;

    before(async function () {
        const blockInfoContract = await ethers.getContractFactory("BlockMsgContract");
        contract = await blockInfoContract.deploy();
        await contract.deployed();
        console.log("contractAddress:", contract.address);
    });

    it("block -blockMsgContract blockhash", async () => {

        let tx = await contract.getBlockHashEventTopre256()
        let receipt = await tx.wait()

        for (let i = 0; i < receipt.events.length; i++) {
            if (i < 2 || i >= 258) {
                expect(receipt.events[i].args[0]).to.be.equal("0x0000000000000000000000000000000000000000000000000000000000000000");
            } else {
                expect(receipt.events[i].args[0]).to.be.not.equal("0x0000000000000000000000000000000000000000000000000000000000000000");
            }
        }

    })

    it("block - view blockMsgContract blockhash", async () => {
        //todo  assert
        let receipt = await contract.getBlockHashEventTopre256View()
        let height = await ethers.provider.getBlockNumber()
        for (let i = 0; i < receipt.length; i++) {
            if (height + 1 - i < 0) {
                expect(receipt[i]).to.be.equal("0x0000000000000000000000000000000000000000000000000000000000000000");
                continue;
            }
            if (i < 2 || i >= 258) {
                expect(receipt[i]).to.be.equal("0x0000000000000000000000000000000000000000000000000000000000000000");
            } else {
                expect(receipt[i]).to.be.not.equal("0x0000000000000000000000000000000000000000000000000000000000000000");
            }
        }

    })


    it("block - BlockMsgContract 查询上一个区块", async () => {
        let tx = await contract.update_block_msg();
        // let chainId = await ethers.provider.getChainId();
        let receipt = await tx.wait();

        let chainId = await ethers.provider.send("eth_chainId", []);
        let curBlock = await ethers.provider.getBlock(receipt.blockNumber)
        let preBlock = await ethers.provider.getBlock(receipt.blockNumber - 1)

        let callBlockMsgData = await contract.call_block_msg(contract.address, receipt.blockNumber - 1, 40000000);
        expect(callBlockMsgData[0]).to.be.equal(preBlock.hash);
        expect(callBlockMsgData[1]).to.be.equal(chainId);
        // todo add assert code
        // expect(callBlockMsgData[2]).to.be.equal(curBlock.miner)
        expect(callBlockMsgData[3]).to.be.equal(curBlock.difficulty)
        // expect(callBlockMsgData[4]).to.be.equal(curBlock.gasLimit)
        expect(callBlockMsgData[5]).to.be.equal(curBlock.number)
        expect(callBlockMsgData[6]).to.be.equal(curBlock.timestamp)

        // (blockHash, chainid, coinbase, difficulty, gaslimit, number, timestamp)
        let latestBlockData = await contract.get_block_data();
        expect(latestBlockData[0]).to.be.equal(preBlock.hash);
        expect(latestBlockData[1]).to.be.equal(chainId);
        expect(latestBlockData[2]).to.be.equal(curBlock.miner)
        expect(latestBlockData[3]).to.be.equal(curBlock.difficulty)
        expect(latestBlockData[4]).to.be.equal(curBlock.gasLimit)
        expect(latestBlockData[5]).to.be.equal(curBlock.number)
        expect(latestBlockData[6]).to.be.equal(curBlock.timestamp)

    });

})