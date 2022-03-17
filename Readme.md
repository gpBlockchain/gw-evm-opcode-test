# How to test your Solidity contracts on Godwoken v1

You can deploy in the localhost network following these steps:

1. Start Godwoken devnet_v1 through [Godwoken-Kicker](https://github.com/RetricSu/godwoken-kicker/tree/compatibility-changes)

```sh
# see: https://github.com/RetricSu/godwoken-kicker/tree/compatibility-changes
git clone -b compatibility-changes --depth=1 https://github.com/RetricSu/godwoken-kicker.git kicker
cd kicker
make start
```


2. Run tests
```sh
# pwd = contracts
npm install
npm run test
```

As general rule, you can target any network configured in the hardhat.config.js
```sh
npx hardhat run --network <your-network> scripts/deploy.js
```

## Todo

### istanbul-opcodes
#### blockchain 
- SHA3
- ADDRESS
- BALANCE
- ORIGIN
- CALLER
- CALLVALUE
- CALLDATALOAD
- CALLDATASIZE
- CALLDATACOPY
- CODESIZE
- CODECOPY
- GASPRICE
- EXTCODESIZE
- EXTCODECOPY
- RETURNDATACOPY
- EXTCODEHASH
- BLOCKHASH
- COINBASE
- TIMESTAMP
- NUMBER
- DIFFICULTY
- GASLIMIT
- CHAINID
- SELFBALANCE
- SLOAD
- SSTORE
- GAS
- LOG0
- LOG1
- LOG2
- LOG3
- LOG4
- CREATE
- CALL
- CALLCODE
- DELEGATECALL
- CREATE2
- STATICCALL
- REVERT
- SELFDESTRUCT
#### other
...

### PrecompiledContract
- ecrecover()
- sha256hash()
- ripemd160hash()
- dataCopy
- bigModeExp()
- bn256Add()
- bn256ScalarMul()
- bn256Pairing()

### berlin-
- EIP-2565: ModExp Gas Cost
- EIP-2929: Gas cost increases for state access opcodes
- EIP-2718: Typed Transaction Envelope	
-  EIP-2930: Optional access lists