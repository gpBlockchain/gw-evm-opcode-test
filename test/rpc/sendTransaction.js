const {ethers} = require("hardhat");
const {expect} = require("chai");
const {TransactionRequest} = require("@ethersproject/abstract-provider");
const getTxReceipt = require("./utils/tx");


describe("sendTransaction ", function () {

    it("not support", async () => {
            //todo wait
            let tx = await ethers.provider.send("eth_sendTransaction",[{
                "from": "0x0c1efcca2bcb65a532274f3ef24c044ef4ab6d73",
                "to": "0x0c1efcca2bcb65a532274f3ef24c044ef4ab6d73",
                "gas": "0x76c0",
                "gasPrice": "0x9184e72a000",
                "value": "0x9184e72a",
                "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
            }]);

            // expect("").to.be.contains("failed")
    }).timeout(100000)

});