const {expect} = require("chai");
const {ethers, web3} = require("hardhat");


describe("keccak256 ", function () {

    let contract;

    // ethers.provider.on('debug', (info) => {
    //     console.log("begin ------------------")
    //     console.log("action:", info.action);
    //     console.log("request", info.request);
    //     console.log("response:",info.response);
    //     console.log("end ------------------")
    // });

    beforeEach(async function () {
        const blockInfoContract = await ethers.getContractFactory("Keccak256Contract");
        contract = await blockInfoContract.deploy();
        // contract.getSigners();

        await contract.deployed();
    });

    // it("keccak256 send tx  ", async () => {
    //
    //     //35 eth_chainId
    //     //35 eth_estimateGas
    //     //35 eth_sendTransaction
    //     let tx = await contract.setKeccak256(ethers.utils.arrayify("0x1212"));
    //     // console.log("tx ")
    //     // eth_getTransactionByHash
    //     //eth_getTransactionReceipt
    //     let reuslt = await tx.wait();
    //     // console.log("result :",reuslt);
    // })
    it("keccak256 pure",async ()=>{
        //
        console.log("-------begin---------")
        //eth_call
        let result = await contract.callKeccak256(ethers.utils.arrayify("0x1212"));
        console.log(result);

    })



});