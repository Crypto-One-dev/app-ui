// Deploy muon
// 1. ownerAddSigner(muon_node_1/2/3)

// Deploy bridge
// step 1. ownerAddToken
// setp 2. mint token
// setp 3. ownerSetSideContract (address other contract)

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

// const BSCMuon = '0xC3694DAD0C4fdBB75CcAC2a845Bf5687d724457B'
// const ETHMuon ='0x6340c77fE7d62446808CC10CdBdFC6e85AcBd70A'
// const FTMMuon = '0xB238F0FD49EAebc946d8e505F7c8547B09819B08'

const BSCContract = '0xaBCddE8D2D4Bf6d4ef89C97340260cC87603d623'
const ETHContract = '0x88f4aDc94064B5Ff570A9D8954Cf45E3a890707b'
const FTMContract = '0x4B1F4Fd318680909ae45a55eAcAf8416Af71f88B'

const bscWeb3 = new Web3(
  new Web3.providers.HttpProvider(
    'https://data-seed-prebsc-1-s1.binance.org:8545/'
  )
)

const ethWeb3 = new Web3(
  new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/4e955a81217a477e88e3793856deb18b'
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
    tokenId: '1',
    address: {
      4: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
      97: '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6',
      4002: '0x91E32eE7799F20e6b89A36CdaA7fa12d5f482781'
    },
    icon: 'DEUS.svg'
  }
  // {
  //   name: 'DEA',
  //   tokenId: '2',
  //   address: {
  //     4: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
  //     97: '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6',
  //     4002: '0x91E32eE7799F20e6b89A36CdaA7fa12d5f482781'
  //   },
  //   icon: 'DEA.svg'
  // },
  // {
  //   name: 'BPT',
  //   tokenId: '3',
  //   address: {
  //     4: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
  //     97: '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6',
  //     4002: '0x91E32eE7799F20e6b89A36CdaA7fa12d5f482781'
  //   },
  //   icon: 'BPT.svg'
  // },
  // {
  //   name: 'sDEA',
  //   tokenId: '4',
  //   address: {
  //     4: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
  //     97: '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6',
  //     4002: '0x91E32eE7799F20e6b89A36CdaA7fa12d5f482781'
  //   },
  //   icon: 'sDEA.svg'
  // },
  // {
  //   name: 'sDEUS',
  //   tokenId: '5',
  //   address: {
  //     4: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
  //     97: '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6',
  //     4002: '0x91E32eE7799F20e6b89A36CdaA7fa12d5f482781'
  //   },
  //   icon: 'sDEUS.svg'
  // }
]

const chains = [
  { name: 'BSC', network: 97, networkName: 'bsctest', web3: bscWeb3 },
  { name: 'ETH', network: 4, networkName: 'rinkeby', web3: ethWeb3 }
  // { name: 'FTM', network: 4002, networkName: 'ftmtest', web3: ftmWeb3 }
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
