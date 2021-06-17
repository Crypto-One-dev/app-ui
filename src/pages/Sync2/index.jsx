import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components'
import { Image } from 'rebass/styled-components';
import { FlexCenter } from '../../components/App/Container';
import { SwapWrapper, SwapArrow, } from '../../components/App/Swap';
import TokenBox from '../../components/App/Swap/TokenBox';
import SyncAction from '../../components/App/Synchronizer/SyncAction';
import SearchBox from '../../components/App/Synchronizer/SearchBox';
import { Base } from '../../components/App/Button';
import LongShort from '../../components/App/Synchronizer/LongShort';
import PriceBox from '../../components/App/Synchronizer/PriceBox';
import RemainingCap from '../../components/App/Synchronizer/RemainingCap';
import { ApproveTranaction } from '../../utils/explorers';
import { TransactionState } from '../../utils/constant';
import { dAmcTestToken } from '../../constant/token';
import { SyncData } from '../../constant/synchronizer';
import { useDebounce } from '../../helper/useDebounce';
import { useWeb3React } from '@web3-react/core';
import useAssetBalances from '../../helper/useAssetBalances';
import { RowCenter } from '../../components/App/Row';
import { sendMessage } from '../../utils/telegramLogger';
import { useOracleFetch } from '../../utils/SyncUtils';
import { correctChains, getCorrectChains } from '../../constant/correctChain';
import { useLocation } from 'react-router-dom';


const MainWrapper = styled.div`
   margin-top: 100px;
   text-align:center;
`
const Title = styled(FlexCenter)`
    display: inline-flex;
    font-family:"Monument Grotesk Semi";
`
export const NetworkTitle = styled(Base)`
  display:inline-flex;
  height:35px;
  color: ${({ theme }) => theme.text1};
  background: ${({ theme }) => theme.text1_2};
  border: 1px solid ${({ theme }) => theme.text1};
  /* margin-left:10px; */
  padding:0 8px;
  font-size: 25px;
`

const Sync2 = () => {
    const location = useLocation()
    const validChains = getCorrectChains(location.pathname)
    const SyncChainId = validChains[0]

    const oracle = SyncData[SyncChainId]
    const stableCoin = oracle.stableCoin
    const [fromCurrency, setFromCurrency] = useState(stableCoin)

    const [activeSearchBox, setActiveSearchBox] = useState(false)
    const [toCurrency, setToCurrency] = useState(dAmcTestToken)
    const [long, setLong] = useState(true)
    const [amountIn, setAmountIn] = useState("")
    const debouncedAmountIn = useDebounce(amountIn, 500);
    const [amountOut, setAmountOut] = useState("")
    const [stocks, setStocks] = useState(null)
    const [conducted, setConducted] = useState(null)
    const [prices, setPrice] = useState(null)
    const [fromPerTo, setFromPerTo] = useState(true)
    const [searchBoxType, setSearchBoxType] = useState("from")
    const [loading, setLoading] = useState(false);
    const [loadingCap, setLoadingCAP] = useState(false);


    const [lastInputFocus, setLastInputFocus] = useState(null)
    const { account, chainId } = useWeb3React()

    const changePosition = () => {
        setFromCurrency({ ...toCurrency, amount: "" })
        setToCurrency({ ...fromCurrency, amount: "" })
    }

    const getConducted = useOracleFetch(oracle.conducted)
    const getPrices = useOracleFetch(oracle.prices)
    const getStocks = useOracleFetch(oracle.registrar)
    const getSignatures = useOracleFetch(oracle.signatures)

    const balances = useAssetBalances(conducted, SyncChainId)



    const getData = useCallback(() => {
        setLoading(true);
        getConducted().then((res) => {
            setConducted(res[0])
            getStocks().then((res) => {
                setStocks(res[0])
                getPrices().then((res) => {
                    setPrice(res[0])
                    setLoading(false);
                    console.log("fetching finished");
                })
            })
        })
    }, [getStocks, getConducted, getPrices]);

    useEffect(() => {
        getData();
    }, [getData]);


    //prices
    //perPrice
    //sync
    //approve
    //confirmBox


    useEffect(() => { //adding chain and type wrap
        if (conducted && stocks) {
            console.log(conducted);
            conducted.tokens.map(async (token) => {
                if (!stocks[token.id]) {
                    console.log(token.id, " there isn't in registrar");
                    return
                }
                stocks[token.id].decimals = 18
                stocks[token.id].conducted = true
                stocks[token.id].isAsset = true
                stocks[token.id].long = { address: token.long }
                stocks[token.id].short = { address: token.short }
            })
        }
        setStocks(stocks)

    }, [conducted, stocks, account])//eslint-disable-line




    if (loading || loadingCap) {
        return (<div className="loader-wrap">
            {<img className="loader" src={process.env.PUBLIC_URL + "/img/loading.png"} alt="loader" />}
        </div>)
    }

    return (<>
        <SearchBox chainId={SyncChainId} currencies={stocks} active={activeSearchBox} setActive={setActiveSearchBox} />
        <MainWrapper>
            <Title>
                <div style={{ display: "flex", justifyContent: "flex-start", flexDirection: "column" }}>
                    <Image src="/img/sync-logo.svg" alt="sync" height="45px" style={{ marginBottom: "10px" }} />
                    <NetworkTitle>
                        <RowCenter >
                            <img src={process.env.PUBLIC_URL + "/img/chains/bsc.png"} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="DEUS" />
                            BSC
                        </RowCenter>
                    </NetworkTitle>
                </div>
            </Title>

            <SwapWrapper>
                <TokenBox
                    type="from"
                    setActive={setActiveSearchBox}
                    hasMax={true}
                    inputAmount={amountIn}
                    setInputAmount={setAmountIn}
                    currency={fromCurrency}
                />

                <SwapArrow onClick={changePosition}>
                    <Image src="/img/swap/swap-arrow.svg" size="20px" my="15px" />
                </SwapArrow>

                <TokenBox
                    type="to"
                    title="To (estimated)"
                    inputAmount={amountOut}
                    setInputAmount={setAmountOut}
                    setActive={setActiveSearchBox}
                    currency={toCurrency}
                />
                <LongShort setLong={setLong} isLong={long} />
                <PriceBox />

                <SyncAction
                    fromCurrency={fromCurrency}
                    validNetworks={validChains}
                    isPreApproved={true}
                    mt="20px" />

            </SwapWrapper>
            <RemainingCap />
        </MainWrapper >
    </>);
}

export default Sync2;