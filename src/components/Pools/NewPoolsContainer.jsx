import React, { Component } from 'react'

import * as stakeService from '../../services/StakingService'
import { getStayledNumber } from '../../utils/utils'
import { ToastContainer, toast } from 'react-toastify';
import * as config from '../../config';

import 'react-toastify/dist/ReactToastify.css';
import '../../styles/scss/pools.css';
import StartPool from './StartPool';
import Pools from './Pools';
import StakePopup from './StakePopup';
import Footer from '../common/Footer';
import MigrationPopup from './MigrationPopup';
import { Link } from 'react-router-dom';


class NewPoolsContainer extends Component {
    state = {
        isMigPopup: false,
        isConnected: false,
        showPopup: false,
        staking: {
            name: "",
            amount: "",
            contract: "",
            coin_name: "",
            isApprove: true,
            showApprove: true,
        },
        wallet: {
            address: null,
        },
        markets: {
            dea_price: "",
            market_cap: "",
            total_locked: "",
            fully_duilted: "",
        },
        stakes: {
            deus: {
                name: "deus",
                amounts: {
                    dea: 0,
                    newdea: 0,
                    apy: 0,
                    lp: 0,
                    pool: 0,
                    currLp: 0,
                    allowances: 0,
                },
                isDeusLink: true,
                coin_name: "DEUS",
                stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
                liqLink: "/swap",
                rewardRatio: 0,
            },

            deus_dea: {
                name: "deus_dea",
                amounts: {
                    dea: 0,
                    newdea: 0,
                    apy: 0,
                    lp: 0,
                    pool: 0,
                    currLp: 0,
                    allowances: 0,
                },
                coin_name: "UNI-V2-DEUS/DEA",
                stakingLink: "0xef753f6da67b765ded917c2273ce07445e86c8d2",
                liqLink: "https://app.uniswap.org/#/add/0x3b62F3820e0B035cc4aD602dECe6d796BC325325/0x80aB141F324C3d6F2b18b030f1C4E95d4d658778",
                rewardRatio: 0,
            },
            dea: {
                name: "dea",
                amounts: {
                    dea: 0,
                    newdea: 0,
                    apy: 0,
                    lp: 0,
                    pool: 0,
                    currLp: 0,
                    allowances: 0,
                },
                // comming_soon: true,
                coin_name: "DEA",
                // isDeusLink: true,
                stakingLink: "0x1D17d697cAAffE53bf3bFdE761c90D61F6ebdc41",
                liqLink: "https://app.uniswap.org/#/swap?inputCurrency=0x3b62f3820e0b035cc4ad602dece6d796bc325325&outputCurrency=0x80ab141f324c3d6f2b18b030f1c4e95d4d658778",
                rewardRatio: 0,
            },
            // uni: {
            //     name: "uni",
            //     amounts: {
            //         dea: 0,
            //         newdea: 0,
            //         apy: 0,
            //         lp: 0,
            //         pool: 0,
            //         currLp: 0,
            //         allowances: 0,
            //     },
            //     coin_name: "UNI",
            //     stakingLink: "0x8cd408279e966b7e7e1f0b9e5ed8191959d11a19",
            //     liqLink: "https://app.uniswap.org/#/swap?outputCurrency=0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
            //     rewardRatio: 0,
            // },
        },
    }

    constructor(props) {
        super(props);
        // create a ref to store the textInput DOM element
        this.scrollRef = React.createRef();
    }

    componentDidMount() {
        document.title = 'DEUS staking';
        setTimeout(() => this.isConnected(), 1000);
        setTimeout(() => this.handleScroller(), 100);
        this.handleUpdateDEA()
        this.getMarketAmounts()
        setInterval(() => this.getMarketAmounts(), 40000)
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    handleResize = () => this.handleScroller()

    handleScroller = () => {
        const width = (2300 - window.innerWidth) / 2
        if (this.scrollRef.current) {
            this.scrollRef.current.scrollLeft = width
        }
    }


    handleStakeState = (state) => {
        if (state === "receipt" || state === "error") {
            this.setState({ SwapState: null })
            this.notify(state)
            return
        }
        this.notify(state)
    }

    notify = (state) => {
        const { staking } = this.state

        switch (state) {
            case "waiting": {
                toast.info("Waiting for Metamask confirmation.", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                break
            }
            case "transactionHash": {
                toast.info("Transaction broadcasted.", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                break
            }
            case "receipt": {
                toast.success("Transaction Successful.", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                if (staking.isApprove) {
                    staking.isApprove = false
                    this.setState({ staking })
                } else {
                    this.handlePopup(staking.name, false)
                }
                this.getTokenAllAmounts(staking.name)
                break
            }
            case "connectWallet": {
                toast.warn("Please Connect Wallet.", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                break
            }
            case "error": {
                toast.warn("Transaction Failed.", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                break
            }
            default: {
                toast.info("Unhandled Event.", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        }
    };

    initial = () => {
        console.log("initial called");
        const { stakes } = this.state
        for (const stakedToken in stakes) {
            this.getTokenAllAmounts(stakedToken)
        }
    }


    dontCheckThisToken = (token) => {
        return token.comming_soon || !token
    }

    getTokenAllAmounts = (stakedToken) => {
        const { stakes } = this.state
        const token = stakes[stakedToken]
        if (this.dontCheckThisToken(token)) return
        console.log("initial called for \t" + stakedToken);
        stakeService.getNumberOfStakedTokens(token.name).then((amount) => {
            token.amounts.lp = getStayledNumber(amount)
            this.setState({ stakes })

            stakeService.getTotalStakedToken(token.name).then((amount) => {
                token.amounts.pool = token.amounts.lp === "0" || amount === "0" ? 0 : (token.amounts.lp / amount) * 100
                this.setState({ stakes })

                stakeService.getNumberOfPendingRewardTokens(token.name).then((amount) => {
                    token.amounts.dea = parseFloat(amount)
                    token.rewardRatio = token.amounts.pool * config.FixedRatio / 100
                    // token.amounts.newdea = getStayledNumber(parseFloat(amount) + (config.ClaimableDuration / config.UpdateDuration) * token.rewardRatio * 0.89539)
                    this.setState({ stakes })
                })
            })
        })
        stakeService.getUserWalletStakedTokenBalance(token.name).then((amount) => {
            token.amounts.currLp = getStayledNumber(amount)
            this.setState({ stakes })
        })
        stakeService.getAllowances(token.name).then((amount) => {
            // console.log(amount);
            token.amounts.allowances = getStayledNumber(amount)
            this.setState({ stakes })
        })
    }


    getMarketAmounts = async () => {
        console.log("getMarketAmounts called");

        try {
            const { stakes, markets } = this.state
            const resp = await fetch("https://app.deus.finance/static-api.json")
            const jresp = await resp.json()
            const apys = jresp.apy
            const marketsResp = jresp.market
            for (const apyKey in apys) {
                if (!stakes[apyKey]) continue
                stakes[apyKey].amounts.apy = parseFloat(apys[apyKey]).toFixed(2)
            }
            for (const key in marketsResp) {
                markets[key] = parseFloat(marketsResp[key])
            }
            this.setState({ stakes })
        } catch (error) {
            console.log(" get Market Amounts had some error", error);
        }
    }


    handleUpdateDEA = () => setInterval(() => {
        const { stakes } = this.state
        for (const tokenName in stakes) {
            const token = stakes[tokenName]
            if (this.dontCheckThisToken(token)) return
            stakeService.getNumberOfPendingRewardTokens(token.name).then((amount) => {
                token.amounts.dea = parseFloat(amount)
                // token.amounts.newdea = getStayledNumber(parseFloat(amount) + (config.ClaimableDuration / config.UpdateDuration) * token.rewardRatio * 0.89539)
                this.setState({ stakes })
            })
        }
    }, (config.ClaimableDuration) * 1000)


    handleStake = () => {
        const { staking } = this.state
        console.log(staking.amount);
        stakeService.stake(staking.name, staking.amount, this.handleStakeState)
    }

    handleApprove = () => {
        const { staking } = this.state
        console.log(staking.amount);
        stakeService.approve(staking.name, staking.amount, this.handleStakeState)
    }

    handleClaim = (stakedToken) => {
        stakeService.withdraw(stakedToken, 0, this.handleStakeState)
        const { staking } = this.state
        staking.name = stakedToken
        this.setState({ staking })
        console.log("0 handleClaim clicked")
    }

    isMigToken = (stakedToken) => {
        return stakedToken === "ampl_eth" || stakedToken === "uni" || stakedToken === "snx" ? true : false
    }


    handleWithdraw = (stakedToken, amount) => {
        console.log("withdraw" + amount);
        const { staking } = this.state
        staking.name = stakedToken
        this.setState({ staking })
        stakeService.withdraw(stakedToken, amount, this.handleStakeState)
    }


    handleLP = (pair) => {
        console.log(pair + " handleLP clicked");
    }


    isConnected = () => {
        if (window.ethereum) {
            if (window.ethereum.selectedAddress) {
                const { wallet } = this.state
                wallet.address = window.ethereum.selectedAddress
                this.setState({ wallet, isConnected: true })
                this.handleScroller()
            }
            if (window.ethereum.isMetaMask) {
                this.setState({ isMetamask: true })
            }
        }
        this.initial()
    }


    setStakingAmount = (value) => {
        const { staking } = this.state
        staking.amount = value
        this.setState({ staking })
    }


    handleConnectWallet = async () => {
        try {
            const rep = await stakeService.connectWallet(() => console.log("connected"))
            console.log(rep ? "connected to metamask" : "");
            this.isConnected()
        } catch (error) {
            console.log("didnt connect to metamask \t" + error);
        }
    }
    showAddress = () => {
        const { address } = this.state.wallet
        return address.substring(0, 6) + "..." + address.substring(address.length - 4, address.length)
    }

    handleMaxLP = (amount) => {
        const { staking } = this.state
        staking.amount = amount
        this.setState({ staking })
    }

    handlePopup = (stakedToken, bool) => {
        console.log(stakedToken);
        const { staking } = this.state
        const token = this.state.stakes[stakedToken]
        if (bool) {
            staking.contract = "" + token.stakingLink
            staking.coin_name = token.coin_name
            this.getTokenAllAmounts(stakedToken)
            staking.isApprove = token.amounts.allowances > 100000 ? false : true
            staking.showApprove = token.amounts.allowances > 100000 ? false : true
            staking.name = stakedToken
        }
        staking.amount = ""
        this.setState({ showPopup: bool, staking })
    }

    handleMigPupop = (bool) => {
        this.setState({ isMigPopup: bool })
    }

    render() {
        const { isConnected, stakes, staking, showPopup, isMigPopup, markets } = this.state
        const orders = {
            tokens: ["deus_dea", "deus", "dea", "EMPTY1", "EMPTY", "EMPTY1"],
            // tokens: ["deus_dea", "deus_eth", "dea_usdc", "deus", null, "dea"],
            shadows: ["blue-200-shadow", "yellow-400-shadow", "blue-200-shadow", "yellow-400-shadow", "yellow-300-shadow", "blue-200-shadow"],
        }
        const poolsLink = <Link to="/pools" className="pool-link" > old pools</Link>

        return (<>
            <div>

            </div>
            <MigrationPopup isMigPopup={isMigPopup} handleMigPupop={this.handleMigPupop} />
            <ToastContainer />
            <StakePopup
                showPopup={showPopup}
                staking={staking}
                stakes={stakes}
                handlePopup={this.handlePopup}
                handleMaxLP={this.handleMaxLP}
                setStakingAmount={this.setStakingAmount}
                handleApprove={this.handleApprove}
                handleStake={this.handleStake}
            />
            <StartPool isConnected={isConnected} handleConnectWallet={this.handleConnectWallet} />
            <Pools
                markets={markets}
                stakes={stakes}
                isConnected={isConnected}
                scrollRef={this.scrollRef}
                handleScroller={this.handleScroller}
                handleConnectWallet={this.handleConnectWallet}
                showAddress={this.showAddress}
                handlePopup={this.handlePopup}
                handleClaim={this.handleClaim}
                handleLP={this.handleLP}
                handleWithdraw={this.handleWithdraw}
                orders={orders}
                poolsLink={poolsLink}
                poolVersion={"new"}

            />
            <Footer classes="social" />
        </>);
    }
}

export default NewPoolsContainer;
