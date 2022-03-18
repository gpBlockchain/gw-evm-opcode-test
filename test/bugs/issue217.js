const {ethers} = require("hardhat");


describe.only("issue217 ", function () {

    let contract;
    let blockInfoContract;
    beforeEach(async function () {
        blockInfoContract = await ethers.getContractFactory("EcrecoverContract");
        contract = await blockInfoContract.deploy();
        await contract.deployed();
    });

    it("send tx until gw-web3-indexer exitd(1) ", async () => {

        ethers.provider.on('debug', (info) => {
            console.log("begin ------------------")
            console.log("action:",info.action);
            console.log("request",info.request);
            console.log("response",info.response);
            console.log("end ------------------")
        });

        for (let i = 0; i < 1000000; i++) {
            console.log("cur:",i)
            try {
                let callKeccak256Result = contract.callKeccak256();
                await contract.callKeccak2562();
                console.log("callKeccak256Result:", callKeccak256Result)
            }catch (error) {
                console.error(error);
            }
        }
    }).timeout(10000000000);


});