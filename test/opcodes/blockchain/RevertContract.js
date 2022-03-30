const {ethers} = require("hardhat");
const {expect} = require("chai");


describe("RevertContract.js opcode ", function () {


    let contract;


    // ethers.provider.on('debug', (info) => {
    //     console.log("begin ------------------")
    //     console.log("action:", info.action);
    //     console.log("request", info.request);
    //     console.log("response:",info.response);
    //     console.log("end ------------------")
    // });

    before(async function () {
        const blockInfoContract = await ethers.getContractFactory("RevertContract");
        contract = await blockInfoContract.deploy();
        await contract.deployed();
    });

    it("revert1View 1", async () => {
        try {
            await contract.revert1View();
            expect("").to.be.equal("failed")
        } catch (e) {
            // expect(e.toString()).to.be.contains("1234112341123411234112341123411234112")
        }
    })
    it("revert msg", async () => {
        let msg = "";
        for (let i = 0; i < 1000; i++) {
            msg = msg + "ssss"
        }
        try {
            await contract.revertMsg(msg);
            expect("").to.be.equal("failed")
        } catch (e) {
            // expect(e.toString()).to.be.contains("sssssssssssssssssssssssssssssssssssss")

        }

    })

})