require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");
// var initHre = require("./hardhat/hardhat").initHre;

const INFURA_PROJECT_ID = "719d739434254b88ac95d53e2b6ac997";
// eth_address: 0x0c1efcca2bcb65a532274f3ef24c044ef4ab6d73
const PRIVATE_KEY = "dd50cac37ec6dd12539a968c1a2cbedda75bd8724f7bcad486548eaabb87fc8b";
// eth_address: 0x6DaF63D8411D6E23552658E3cFb48416A6A2CA78
const PRIVATE_KEY2 = "6cd5e7be2f6504aa5ae7c0c04178d8f47b7cfc63b71d95d9e6282f5b090431bf"

/**
 * @type import('hardhat/config').HardhatUserConfig
 *
 * */
module.exports = {
    networks: {

        hardhat: {
            loggingEnabled: false,
            allowUnlimitedContractSize: true,
        },
        bsc_test: {
            url: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
            accounts: [`0x${PRIVATE_KEY}`, `0x${PRIVATE_KEY2}`],
        },
        gw_local_kit_net_v1: {
            url: `http://127.0.0.1:8024`,
            accounts: [`0x${PRIVATE_KEY}`, `0x${PRIVATE_KEY2}`],
        },
        gw_testnet_v1: {
            url: `https://godwoken-testnet-web3-v1-rpc.ckbapp.dev`,
            accounts: [`0x${PRIVATE_KEY}`, `0x${PRIVATE_KEY2}`],
        },
        gw_testnet_v0: {
            url: `https://godwoken-testnet-web3-rpc.ckbapp.dev`,
            chainId: 71393,
            accounts: [`0x${PRIVATE_KEY}`, `0x${PRIVATE_KEY2}`],
        },
        rinkeby: {
            url: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
            accounts: [`0x${PRIVATE_KEY}`],
            // gas: 1_000_000_000_000_001, // Infura seems to cap it at 19981536.
            // gasPrice: 1
        },
        mainnet: {
            url: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
            accounts: [`0x${PRIVATE_KEY}`]
        },
        kovan: {
            url: `https://kovan.infura.io/v3/${INFURA_PROJECT_ID}`,
            accounts: [`0x${PRIVATE_KEY}`]
        },
        // hardhat: {
        //   gas: 1000000000000, // Infura seems to cap it at 19981536.
        //   gasPrice: 1
        // }
    },
    defaultNetwork: "gw_testnet_v1",
    solidity: {
        compilers: [
            { // for polyjuice contracts
                version: "0.6.6",
                settings: {}
            },
            {version: "0.4.24"},
            {version: "0.5.14"},
            {version: "0.6.12"},
            {version: "0.7.5"},
            {version: "0.8.4"},
            {version: "0.8.6"}

        ], overrides: {}
    },
    mocha: {
        /** Reporter name or constructor. */
        reporter: "json",
        timeout: 5000000,
        /** Reporter settings object. */
        reporterOptions: {
            output: "test-results.json"
        },

    }
};
extendEnvironment((hre) => {
    const Web3 = require('web3');
    // const HttpProxyAgent = require('http-proxy-agent');
    // console.log('-----web3--init-----');
    // hre.network.provider is an EIP1193-compatible provider.
    // hre.web3 = new Web3(hre.network.networks);
    // this.web3Provider.httpAgent = new HttpProxyAgent(process.env.HTTP_PROXY)
    // hre.web3.currentProvider.agent = new HttpProxyAgent('http://localhost:5555');
    // hre.web3.eth.subscribe('logs', options [, callback]);
    // hre.web3 = new Web3(hre.network.networks);
    // console.log(hre.web3);
    // console.log()
    // console.log('-----web3--end-----');
    // initHre(hre);
    hre.ethers.provider.on('debug', (info) => {
        console.log("begin ------------------")
        console.log("action:", info.action);
        console.log("request", info.request);
        console.log("response:", info.response);
        console.log("end ------------------")
    });
});