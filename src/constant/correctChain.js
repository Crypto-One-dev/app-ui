import { ChainMap } from "./web3";

//Always we use first chainId as prefer chain
export const correctChains = [
    {
        url: "/swap",
        chains: [ChainMap.MAINNET, ChainMap.RINKEBY],
        exact: true,
    },
    {
        url: "/crosschain/xdai",
        chains: [ChainMap.XDAI],
    },
    {
        url: "/crosschain/bsc",
        chains: [ChainMap.BSC, ChainMap.BSC_TESTNET],
    },
    {
        url: "/crosschain/heco",
        chains: [ChainMap.HECO_TESTNET],
    },
    {
        url: "/synchronizer",
        chains: [ChainMap.MAINNET, ChainMap.RINKEBY],
        exact: true,
    },
    {
        url: "/stake-and-yield",
        chains: [ChainMap.MAINNET, ChainMap.RINKEBY],
        exact: true,
    },
    {
        url: "/vaults",
        chains: [ChainMap.MAINNET, ChainMap.RINKEBY],
        exact: true,
    },
    {
        url: "/staking",
        chains: [ChainMap.MAINNET, ChainMap.RINKEBY],
    },
    {
        url: "/migrator",
        chains: [ChainMap.MAINNET, ChainMap.RINKEBY],
        exact: true,
    },
    {
        url: "/baktt",
        chains: [ChainMap.MAINNET, ChainMap.RINKEBY],
        exact: true,
    },
    {
        url: "/musk",
        chains: [ChainMap.MAINNET, ChainMap.RINKEBY],
        exact: true,
    },
    {
        url: "/bridge",
        chains: [ChainMap.RINKEBY],
    },
]

export function getCorrectChains(path) {
    if (path === "/") return [ChainMap.MAINNET]
    for (let i = 0; i < correctChains.length; i++) {
        if (path.includes(correctChains[i].url)) {
            if (correctChains[i].exact) {
                if (correctChains[i].url === path)
                    return correctChains[i].chains
                else
                    return [ChainMap.MAINNET]
            }
            return correctChains[i].chains
        }
    }
}