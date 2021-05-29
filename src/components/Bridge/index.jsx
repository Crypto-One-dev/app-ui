import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { injected } from '../../connectors'
import './bridge.css'
import BridgeBox from './BridgeBox'
import ClaimToken from './ClaimToken'
import Instruction from './Instruction'
import TokenModal from './TokenModal'
import { makeContract } from '../../utils/Stakefun'
import {
  chains,
  BSCContract,
  ETHContract,
  FTMContract,
  validNetworks,
  ethContract,
  bscContract,
  ftmContract,
  ethWeb3,
  bscWeb3,
  ftmWeb3,
  tokens
} from './data'
import { abi, BridgeABI } from '../../utils/StakingABI'
import { sendTransaction, sendTransaction2 } from '../../utils/Stakefun'
import useWeb3 from '../../helper/useWeb3'
import useTokenBalances from './getBalances'

const Bridge = () => {
  const { account, chainId } = useWeb3React()
  const web3React = useWeb3React()
  const { activate } = web3React
  useTokenBalances(chains, tokens)

  const [open, setOpen] = React.useState(false)
  const [claims, setClaims] = React.useState([])
  const [wrongNetwork, setWrongNetwork] = React.useState(false)
  const [approve, setApprove] = React.useState('')

  const [target, setTarget] = React.useState()
  // TODO change chainId
  const [bridge, setBridge] = React.useState({
    from: {
      chain: 'ETH',
      icon: 'DEUS.svg',
      name: 'DEUS',
      chainId: 4,
      tokenId: '1',
      address: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1'
    },
    to: {
      chain: 'BSC',
      icon: 'DEUS.svg',
      name: 'DEUS',
      chainId: 97,
      tokenId: '1',
      address: '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6'
    }
  })
  const [fromBalance, setFromBalance] = React.useState(0)
  const [toBalance, setToBalance] = React.useState(0)
  const [amount, setAmount] = React.useState('0')
  const [fetch, setFetch] = React.useState('')
  const web3 = useWeb3()

  const activeEthContract = makeContract(web3, BridgeABI, ETHContract)
  const activeBscContract = makeContract(web3, BridgeABI, BSCContract)
  const activeFtmContract = makeContract(web3, BridgeABI, FTMContract)

  React.useEffect(() => {
    if (!validNetworks.includes(chainId)) {
      setWrongNetwork(true)
    }
    return () => {
      setWrongNetwork(false)
    }
  }, [chainId, bridge, account])

  React.useEffect(() => {
    const findClaim = async () => {
      let claims = []

      for (let index = 0; index < chains.length; index++) {
        const chain = chains[index]

        let originContract = ''
        switch (chain.network) {
          case 4:
            originContract = ethContract
            break
          case 97:
            originContract = bscContract
            break
          case 4002:
            originContract = ftmContract
            break
          default:
            break
        }
        let dest = chains.filter((item) => item.network !== chain.network)

        for (let index = 0; index < dest.length; index++) {
          const item = dest[index]
          let destContract = ''
          switch (item.network) {
            case 4:
              destContract = ethContract
              break
            case 97:
              destContract = bscContract
              break
            case 4002:
              destContract = ftmContract
              break
            default:
              break
          }
          let userTxs = await originContract.methods
            .getUserTxs(account, item.network)
            .call()

          let pendingTxs = await destContract.methods
            .pendingTxs(chain.network, userTxs)
            .call()
          const pendingIndex = pendingTxs.reduce(
            (out, bool, index) => (bool ? out : out.concat(index)),
            []
          )
          for (let index = 0; index < pendingIndex.length; index++) {
            let claim = await originContract.methods
              .txs(userTxs[pendingIndex[index]])
              .call()

            claims.push(claim)
          }
        }
      }

      setClaims(claims)
    }
    const getBalance = async () => {
      let bridgeWeb3 = ''
      let bridgeToWeb3 = ''

      switch (bridge.from.chainId) {
        case 4:
          bridgeWeb3 = ethWeb3
          break
        case 97:
          bridgeWeb3 = bscWeb3
          break
        case 4002:
          bridgeWeb3 = ftmWeb3
          break
        default:
          break
      }
      switch (bridge.to.chainId) {
        case 4:
          bridgeToWeb3 = ethWeb3
          break
        case 97:
          bridgeToWeb3 = bscWeb3
          break
        case 4002:
          bridgeToWeb3 = ftmWeb3
          break
        default:
          break
      }

      const fromContract = makeContract(bridgeWeb3, abi, bridge.from.address)
      let fromBalance = await fromContract.methods.balanceOf(account).call()
      fromBalance = web3.utils.fromWei(fromBalance, 'ether')
      setFromBalance(fromBalance)
      const toContract = makeContract(bridgeToWeb3, abi, bridge.to.address)
      let toBalance = await toContract.methods.balanceOf(account).call()
      toBalance = web3.utils.fromWei(toBalance, 'ether')
      setToBalance(toBalance)
    }
    if (account && validNetworks.includes(chainId)) {
      getBalance()
      findClaim()
    }

    const interval = setInterval(() => {
      if (account && validNetworks.includes(chainId)) {
        getBalance()
        findClaim()
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [bridge, account, chainId, fetch]) // eslint-disable-line

  React.useEffect(() => {
    const checkApprove = async () => {
      let bridgeWeb3 = ''
      let bridgeContract = ''
      switch (bridge.from.chainId) {
        case 4:
          bridgeContract = ETHContract
          bridgeWeb3 = ethWeb3
          break
        case 97:
          bridgeContract = BSCContract
          bridgeWeb3 = bscWeb3
          break
        case 4002:
          bridgeContract = FTMContract
          bridgeWeb3 = ftmWeb3
          break
        default:
          break
      }
      const fromContract = makeContract(bridgeWeb3, abi, bridge.from.address)
      let approve = await fromContract.methods
        .allowance(account, bridgeContract)
        .call()

      if (approve !== '0') {
        setApprove(true)
      } else {
        setApprove(false)
      }
    }
    if (account) checkApprove()
  }, [bridge.from, account]) // eslint-disable-line

  const handleOpenModal = (data) => {
    setTarget(data)
    setOpen(true)
  }
  const changeToken = (token, chainId) => {
    let chain = chains.find((item) => item.network === chainId).name
    setBridge((prev) => ({
      ...prev,
      [target]: {
        ...token,
        address: token.address[chainId],
        chainId: chainId,
        chain
      }
    }))
  }

  const handleApprove = async () => {
    try {
      if (!account) return
      if (approve) return

      if (chainId !== bridge.from.chainId) {
        setWrongNetwork(true)
        return
      }

      let Contract = makeContract(web3, abi, bridge.from.address)
      let amount = web3.utils.toWei('1000000000000000000')
      let bridgeContract = ''
      switch (bridge.from.chainId) {
        case 4:
          bridgeContract = ETHContract
          break
        case 97:
          bridgeContract = BSCContract
          break
        case 4002:
          bridgeContract = FTMContract
          break
        default:
          break
      }

      sendTransaction(
        Contract,
        `approve`,
        [bridgeContract, amount],
        account,
        chainId,
        `Approved ${bridge.from.name}`
      ).then(() => {
        setApprove(true)
      })
    } catch (error) {
      console.log('error happend in Approve', error)
    }
  }
  const handleDeposit = () => {
    try {
      if (!approve) return
      if (!account) {
        return
      }
      if (amount === '0' || amount === '') return

      if (chainId !== bridge.from.chainId) {
        setWrongNetwork(true)
        return
      }

      let Contract = ''
      let originWeb3 = ''

      switch (bridge.from.chainId) {
        case 4:
          Contract = activeEthContract
          originWeb3 = ethWeb3
          break
        case 97:
          Contract = activeBscContract
          originWeb3 = bscWeb3
          break
        case 4002:
          Contract = activeFtmContract
          originWeb3 = ftmWeb3
          break
        default:
          break
      }
      let amountWie = web3.utils.toWei(amount)
      sendTransaction2(
        Contract,
        `deposit`,
        [amountWie, bridge.to.chainId, bridge.from.tokenId],
        account,
        chainId,
        `Deposite ${amount} ${bridge.from.name}`,
        originWeb3
      ).then(() => {
        setAmount('0')
      })
    } catch (error) {
      console.log('error happend in Deposit', error)
    }
  }

  const handleConnectWallet = async () => {
    await activate(injected)
  }
  return (
    <div className="wrap-bridge">
      <div className="width-340">
        <Instruction />
      </div>

      <div className="container-bridge">
        <div className="bridge-title">
          <h1>DEUS Bridge</h1>
        </div>
        <img src="/img/bridge/bridge.svg" alt="bridge" />
        <img
          src="/img/bridge/bsc-logo 1.svg"
          alt="bsc-logo"
          className="bsc-logo"
        />
        <img
          src="/img/bridge/Ethereum-icon.svg"
          alt="eth-logo"
          className="eth-logo"
        />
        <img src="/img/bridge/image 1.svg" alt="logo" className="ftm-logo" />
        <div className="wrapp-bridge-box">
          <BridgeBox
            title="from"
            {...bridge.from}
            balance={fromBalance}
            amount={amount}
            setAmount={(data) => setAmount(data)}
            max={true}
            handleOpenModal={() => handleOpenModal('from')}
          />

          <div className="arrow">
            <img src="/img/swap/swap-arrow.svg" alt="arrow" />
          </div>
          <BridgeBox
            title="to"
            {...bridge.to}
            balance={toBalance}
            amount={amount}
            readonly={true}
            handleOpenModal={() => handleOpenModal('to')}
          />
        </div>
        {account ? (
          <>
            {!wrongNetwork && (
              <>
                <div className="container-btn">
                  <div
                    className={
                      approve ? 'bridge-deposit' : 'bridge-approve pointer'
                    }
                    onClick={handleApprove}
                  >
                    {approve ? 'Approved' : 'Approve'}
                  </div>

                  <div
                    className={
                      approve ? 'bridge-approve pointer' : 'bridge-deposit'
                    }
                    onClick={handleDeposit}
                  >
                    Deposit
                  </div>
                </div>
                <div className="container-status-button">
                  <div className="status-button">
                    <div className="active">1</div>
                    <div className={approve ? 'active' : ''}>2</div>
                  </div>
                </div>
              </>
            )}
            {wrongNetwork && (
              <div className="wrong-network-bridge">Wrong Network</div>
            )}
          </>
        ) : (
          <div className="pink-btn" onClick={handleConnectWallet}>
            Connect Wallet
          </div>
        )}

        <TokenModal
          open={open}
          hide={() => setOpen(!open)}
          changeToken={(token, chainId) => changeToken(token, chainId)}
        />
      </div>
      <div className="width-340">
        <ClaimToken
          claims={claims}
          chainId={chainId}
          account={account}
          setFetch={(data) => setFetch(data)}
        />
      </div>
    </div>
  )
}

export default Bridge
