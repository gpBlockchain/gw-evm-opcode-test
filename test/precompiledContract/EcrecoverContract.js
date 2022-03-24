const {expect} = require("chai");
const {ethers, web3} = require("hardhat");


describe("keccak256 ", function () {

    let contract;

    ethers.provider.on('debug', (info) => {
        console.log("begin ------------------")
        console.log("action:", info.action);
        console.log("request", info.request);
        console.log("response:",info.response);
        console.log("end ------------------")
    });

    before(async function () {
        const blockInfoContract = await ethers.getContractFactory("EcrecoverContract");
        contract = await blockInfoContract.deploy();

        await contract.deployed();
    });

    it("keccak256 send tx  ", async () => {
        // let result = await contract.recoverSignerFromSignature(1,ethers.utils.arrayify("0x9ae57c859cfb70eaeef9458b9464448ade33fb97ab1af40fd03e65eb920bc4f7"),ethers.utils.arrayify("0x12070c857a569f82293c5c1dd23f8922d34b8041f7551bed18b3bc4411e55bd7"),ethers.utils.arrayify("0xdea1abf0bc607099e84fe5ee2cf63020192f82636aa982d22246685de6913151"));
        // console.log("result: ",result)
    })

});