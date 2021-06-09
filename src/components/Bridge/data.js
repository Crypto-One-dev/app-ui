// Deploy muon
// 1. ownerAddSigner(muon_node_1/2/3/...)

// Deploy bridge
// step 1. ownerAddToken
// setp 2. mint token
// setp 3. ownerSetSideContract (address other contract)

// 1- BSC: deploy DEAToken

// 2- grantRole(both roles) to DEUS Bridge

// 3- BSC: add token to deus bridge

// 4- set mintable=True on Deugs bridge

// 5- update token address on UI

import { makeContract } from '../../utils/Stakefun'
import { BridgeABI } from '../../utils/StakingABI'
import Web3 from 'web3'

const validNetworks = [4, 97, 4002]

// const MUON_NODE_1 = '0x06A85356DCb5b307096726FB86A78c59D38e08ee'
// const MUON_NODE_2 = '0x4513218Ce2e31004348Fd374856152e1a026283C'
// const MUON_NODE_3 = '0xe4f507b6D5492491f4B57f0f235B158C4C862fea'
// 0x2236ED697Dab495e1FA17b079B05F3aa0F94E1Ef
// 0xCA40791F962AC789Fdc1cE589989444F851715A8
// 0x7AA04BfC706095b748979FE3E3dB156C3dFb9451
// 0x60AA825FffaF4AC68392D886Cc2EcBCBa3Df4BD9
// 0x031e6efe16bCFB88e6bfB068cfd39Ca02669Ae7C
// 0x27a58c0e7688F90B415afA8a1BfA64D48A835DF7
// 0x11C57ECa88e4A40b7B041EF48a66B9a0EF36b830

// const BSCMuon = '0xda2D1567Dfca43Dc2Bc9f8D072D746d0bfbF3E1a'
// const ETHMuon = '0x8ed35887C77Ee1BB533f05f85661fcDeF1FEda1E'
// const FTMMuon = '0x5D91EA00E414BB113C8ECe6674F84C906BD8b5D4'

// const BSCDEAToken='0xf93aAFF20124C9fbEDEA364Ea17B33dfEC09b34D'
// const FTMDEAToken='0xb79201Cb9f758dAb0cacEd4bFADC02D9465b5Cab'

const BSCContract = '0x11B650B8D2bbc60CdC434bd300F1b643ac77BAdA'
const ETHContract = '0xdAa80B54725147169614EF40C4a8EdeeA0F34D03'
const FTMContract = '0x05dFC221471F7Ea525c794Cfd3b5eC58D0d6B115'

const bscWeb3 = new Web3(
  new Web3.providers.HttpProvider(
    'https://data-seed-prebsc-1-s1.binance.org:8545/'
  )
)

const ethWeb3 = new Web3(
  new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/cf6ea736e00b4ee4bc43dfdb68f51093'
  )
)

const ftmWeb3 = new Web3(
  new Web3.providers.HttpProvider('https://rpc.testnet.fantom.network/')
)

const ethContract = makeContract(ethWeb3, BridgeABI, ETHContract)
const bscContract = makeContract(bscWeb3, BridgeABI, BSCContract)
const ftmContract = makeContract(ftmWeb3, BridgeABI, FTMContract)

const tokens = [
  {
    name: 'DEUS',
    decimals: 18,
    tokenId: '1',
    balances: {
      4: '0',
      97: '0',
      4002: '0'
    },
    address: {
      4: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
      97: '0xf93aAFF20124C9fbEDEA364Ea17B33dfEC09b34D',
      4002: '0xb79201Cb9f758dAb0cacEd4bFADC02D9465b5Cab'
    },
    icon: 'DEUS.svg'
  },
  {
    name: 'DEA',
    tokenId: '2',
    decimals: 18,
    balances: {
      4: '0',
      97: '0',
      4002: '0'
    },
    address: {
      4: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
      97: '0xf93aAFF20124C9fbEDEA364Ea17B33dfEC09b34D',
      4002: '0xb79201Cb9f758dAb0cacEd4bFADC02D9465b5Cab'
    },
    icon: 'DEA.svg'
  },
  {
    name: 'BPT',
    tokenId: '3',
    decimals: 18,
    balances: {
      4: '0',
      97: '0',
      4002: '0'
    },
    address: {
      4: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
      97: '0xf93aAFF20124C9fbEDEA364Ea17B33dfEC09b34D',
      4002: '0xb79201Cb9f758dAb0cacEd4bFADC02D9465b5Cab'
    },
    icon: 'BPT.svg'
  },
  {
    name: 'sDEA',
    tokenId: '4',
    decimals: 18,
    balances: {
      4: '0',
      97: '0',
      4002: '0'
    },
    address: {
      4: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
      97: '0xf93aAFF20124C9fbEDEA364Ea17B33dfEC09b34D',
      4002: '0xb79201Cb9f758dAb0cacEd4bFADC02D9465b5Cab'
    },
    icon: 'sDEA.svg'
  },
  {
    name: 'sDEUS',
    tokenId: '5',
    decimals: 18,
    balances: {
      4: '0',
      97: '0',
      4002: '0'
    },
    address: {
      4: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
      97: '0xf93aAFF20124C9fbEDEA364Ea17B33dfEC09b34D',
      4002: '0xb79201Cb9f758dAb0cacEd4bFADC02D9465b5Cab'
    },
    icon: 'sDEUS.svg'
  }
]

const chains = [
  { name: 'ETH', network: 4, networkName: 'rinkeby', web3: ethWeb3 },
  { name: 'BSC', network: 97, networkName: 'bsctest', web3: bscWeb3 },
  { name: 'FTM', network: 4002, networkName: 'ftmtest', web3: ftmWeb3 }
]

const instructions = [
  {
    name: 'approve',
    title: '1 – Approve Spend',
    desc: 'Approve the spend of the asset that you intend to bridge.'
  },
  {
    name: 'deposit',
    title: '2 – Deposit to Bridge',
    desc: 'Your asset will be deposited to the bridge before you can withdraw '
  },
  {
    name: 'network',
    title: '3 – Change Network',
    desc: 'Either press the button in the bridge interface or click: Change Network'
  },
  {
    name: 'claim',
    title: '4 – Claim Token',
    desc: 'Claim your bridged token.'
  }
]

export {
  ETHContract,
  BSCContract,
  FTMContract,
  tokens,
  chains,
  instructions,
  validNetworks,
  ethContract,
  bscContract,
  ftmContract,
  ethWeb3,
  bscWeb3,
  ftmWeb3
}
