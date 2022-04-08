const { ethers } = require("hardhat");
const { expect } = require("chai");


describe("uninstallFilter", function () {
    let variable; 

    it("newPendingTransactionFilter", async () => {

        let result = await ethers.provider.send("eth_newPendingTransactionFilter",[]);
        variable = result;
    })

    it("uninstallFilter", async () => {

        let result = await ethers.provider.send("eth_uninstallFilter",[variable]);
        expect(result).to.be.true;
    })

});