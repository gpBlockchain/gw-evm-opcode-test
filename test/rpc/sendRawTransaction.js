const {ethers} = require("hardhat");
const {expect} = require("chai");
const {getGasPrice,getTxReceipt} = require("./utils/tx");


describe("sendRawTransaction ",  function () {

    let contract;
    let fallbackAndReceiveContract;

    before(async function () {
        fallbackAndReceiveContract = await ethers.getContractFactory("fallbackAndReceive");
    });

    describe("to", async function () {

        it("to is EOA Address =>  to_address can not be EOA address! ", async () => {
            let gasPrice = await getGasPrice(ethers.provider);
            console.log("gasPrice:",gasPrice)
            try {
                await ethers.provider.send("eth_sendTransaction", [{
                    "from": "0x0c1efcca2bcb65a532274f3ef24c044ef4ab6d73",
                    "to": "0x0c1efcca2bcb65a532274f3ef24c044ef4ab6d73",
                    "gas": "0x76c0",
                    "gasPrice": gasPrice,
                    "value": "0x9184e72a",
                    "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
                }]);
                expect("").to.be.equal("no")
            } catch (e) {
                expect(e.toString()).to.be.contains("to_address can not be EOA address!")
            }
        }).timeout(5000)

        it("to is not exist Address => to id not found by address ", async () => {
            let gasPrice = await getGasPrice(ethers.provider);

            try {
                await ethers.provider.send("eth_sendTransaction", [{
                    "from": "0x0c1efcca2bcb65a532274f3ef24c044ef4ab6d73",
                    "to": "0x0c1efcca2bcb65a532274f3ef24c044ef4ab6d71",
                    "gas": gasPrice,
                    "gasPrice": "0x9184e72a000",
                    "value": "0x9184e72a",
                    "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
                }]);
            } catch (e) {
                expect(e.toString()).to.be.contains("to id not found by address")
            }
        }).timeout(5000)

        it("to is  contract Address => invoke success ", async () => {
            let gasPrice = await getGasPrice(ethers.provider);

            contract = await fallbackAndReceiveContract.deploy();
            await contract.deployed();
            let tx = await ethers.provider.send("eth_sendTransaction", [{
                "from": "0x0c1efcca2bcb65a532274f3ef24c044ef4ab6d73",
                "to": contract.address,
                "gas": "0x76c0",
                "gasPrice": gasPrice,
                "value": "0x1",
            }]);
            let response = await getTxReceipt(ethers.provider, tx)
            console.log("response:", response)
            let balanceOfContract = await ethers.provider.getBalance(contract.address)
            expect(balanceOfContract).to.be.equal(1)
        }).timeout(100000)

        it("to is null => deploy tx", async () => {
            let gasPrice = await getGasPrice(ethers.provider);

            let tx = await ethers.provider.send("eth_sendTransaction", [{
                "from": "0x0c1efcca2bcb65a532274f3ef24c044ef4ab6d73",
                // "to": "0x",
                "gas": "0x76c000000",
                "gasPrice": gasPrice,
                // "value": "0x9184e72a",
                "data": fallbackAndReceiveContract.bytecode
            }]);
            let response = await getTxReceipt(ethers.provider, tx,5)
            console.log("response:", response)
            expect(response.to).to.be.equal(null)
            expect(response.contractAddress).to.be.contains("0x")
        }).timeout(50000)

        it("to is 0x0 =>  zero address 0x0000000000000000000000000000000000000000 has no valid account_id!", async () => {
            let gasPrice = await getGasPrice(ethers.provider);
            try {
                let tx = await ethers.provider.send("eth_sendTransaction", [{
                    "from": "0x0c1efcca2bcb65a532274f3ef24c044ef4ab6d73",
                    "to": "0x0000000000000000000000000000000000000000",
                    "gas": "0x76c000000",
                    "gasPrice": gasPrice,
                    // "value": "0x9184e72a",
                    "data": fallbackAndReceiveContract.bytecode
                }]);
                expect("").to.be.equal("no")
            } catch (e) {
                expect(e.toString()).to.be.contains("zero address 0x0000000000000000000000000000000000000000 has no valid account_id!")
            }

        }).timeout(50000)
    })

    describe("gasLimit", function () {

        it("gasLimit default => invoke succ", async () => {
            let gasPrice = await getGasPrice(ethers.provider);

            console.log("gasPrice:",gasPrice._hex)
            let tx = await ethers.provider.send("eth_sendTransaction", [{
                "from": "0x0c1efcca2bcb65a532274f3ef24c044ef4ab6d73",
                "gasPrice": "0x1",
                "data": fallbackAndReceiveContract.bytecode
            }]);
            let response = await getTxReceipt(ethers.provider, tx,5)
            console.log("tx:", tx)
            console.log("response:", response)
            expect(response.status).to.be.equal(1)
        }).timeout(50000)

        it("gasLimit 1 => out of gas", async () => {
            // let gasPrice = await getGasPrice(ethers.provider);
            console.log("begin")
            // console.log("gasPrice:",gasPrice._hex)
            try {
                let tx = await ethers.provider.send("eth_sendTransaction", [{
                    "from": "0x0c1efcca2bcb65a532274f3ef24c044ef4ab6d73",
                    "gas" : "0x1",
                    // "gasPrice": "0x1",
                    "data": fallbackAndReceiveContract.bytecode
                }]);
                expect("").to.be.contains("expected throw out of gas")

            }catch (e){
                expect(e.toString()).to.be.contains("gas")
            }
        }).timeout(50000)

    })

})