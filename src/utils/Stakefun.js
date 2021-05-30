import moment from 'moment'
import { CustomTranaction } from './explorers'
import { TransactionState } from './constant'

// const INFURA_URL =
//   'wss://rinkeby.infura.io/ws/v3/4e955a81217a477e88e3793856deb18b'

// const web3 = new Web3(window.ethereum ? window.ethereum : INFURA_URL)

const makeContract = (web3, abi, address) => {
  return new web3.eth.Contract(abi, address)
}

const sendTransaction = (
  contract,
  methodName,
  params,
  owner,
  chainId,
  message
) => {
  return new Promise((resolve, reject) => {
    try {
      let hash = null
      contract.methods[methodName](...params)
        .send({ from: owner })
        .once('transactionHash', (tx) => {
          hash = tx
          CustomTranaction(TransactionState.LOADING, {
            hash,
            chainId,
            message
          })
        })
        .once('receipt', ({ transactionHash }) => {
          CustomTranaction(TransactionState.SUCCESS, {
            hash: transactionHash,
            chainId,
            message
          })
          resolve()
        })
        .once('error', (error) => {
          console.log('************error happend', error)
          CustomTranaction(TransactionState.FAILED, {
            hash,
            chainId
          })
          reject()
        })
    } catch (error) {
      console.log('error happend in send Transaction', error)
    }
  })
}

const sendTransaction2 = (
  contract,
  methodName,
  params,
  owner,
  chainId,
  message,
  web3
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hash = null
      let check = true
      contract.methods[methodName](...params)
        .send({ from: owner })
        .once('transactionHash', (tx) => {
          hash = tx
          CustomTranaction(TransactionState.LOADING, {
            hash,
            chainId,
            message
          })
        })
      const interval = setInterval(async () => {
        let tx = await web3.eth.getTransactionReceipt(hash)
        if (tx) {
          check = false
          if (tx.status) {
            CustomTranaction(TransactionState.SUCCESS, {
              hash: tx.transactionHash,
              chainId,
              message
            })
            resolve()
          } else {
            CustomTranaction(TransactionState.FAILED, {
              hash,
              chainId
            })
            reject()
          }
          if (!check) {
            clearInterval(interval)
          }
        }
      }, 15000)
    } catch (error) {
      console.log('**************error happend in send Transaction2', error)
    }
  })
}

const diffHours = (customDate) => {
  const date = moment(customDate)
  let now = moment(new Date())
  return date.diff(now)
}

export { makeContract, diffHours, sendTransaction, sendTransaction2 }
