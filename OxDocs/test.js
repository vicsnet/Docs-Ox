async function main(){
        // const axios = require('axios');
        const qs = require('qs');
        require('dotenv').config();
        const { ETH_NODE_URL, PRIVATE_KEY } = process.env;
        const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
        const web3 = createAlchemyWeb3(ETH_NODE_URL);
        const ABI = require('./polySwap.json');
        // const tokenABI=require('./tokenABI.json');
    
        const buyToken= '0x79C950C7446B234a6Ad53B908fBF342b01c4d446';
        const sellToken= '0x3587b2F7E0E2D6166d6C14230e7Fe160252B0ba4';
        const sellAmount= "10000000000000050045";
        const takerAddress= '0x8DCeC3aF87Efc4B258f2BCAEB116D36B9ca012ee';
        
    const instaAccountAddress = '0x60EB1fF0aD4D4D829D375A900e83428F6d77027c';
        const ZERO_EX_ADDRESS = '0xf91bb752490473b8342a3e964e855b9f9a2a668e';

        const by = "0x415565b00000000000000000000000003587b2f7e0e2d6166d6c14230e7fe160252b0ba400000000000000000000000079c950c7446b234a6ad53b908fbf342b01c4d4460000000000000000000000000000000000000000000000008ac7230489e8c37d000000000000000000000000000000000000000000000000000000082d6e0ed100000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000003e0000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000340000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003587b2f7e0e2d6166d6c14230e7fe160252b0ba400000000000000000000000079c950c7446b234a6ad53b908fbf342b01c4d44600000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000002c00000000000000000000000000000000000000000000000008ac7230489e8c37d000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000002556e69737761705632000000000000000000000000000000000000000000000000000000000000008ac7230489e8c37d000000000000000000000000000000000000000000000000000000082d6e0ed1000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000f164fc0ec4e93095b804a4795bbe1e041497b92a000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000020000000000000000000000003587b2f7e0e2d6166d6c14230e7fe160252b0ba400000000000000000000000079c950c7446b234a6ad53b908fbf342b01c4d4460000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000020000000000000000000000003587b2f7e0e2d6166d6c14230e7fe160252b0ba4000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000000000000000000000000000000000000000000000869584cd000000000000000000000000100000000000000000000000000000000000001100000000000000000000000000000000fc992e809e974bbe8dc3e0245e63ce49"

    
    
        // const tokenContract = new web3.eth.Contract(tokenABI, '0xBa8DCeD3512925e52FE67b1b5329187589072A55');
        // const tx =await tokenContract.approve()
        const params = {
            // Not all token symbols are supported. The address of the token should be used instead.
            sellToken: sellToken, //DAI
            buyToken: buyToken, //WETH
            // Note that the DAI token uses 18 decimal places, so `sellAmount` is `100 * 10^18`.
            sellAmount: sellAmount,
            takerAddress: takerAddress, //Including takerAddress is highly recommended to help with gas estimation, catch revert issues, and provide the best price
        };
        
        // const headers = {'0x-api-key':'108ce82c-b1c3-45d4-8d55-061f8b768fbf'};
        // const response = await fetch(
        //     `https://goerli.api.0x.org/swap/v1/quote?${qs.stringify(params)}`, { headers }
        // ); 
        
        // const quote= await response.json();
        // console.log(quote);

        const connector = new web3.eth.Contract(ABI, '0x3807e5d8BaB4266B7737b327E78c79EE2414710c');
        const encodedFunctionCall = await connector.methods.swap(buyToken,sellToken,sellAmount,35476692769,by,0).encodeABI();

        const functionAbi = {
                "constant": false,
                "inputs": [
                    {
                        "name": "_targetNames",
                        "type": "string[]"
                    },
                    {
                        "name": "_datas",
                        "type": "bytes[]"
                    },
                    {
                        "name": "_origin",
                        "type": "address"
                    }
                ],
                "name": "cast",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
                };
                
                
                const gasLimit = 23564576 ;
                const gasPrice = web3.utils.toWei('240', 'gwei');
                const encodedData = web3.eth.abi.encodeFunctionCall(functionAbi, [
                ['0x-V4'],
                [
                        encodedFunctionCall
                  ],
                  takerAddress
                ]);
                
                const transaction = {
                    from: "0xA3014F25945ae21119cecbea96056E826B6ae19B",
                    to: instaAccountAddress,
                    data: encodedData,
                    value: 0, // or any ETH amount if required
                    gas: gasLimit,
                    gasPrice: gasPrice
                };
                
                const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);
                
                web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
                if (!error) {
                  console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
                } else {
                  console.log("❗Something went wrong while submitting your transaction:", error)
                }
                });

}
main()