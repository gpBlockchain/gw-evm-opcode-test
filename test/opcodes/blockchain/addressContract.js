const {ethers} = require("hardhat");
const {expect} = require("chai");

describe("addressContract.js opcode -address(address(this),address(this).balance,address(this).code,address(this).code.length,address(this).codehash) ", function () {


    let contract;
    let contract2;
    let blockInfoContract;

    before(async function () {
        blockInfoContract = await ethers.getContractFactory("addressContract");
        contract = await blockInfoContract.deploy({value: 10000n});
        await contract.deployed();
        contract2 = await blockInfoContract.deploy({value: 101n});
        await contract2.deployed();

    });

    it("opcode - (query log for deploy)", async () => {
        let result = await contract2.deployTransaction.wait();
        expect(result.events[0].args.msg.latestBalance).to.be.equal(101n)
        expect(result.events[0].args.msg.latestAddress).to.be.equal(contract2.address)
        expect(result.events[0].args.msg.latestCode).to.be.equal("0x")
        expect(result.events[0].args.msg.latestCodeLength).to.be.equal(0n)
        expect(result.events[0].args[1].latestCodeHash).to.be.equal("0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470");
    });
    //
    it("opcode query(opcodeWithAddress) ", async () => {
        let result = await contract.opcodeWithAddress();
        let code = await ethers.provider.getCode(contract.address)
        expect(result[0]).to.be.equal(contract.address)
        expect(result[1]).to.be.equal(10000n)
        expect(result[2]).to.be.equal(code)
        expect(result[4]).to.be.equal("0xc5a94d21b524783a20d29f69f58fb1e79791dd9145c027947fdb87fbb1e25826");

    })
    it("opcode -  (ADDRESS,CODESIZE,EXTCODESIZE,SELFBALANCE) query on deploy", async () => {
        let tx = await contract.setAddressMsg();
        let result = await tx.wait();
        expect(result.events[0].args[1].latestBalance).to.be.equal(10000n)
        expect(result.events[0].args[1].latestAddress).to.be.equal(contract.address)
        expect(result.events[0].args[1].latestCode).to.not.be.contains("00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000");
        expect(result.events[0].args[1].latestCodeLength).to.be.equal(3441n)
        expect(result.events[0].args[1].latestCodeHash).to.be.equal("0xc5a94d21b524783a20d29f69f58fb1e79791dd9145c027947fdb87fbb1e25826")

    });

    it("getOtherAddress - ", async () => {
        let result = await contract.getOtherAddress("0x7D360edE258e475c0737FB169f40Ed85dfaf8Fb5");
        expect(result[0]).to.be.equal("0x7D360edE258e475c0737FB169f40Ed85dfaf8Fb5")
        expect(result[1]).to.be.equal(0n)
        expect(result[2]).to.be.equal("0x")
        expect(result[3]).to.be.equal(0n)
        expect(result[4]).to.be.equal("0x0000000000000000000000000000000000000000000000000000000000000000")

    })


})