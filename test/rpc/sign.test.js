const {ethers} = require("hardhat");
const {expect} = require("chai");


describe("sign ", function () {

    it("not support", async () => {
        try {
            await ethers.provider.send("sign", ["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"]);
            expect("").to.be.contains("failed")
        } catch (e) {
            console.log(e)
            expect(e.toString()).to.be.contains("Method not found")
        }
    })

});