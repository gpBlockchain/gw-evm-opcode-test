const {ethers} = require("hardhat");
const {expect} = require("chai");


describe("opcodeTxWithMsg.js opcode -tx msg ", function () {

    let contractWithValue;
    let contract2NoValue;
    before(async function () {
        const blockInfoContract = await ethers.getContractFactory("opcodeTxWithMsg");
        contractWithValue = await blockInfoContract.deploy({value: 10n});
        const blockInfoContract2 = await ethers.getContractFactory("opcodeTxWithMsg");
        contract2NoValue = await blockInfoContract2.deploy();
        await contractWithValue.deployed();
        await contract2NoValue.deployed();

    });


    it("construct  - (msg.data,msg.sig,msg.value,msg.sender),(tx.gasprice,tx.origin)", async () => {
        await compareDeployTxMsgAndTxResult(contractWithValue);
        await compareDeployTxMsgAndTxResult(contract2NoValue);

    })

    async function compareDeployTxMsgAndTxResult(contract) {
        let reipt = await contract2NoValue.deployTransaction.wait();
        let msgData = await contract.msgData();
        let txData = await contract.txData();
        expect(reipt.events[0].args[1].msgData).to.be.equal(msgData.msgData);
        expect(msgData.msgData).to.be.equal("0x");
        expect(msgData.msgSig).to.be.equal("0x00000000");
        expect(msgData.msgValue).to.be.equal(contract.deployTransaction.value);
        expect(msgData.msgSender).to.be.equal(contract.signer.address);
        expect(txData.txOrigin).to.be.equal(contract.signer.address);
        expect(txData.txGasPrice).to.be.equal(contract.deployTransaction.gasPrice);
    }


    it("invoke  - (msg.data,msg.sig,msg.value,msg.sender), (tx.gasprice,tx.origin)", async () => {
        let tx = await contractWithValue.updateMsgAndTxData();
        await compareCallTxMsgAndTxResut(contractWithValue, tx);
    })

    async function compareCallTxMsgAndTxResut(contract, tx) {
        let reipt = await tx.wait();
        let msgData = await contract.msgData();
        let txData = await contract.txData();
        expect(reipt.events[0].args[1].msgData).to.be.equal(msgData.msgData);
        expect(msgData.msgData).to.be.equal(tx.data);
        expect(msgData.msgSig).to.be.equal(tx.data.substring(0, 10));
        expect(msgData.msgValue).to.be.equal(tx.value);
        expect(msgData.msgSender).to.be.equal(contract.signer.address);
        expect(txData.txOrigin).to.be.equal(contract.signer.address);
        expect(txData.txGasPrice).to.be.equal(tx.gasPrice);
    }

    it("cross call - (msg.data,msg.sig,msg.value,msg.sender), (tx.gasprice,tx.origin)", async () => {
        let tx = await contractWithValue.call_updateMsgAndTxData(contract2NoValue.address)
        await compareCrossCallTxMsgAndTxResut(contract2NoValue, tx)
    })

    async function compareCrossCallTxMsgAndTxResut(contract, tx) {
        let reipt = await tx.wait();
        let msgData = await contract.msgData();
        let txData = await contract.txData();
        expect(reipt.events[0].args[1].msgData).to.be.equal(msgData.msgData);
        expect(msgData.msgData).to.be.equal("0xd46a58c5");
        expect(msgData.msgSig).to.be.equal("0xd46a58c5");
        expect(msgData.msgValue).to.be.equal(tx.value);
        expect(msgData.msgSender).to.be.equal(contractWithValue.address);
        expect(txData.txOrigin).to.be.equal(contract.signer.address);
        expect(txData.txGasPrice).to.be.equal(tx.gasPrice);
    }
})