import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
// import { isAddress } from '@ethersproject/address'
import { abi } from '../../utils/StakingABI'

// // import { getBalanceNumber } from '../../helper/formatBalance'
import multicall from '../../helper/multicall'

const useTokenBalances = (chains, tokens, validChainId) => {
  const [balances, setBalances] = useState(tokens)
  const { account, chainId } = useWeb3React()
  // const web3 = useWeb3()

  useEffect(() => {
    const fetchBalances = async () => {
      chains.map(async (chain) => {
        const calls = tokens.map((token, index) => {
          return {
            address: token.address[chain.network],
            name: 'balanceOf',
            params: [account]
          }
        })
        console.log({ calls })
        const result = await multicall(chain.web3, abi, calls, chain.network)
        console.log(result)
      })

      // for (let i = 0; i < result.length; i++) {
      //     const balance = result[i];
      //     const address = calls[i].address
      //     tokensMap[address].balance = getBalanceNumber(balance, tokensMap[address]?.decimals)

      // }
      // const ethBalance = await web3.eth.getBalance(account)
      // tokensMap["0x"].balance = getBalanceNumber(ethBalance, tokensMap["0x"]?.decimals)
      // setBalances(tokensMap)
    }

    if (account) {
      fetchBalances()
      console.log('useTokenBalances')
    }
  }, [account, tokens, chainId, validChainId])

  return balances
}

export default useTokenBalances
