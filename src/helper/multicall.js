import { Interface } from '@ethersproject/abi'
import { getMultiCallContract } from './contractHelpers'

const multicall = async (web3, abi, calls, chainId) => {
  const multi = getMultiCallContract(web3, chainId)

  const itf = new Interface(abi)

  const calldata = calls.map((call) => [
    call.address.toLowerCase(),
    itf.encodeFunctionData(call.name, call.params)
  ])
  console.log({ calldata, multi })
  const { returnData } = await multi.methods.aggregate(calldata).call()
  const res = returnData.map((call, i) =>
    itf.decodeFunctionResult(calls[i].name, call)
  )

  return res
}

export default multicall
