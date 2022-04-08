const { ethers } = require("hardhat");
const { expect } = require("chai");


describe("getLogs ", function () {

    it("get Logs", async () => {

        let result = await ethers.provider.send("eth_getLogs", [{
            "topics": [
                "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"
            ]
        }]);
        console.log("result", result);
        expect(result).to.be.instanceof(Array);
    })

});
