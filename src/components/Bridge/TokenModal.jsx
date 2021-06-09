import React from 'react'
import ReactModal from 'react-modal'
import { chains } from './data'
if (typeof window !== 'undefined') {
  ReactModal.setAppElement('body')
}
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '560px',
    width: '95% ',
    background: '#242424',
    border: '1px solid #242424',
    borderRadius: '10px',
    padding: '26px 20px'
    // overflow: 'unset'
  }
}

const TokenModal = (props) => {
  const { open, hide, changeToken, tokens, tokenId, selectedChain } = props
  const [chain, setChain] = React.useState('')
  // const [chainToken, setChainToken] = React.useState(chains)
  // const [searchQuery, setSearchQuery] = React.useState('')
  const [showTokens, setShowTokens] = React.useState(tokens)
  // const [checked, setChecked] = React.useState({
  //   FTM: true,
  //   ETH: true,
  //   BSC: true
  // })

  React.useEffect(() => {
    if (tokenId) {
      let result = showTokens.filter((token) => token.tokenId === tokenId)
      // let filterChains = chains.filter((item) => item.network !== selectedChain)
      setShowTokens(result)
      // setChainToken(filterChains)
    } else {
      setShowTokens(tokens)
      // setChainToken(chains)
    }
  }, [tokenId]) // eslint-disable-line

  // const handleSearchModal = (e) => {
  //   let search = e.target.value
  //   setSearchQuery(search)
  // }
  // const handleFilter = (e) => {
  //   if (e.target.checked) {
  //     // Add to chainToken if not exist
  //     setChecked((prev) => ({ ...prev, [e.target.value]: true }))
  //     let result = chains.filter((item) => item.name === e.target.value)
  //     setChainToken((prev) => [...prev, ...result])
  //   } else {
  //     // remove from chainToken
  //     setChecked((prev) => ({ ...prev, [e.target.value]: false }))
  //     let result = chainToken.filter((item) => item.name !== e.target.value)
  //     setChainToken(result)
  //   }
  // }
  // React.useEffect(() => {
  //   const search = new RegExp([searchQuery].join(''), 'i')
  //   let resultFilter = tokens.filter(
  //     (item) => search.test(item.name) || search.test(item.chain)
  //   )
  //   if (tokenId) {
  //     resultFilter = resultFilter.filter((token) => token.tokenId === tokenId)
  //   }

  //   setShowTokens(resultFilter)
  // }, [chainToken, searchQuery, tokens]) // eslint-disable-line

  const closeModal = () => {
    hide()
    setChain('')
    // setShowTokens(tokens)
    // setSearchQuery('')
    // setChainToken(chains)
  }

  return (
    <ReactModal
      isOpen={open}
      style={customStyles}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
    >
      <div>
        {/* <> */}
        <div className="modal-header">
          <div className="modal-title">Select an asset</div>
          <span onClick={closeModal} className="close">
            &times;
          </span>
        </div>
        <div className="border-bottom"></div>

        {/* <div className="bridge-checkbox ">
            {chains.map((chain, index) => (
              <label className="container-checkbox" key={index}>
                <input
                  type="checkbox"
                  id={chain.name}
                  name={chain.name}
                  defaultValue={chain.name}
                  onChange={handleFilter}
                  checked={checked[chain.name]}
                  disabled={chain.network === selectedChain}
                />
                <span className="checkmark"></span>
                {chain.name}
              </label>
            ))}
          </div> */}
        {/* </> */}

        {/* <div className="modal-body"> */}
        <div className="content-modal-bridge">
          {/* <input
              className="input-search"
              placeholder="Type to search"
              onChange={handleSearchModal}
            /> */}
          <div className="filter">Select Chain</div>
          <ul className="bridge-radio">
            {chains.map((chain, index) => (
              <li key={index} className="pointer">
                <input
                  type="radio"
                  id={chain.name}
                  name="chainRadio"
                  onChange={() => setChain(chain)}
                  disabled={chain.network === selectedChain}
                />
                <label htmlFor={chain.name} className={`${chain.name} pointer`}>
                  {chain.name}
                </label>
              </li>
            ))}
          </ul>
          <div className="flex-between token-name">
            <div>Token name</div>
            <div className="pr-13">Balance</div>
          </div>
          <div className="border-bottom"></div>
          <div className="container-token">
            {chain ? (
              // chainToken.map((chain) =>
              showTokens.map((token, index) => {
                return (
                  <div className="token-list" key={index}>
                    <div className="token-list-item ">
                      <img src={`/img/bridge/${token.icon}`} alt={token.icon} />

                      {/* <TokenBadge chain={chain.name} icon={token.icon} /> */}
                      <div
                        className="pointer"
                        onClick={() => {
                          changeToken(token, chain.network)
                          closeModal()
                        }}
                      >
                        {token.name}
                        <span className="bridge-container-badge-modal">
                          (
                          <span
                            className={`modal-badge badge badge-${chain.name}`}
                          >
                            {chain.name}
                          </span>
                          )
                        </span>
                      </div>
                    </div>
                    <div>{token.balances[chain.network]}</div>
                  </div>
                )
              })
            ) : (
              // )
              <div className="desc-select-chain">Select a Chain</div>
            )}
          </div>
        </div>
        {/* </div> */}
      </div>
    </ReactModal>
  )
}

export default TokenModal
