const {ethers} = require("hardhat");
const {expect} = require("chai");
//todo 考虑集成到ci
describe("create2_test.js ", function () {


    let contract;

    before(async function () {
        // console.log("------")
        const blockInfoContract = await ethers.getContractFactory("create2_test");
        contract = await blockInfoContract.deploy();
        await contract.deployed();
        console.log("contractAddress:", contract.address);
    });


    it("demo", async () => {
        let tx = await  contract.testCreate();
        let receipt = await tx.wait();
        expect(receipt.events[0].data).to.be.equal("0x0000000000000000000000000000000000000000000000000000000000000001");
    })

    //test_create2_destruct_creat2
    it("create2 invoke same contract in 1tx", async () => {
        let tx = await  contract.test_create2_deploy_2_same_contract();
        let receipt = await tx.wait();
        expect(receipt.events[2].args[1]).to.be.not.equal("0x0000000000000000000000000000000000000000")
        expect(receipt.events[4].args[1]).to.be.equal("0x0000000000000000000000000000000000000000")
    })

    it("create2 invoke same contract in diff tx ", async () => {
        let tx = await  contract.test_create2_destruct();
        let receipt = await tx.wait();
        console.log("----")
        expect(receipt.events[2].args[1].toString()).to.be.not.equal("0x0000000000000000000000000000000000000000")
        tx = await  contract.test_create2_destruct();
        receipt = await tx.wait();
        console.log("----")
        expect(receipt.events[2].args[1].toString()).to.be.not.equal("0x0000000000000000000000000000000000000000")
    })


    it("create2 selfdstruct in 1tx ", async () => {
        let tx = await  contract.test_create2_selfDestruct_create2();
        let receipt = await tx.wait();
    })

    it("create2 invoke same contract in diff tx  again", async () => {
        let tx = await  contract.test_create2_destruct();
        let receipt = await tx.wait();
    })


})
