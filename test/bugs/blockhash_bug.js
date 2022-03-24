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

        //todo  assert
        let receipt  =await contract.getBlockHashEventTopre256View()
        let height = await  ethers.provider.getBlockNumber()
        for (let i = 0; i < receipt.length; i++) {
            if (height+1-i<0){
                expect(receipt[i]).to.be.equal("0x0000000000000000000000000000000000000000000000000000000000000000");
                continue;
            }
            if (i<2 || i>=258 ){
                expect(receipt[i]).to.be.equal("0x0000000000000000000000000000000000000000000000000000000000000000");
            }else {
                expect(receipt[i]).to.be.not.equal("0x0000000000000000000000000000000000000000000000000000000000000000");
            }
        }

    })


});