import Web3 from 'web3'
import abis from './abis'
import addrs from './addresses.json'

export class MuskService {

    constructor(account, chainId = 1) {
        this.account = account;
        this.chainId = 1;

        this.INFURA_URL = 'wss://' + this.getNetworkName() + '.infura.io/ws/v3/' + process.env.REACT_APP_INFURA_KEY;
        this.infuraWeb3 = new Web3(new Web3.providers.WebsocketProvider(this.INFURA_URL));
        this.SPCxContract = new this.infuraWeb3.eth.Contract(abis["sps"], this.getAddr("spcx_swap_contract"));
    }

    checkWallet = () => this.account && this.chainId

    networkNames = {
        1: "Mainnet",
        3: "Ropsten",
        4: "Rinkeby",
        42: "Kovan",
    }

    getNetworkName = () => this.networkNames[this.chainId.toString()]

    getAddr = (tokenName) => addrs[tokenName][this.chainId.toString()]

    getTokenAddr = (tokenName) => addrs["token"][tokenName][this.chainId.toString()]

    TokensMaxDigit = {
        wbtc: 8,
        usdt: 6,
        usdc: 6,
        coinbase: 18,
        dea: 18,
        deus: 18,
        dai: 18,
        eth: 18,
        bakkt: 18,
        spcx: 18,
    }

    _getWei(number, token = "eth") {
        let max = this.TokensMaxDigit[token] ? this.TokensMaxDigit[token] : 18
        // console.log(number);
        //let value = typeof number === "string" ? parseFloat(number).toFixed(max + 1) : number.toFixed(max + 1)
        let value = String(number)
        const indexDot = value.indexOf(".")
        if (indexDot !== -1 || value.substring(indexDot + 1).length > max) {
            value = value.substring(0, indexDot) + value.substring(indexDot, indexDot + max + 1)
        }
        // console.log(value);
        // value = value.substring(0, value.length - 1)
        // console.log(value);
        let ans = Web3.utils.toWei(String(value), 'ether');
        ans = ans.substr(0, ans.length - (18 - max));
        return ans.toString()
    }

    _fromWei(value, token) {
        let max = this.TokensMaxDigit[token] ? this.TokensMaxDigit[token] : 18
        let ans;
        if (typeof value != "string") {
            ans = value.toString()
        } else {
            ans = value;
        }
        while (ans.length < max) {
            ans = "0" + ans;
        }
        ans = ans.substr(0, ans.length - max) + "." + ans.substr(ans.length - max);
        if (ans[0] === ".") {
            ans = "0" + ans;
        }
        return ans.toString()
    }

    getEtherBalance() {
        if (!this.checkWallet()) return 0
        return this.infuraWeb3.eth.getBalance(this.account).then(balance => {
            return this._fromWei(balance, 'eth');
        })
    }


    getTokenBalance(tokenName) {
        if (!this.checkWallet()) return 0

        const account = this.account;

        if (tokenName === "eth") {
            return this.getEtherBalance(account)
        }
        const TokenContract = new this.infuraWeb3.eth.Contract(abis["token"], this.getTokenAddr(tokenName))
        return TokenContract.methods.balanceOf(account).call().then(balance => {
            return this._fromWei(balance, tokenName);
        })
    }

    approve(token, amount, listener) {
        if (!this.checkWallet()) return 0

        let metamaskWeb3 = new Web3(Web3.givenProvider);
        const TokenContract = new metamaskWeb3.eth.Contract(abis["token"], this.getTokenAddr(token));
        amount = Math.max(amount, 10 ** 20);

        return TokenContract.methods.approve(this.getAddr("spcx_swap_contract"), this._getWei(amount, token))
            .send({ from: this.account })
            .once('transactionHash', () => listener("transactionHash"))
            .once('receipt', () => listener("receipt"))
            .once('error', () => listener("error"));
    }

    getAllowances(token) {
        if (!this.checkWallet()) return 0

        const account = this.account;
        if (token === "eth") return 9999

        const TokenContract = new this.infuraWeb3.eth.Contract(abis["token"], this.getTokenAddr(token))
        return TokenContract.methods.allowance(account, this.getAddr("spcx_swap_contract"))
            .call().then(amount => {
                let result = this._fromWei(amount, token);
                // console.log(result);
                return result;
            });
    }


    swapTokens(fromToken, toToken, tokenAmount, listener) {

        if (!this.checkWallet()) return 0

        let metamaskWeb3 = new Web3(Web3.givenProvider);
        const SPCxContractMeta = new metamaskWeb3.eth.Contract(abis["bakkt_swap_contract"], this.getAddr("spcx_swap_contract"));

        if (fromToken === 'spcx') {
            if (toToken === 'dea') {

                console.log(tokenAmount);
                return SPCxContractMeta.methods.calculateSaleReturn(this._getWei(tokenAmount, toToken)).call()
                    .then(amount => {
                        const deusAmount = this._fromWei(amount[0], toToken)
                        return SPCxContractMeta.methods.sell(this._getWei(tokenAmount, fromToken), this._getWei(0.95 * deusAmount, toToken))
                            .send({
                                from: this.account
                            }).once('transactionHash', () => listener("transactionHash"))
                            .once('receipt', () => listener("receipt"))
                            .once('error', () => listener("error"))
                    })
            }
        }
        if (fromToken === 'dea') {
            if (toToken === 'spcx') {
                return SPCxContractMeta.methods.calculatePurchaseReturn(this._getWei(tokenAmount)).call()
                    .then(amount => {
                        const spcxAmount = this._fromWei(amount[0], toToken)
                        console.log(spcxAmount);
                        return SPCxContractMeta.methods.buy(this._getWei(spcxAmount * 0.95, fromToken), this._getWei(tokenAmount, toToken))
                            .send({
                                from: this.account
                            }).once('transactionHash', () => listener("transactionHash"))
                            .once('receipt', () => listener("receipt"))
                            .once('error', () => listener("error"))
                    })
            }
        }
    }



    getAmountsOut(fromToken, toToken, amountIn) {

        if (this.getTokenAddr(fromToken) === this.getTokenAddr("spcx") && this.getTokenAddr(toToken) === this.getTokenAddr("dea")) {
            return this.SPCxContract.methods.calculateSaleReturn(this._getWei(amountIn, fromToken)).call()
                .then(deusAmount => {
                    console.log(deusAmount);
                    return this._fromWei(deusAmount[0], toToken);
                })
        } else if (this.getTokenAddr(fromToken) === this.getTokenAddr("dea") && this.getTokenAddr(toToken) === this.getTokenAddr("spcx")) {
            return this.SPCxContract.methods.calculatePurchaseReturn(this._getWei(amountIn, fromToken)).call()
                .then(tokenAmount => {
                    return this._fromWei(tokenAmount[0], toToken);
                })
        }
    }

    getAmountsIn(fromToken, toToken, amountOut) {
        // if (!this.checkWallet()) return 0
        return -1;
        // console.log(fromToken, toToken, amountOut);
        // var path = paths[fromToken][toToken];
        // return this.uniswapRouter.methods.getAmountsIn(this._getWei(amountOut, fromToken), path).call()
        //     .then(amountsIn => {
        //         return this._fromWei(amountsIn[amountsIn.length - 2], toToken);
        //     }
        //     )
    }


}

