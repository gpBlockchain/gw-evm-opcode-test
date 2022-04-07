const {ethers} = require("hardhat");

//: ethers.providers.JsonRpcProvider
async function getTxReceipt(provider,txHash,count){
    // ethers.providers.JsonRpcProvider
    let response
    for (let i = 0; i < count; i++) {
        response = await provider.getTransactionReceipt(txHash);
        console.log("getTxReceipt:",response)
        await new Promise(r => setTimeout(r, 2000));
        if (response == null){
            continue;
        }
        if (response.from !== "0x0000000000000000000000000000000000000000"){
            return response
        }
        if (!(response.failed_reason === undefined)){
            return response
        }
    }
    return response
}

async function getGasPrice(provider){
    let gasPrice = await provider.getGasPrice();
    if (gasPrice<16){
        return "0x"+gasPrice._hex.toLowerCase().replaceAll("0x0","");
    }
    return gasPrice;
}

module.exports = {
    getTxReceipt,
    getGasPrice
};
