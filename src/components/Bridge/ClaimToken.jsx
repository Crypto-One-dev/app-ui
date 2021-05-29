import React from 'react'
import TokenBadge from './TokenBadge'
import useWeb3 from '../../helper/useWeb3'
import { makeContract } from '../../utils/Stakefun'
import { BridgeABI } from '../../utils/StakingABI'
import { sendTransaction } from '../../utils/Stakefun'
import { chains, tokens, BSCContract, ETHContract, FTMContract } from './data'
import { ethCallContract } from './utils'

const ClaimToken = (props) => {
  const { claims, chainId, account, setFetch } = props
  const [lock, setLock] = React.useState('')
  const web3 = useWeb3()
  const activeEthContract = makeContract(web3, BridgeABI, ETHContract)
  const activeBscContract = makeContract(web3, BridgeABI, BSCContract)
  const activeFtmContract = makeContract(web3, BridgeABI, FTMContract)

  const handleClaim = async (claim, network) => {
    try {
      if (chainId !== network) {
        return
      }
      if (
        lock &&
        lock.fromChain === claim.fromChain &&
        lock.toChain === claim.toChain &&
        lock.txId === claim.txId
      ) {
        return
      }
      let Contract = ''

      switch (chainId) {
        case 4:
          Contract = activeEthContract
          break
        case 97:
          Contract = activeBscContract
          break
        case 4002:
          Contract = activeFtmContract
          break
        default:
          break
      }
      let originContractAddress = ''
      switch (Number(claim.fromChain)) {
        case 4:
          originContractAddress = ETHContract
          break
        case 97:
          originContractAddress = BSCContract
          break
        case 4002:
          originContractAddress = FTMContract
          break
        default:
          break
      }
      let amount = web3.utils.fromWei(claim.amount, 'ether')
      let chain = chains.find((item) => item.network === Number(claim.toChain))
      let nodesSigResults = await ethCallContract(
        originContractAddress,
        'getTx',
        [claim.txId],
        BridgeABI,
        Number(claim.fromChain)
      )
      let sigs = nodesSigResults.result.signatures.map(
        ({ signature }) => signature
      )
      setLock(claim)
      sendTransaction(
        Contract,
        `claim`,
        [
          account,
          claim.amount,
          Number(claim.fromChain),
          Number(claim.toChain),
          claim.tokenId,
          claim.txId,
          sigs
        ],
        account,
        chainId,
        `Claim ${amount} ${chain.name}`
      ).then(() => {
        setFetch(claim)
        setLock('')
      })
    } catch (error) {
      console.log('error happend in Claim', error)
    }
  }
  return (
    <>
      {claims.length > 0 && (
        <div className="claim-token">
          <div className="claim-token-title">CLAIM TOKENS</div>
          {claims.map((claim, index) => {
            let amount = web3.utils.fromWei(claim.amount, 'ether')
            let token = tokens.find((item) => item.tokenId === claim.tokenId)
            let chain = chains.find(
              (item) => item.network === Number(claim.toChain)
            )
            return (
              <div key={index}>
                <div className="flex-between mb-5">
                  <div className="token-item">
                    <TokenBadge chain={chain.name} icon={token.icon} />
                    <span>{`${token.name} (${chain.name})`}</span>
                  </div>
                  <div className="claim-amount">{amount}</div>
                </div>
                {chain.network !== chainId ? (
                  <div className=" container-claim-btn change-claim">
                    CHANGE NETWORK TO CLAIM
                  </div>
                ) : (
                  <div
                    className="container-claim-btn claim-btn pointer"
                    onClick={() => handleClaim(claim, chain.network)}
                  >
                    CLAIM
                  </div>
                )}
                <div className="border-bottom-claim mb-20" />
              </div>
            )
          })}
          <div className="desc-claim">
            <span className="pink-color">
              Change to the destination Network
            </span>
            to claim your token on respective networks.
          </div>
        </div>
      )}
    </>
  )
}

export default ClaimToken
