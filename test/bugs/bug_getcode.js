const {ethers} = require("hardhat");
const {expect} = require("chai");
const {sha256} = require("ethers/lib/utils");

//https://github.com/nervosnetwork/godwoken-polyjuice/pull/140

describe.only("blockhash_bug ", function () {
//Failed to get Contract Code


    let contract;


    before(async function () {

    });

    it("Failed to get Contract Code", async () => {
        let blockInfoContract = await ethers.getContractFactory("addressContract");
        contract = await blockInfoContract.deploy();//{value: 10n}
        await contract.deployed();
        console.log("contract address",contract.address)

        let result = await contract.opcodeWithAddress();
        console.log("result:", result[2])
        expect(result[2].length).to.be.equal(6884)
        let codeHash = sha256(result[2]);
        expect(codeHash).to.be.equal("0xb9c05bf3d440fefcf0c4d19c53bf6385b3b705a1d1c889b6fd023c779db5a3b7")
    })

});