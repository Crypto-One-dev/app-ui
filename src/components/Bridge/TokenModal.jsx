import React from 'react'
import ReactModal from 'react-modal'
import TokenBadge from './TokenBadge'
import { tokens, chains } from './data'
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
    maxHeight: '95%',
    maxWidth: '560px',
    width: '95% ',
    background: '#242424',
    border: '1px solid #242424',
    padding: '26px 20px'
    // overflow: 'unset'
  }
}

const TokenModal = (props) => {
  const { open, hide, changeToken } = props
  const [chainToken, setChainToken] = React.useState(chains)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [showTokens, setShowTokens] = React.useState(tokens)
  const [checked, setChecked] = React.useState({
    FTM: true,
    ETH: true,
    BSC: true
  })

  const handleSearchModal = (e) => {
    let search = e.target.value
    setSearchQuery(search)
  }
  const handleFilter = (e) => {
    if (e.target.checked) {
      // Add to chainToken if not exist
      setChecked((prev) => ({ ...prev, [e.target.value]: true }))
      let result = chains.filter((item) => item.name === e.target.value)
      setChainToken((prev) => [...prev, ...result])
    } else {
      // remove from chainToken
      setChecked((prev) => ({ ...prev, [e.target.value]: false }))
      let result = chainToken.filter((item) => item.name !== e.target.value)
      setChainToken(result)
    }
  }
  React.useEffect(() => {
    const search = new RegExp([searchQuery].join(''), 'i')
    const resultFilter = tokens.filter(
      (item) => search.test(item.name) || search.test(item.chain)
    )
    setShowTokens(resultFilter)
  }, [chainToken, searchQuery])

  const closeModal = (token, network) => {
    changeToken(token, network)
    hide()
    setShowTokens(tokens)
    setChecked({
      FTM: true,
      ETH: true,
      BSC: true
    })
    setSearchQuery('')
    setChainToken(chains)
  }
  return (
    <ReactModal
      isOpen={open}
      style={customStyles}
      closeTimeoutMS={200}
      onRequestClose={hide}
      shouldCloseOnOverlayClick={true}
    >
      <div>
        <div className="modal-header">
          <div className="modal-title">Select an asset</div>

          <span className="close" onClick={hide}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <div className="content-modal-bridge">
            <input
              className="input-search"
              placeholder="Type to search"
              onChange={handleSearchModal}
            />
            <div className="filter">Filter</div>
            <div className="bridge-checkbox ">
              {chains.map((chain, index) => (
                <span key={index}>
                  <input
                    type="checkbox"
                    id={chain.name}
                    name={chain.name}
                    defaultValue={chain.name}
                    onChange={handleFilter}
                    checked={checked[chain.name]}
                  />
                  <label htmlFor={chain.name} className="pointer">
                    {chain.name}
                  </label>
                </span>
              ))}
            </div>
            <div className="border-bottom"></div>
            <div className="flex-between token-name">
              <div>Token name</div>
              <div>Balance</div>
            </div>
            <div className="border-bottom mb-5"></div>
            <div className="container-token">
              {chainToken.map((chain) =>
                showTokens.map((token, index) => {
                  return (
                    <div
                      className="token-list"
                      key={index}
                      onClick={() => closeModal(token, chain.network)}
                    >
                      <div className="token-list-item pointer">
                        <TokenBadge chain={chain.name} icon={token.icon} />
                        <span>{`${token.name} (${chain.name})`}</span>
                      </div>
                      <div>{token.balance}</div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  )
}

export default TokenModal
