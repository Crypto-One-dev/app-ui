import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
// import { isAddress } from '@ethersproject/address'
import { abi } from '../../utils/StakingABI'

import { getBalanceNumber } from '../../helper/formatBalance'
import multicall from '../../helper/multicall'

const useTokenBalances = (chains, tokens, fetchData) => {
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

        const result = await multicall(chain.web3, abi, calls, chain.network)

        for (let i = 0; i < result.length; i++) {
          const balance = result[i]
          const address = calls[i].address
          console.log(
            balance,
            address,
            tokens[address],
            getBalanceNumber(balance, tokens[address]?.decimals)
          )
          let token = tokens.find(
            (token) => token.address[chain.network] === address
          )
          token.balances[chain.network] = getBalanceNumber(
            balance,
            tokens[address]?.decimals
          )
        }
        console.log(tokens)
      })

      setBalances(tokens)
    }

    if (account) {
      fetchBalances()
      console.log('useTokenBalances')
    }
  }, [account, tokens, chainId, fetchData, chains])

  return balances
}

export default useTokenBalances
