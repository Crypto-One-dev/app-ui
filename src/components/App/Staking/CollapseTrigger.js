import React from 'react'
import ActionButton from './ActionButton'
import styled from 'styled-components'

const CollapseTriggerDiv = styled.div`
  display: flex;
  justify-content: space-between;

  & > * {flex-basis: 33.33%;}

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    position: relative;
    display: block;
  `}
`

const TokenInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const TokenTitleP = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 25px;
  line-height: 29px;
  color: #ffffff;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    font-size: 20px;
  `}

  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 18px;
  `}

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-size: 20px;
  `}
`

const WalletAmountDiv = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 12.5px;
  margin-top: 4px;
  line-height: 14px;

  margin-bottom: 2px;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-size: 11.5px;
    line-height: 14px;
  `}
`

const ItemDiv = styled.div`
  margin-bottom: 2px;
`

const BlueColorSpan = styled.span`
  color: #08a4f5;
`

const SwapBPTDiv = styled.div`
  font-style: normal;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: #ffffff;
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    font-size: 10.5px;
  `}

  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 9px;
  `}

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-size: 10px;
    position: absolute;
    top: 6px;
    right: 8px;
    font-size: 10px;
  `}
`

const ApyWrapDiv = styled.div`
  font-family: "Monument Grotesk2";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5);

  display: inline-block;
  border-bottom: 2px solid #ffffff;
  margin-bottom: 4px;
  padding-bottom: 4px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    position: absolute;
    font-size: 13px;
    top: 5px;
    right: 12px;
  `}
`

const ApyStakeDiv = styled.div`
  display: inline-block;
  border-bottom: 2px solid #ffffff;
  margin-bottom: 4px;
  padding-bottom: 4px;
`

const ApyYieldDiv = styled.div``

const ExpandContainerDiv = styled.div`
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    flex-direction: column;
    margin: 0 auto;
    clear: both;
    flex-direction: row;
    margin: 15px auto;
  `}
`

const ExpandBtnSpan = styled.span`
  min-width: 80px;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  margin-left: 15px;
  text-align: right;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    min-width: 65px;
    font-size: 10.5px;
  `}

  ${({ theme }) => theme.mediaWidth.upToLarge`
    min-width: 58px;
    font-size: 9px;
  `}

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    flex-grow: 1;
    position: absolute;
    bottom: -25px;
    right: 0;
  `}
`

const Img = styled.img`
  padding: 0 5px;
  width: 18px;
  transform: ${({ open }) => open && "rotate(180deg)"};
`

const CollapseTrigger = (props) => {
  const { open, title,balancer, link, onlyLocking, apy, 
    balanceWallet, balance, handleCollapseContent } = props

    const handleLock = (e) => {
    if (balancer) {
      e.stopPropagation()
      e.preventDefault()
      window.open(link, '_blank')
    } else {
      if (open) {
        e.stopPropagation()
        e.preventDefault()
      }
      handleCollapseContent('lock')
    }
  }
  const handleStake = (e) => {
    if (onlyLocking) {
      e.stopPropagation()
      e.preventDefault()
      window.open(
        'https://pools.balancer.exchange/#/pool/0x1dc2948b6db34e38291090b825518c1e8346938b/',
        '_blank'
      )
    } else {
      if (open) {
        e.stopPropagation()
        e.preventDefault()
      }
      handleCollapseContent('stake')
    }
  }

  return (
    <CollapseTriggerDiv>
      <TokenInfoDiv>
        <TokenTitleP> {title} </TokenTitleP>
        <WalletAmountDiv>
          <ItemDiv>
            <BlueColorSpan> {balanceWallet} </BlueColorSpan> wallet
          </ItemDiv>
          <ItemDiv>
            {!onlyLocking && ( <>
            <BlueColorSpan> {` ${balance}`} </BlueColorSpan> Staked
            </>
            )}
          </ItemDiv>
        </WalletAmountDiv>
      </TokenInfoDiv>

      {onlyLocking ? (
        <SwapBPTDiv>get BPT and stake for APY</SwapBPTDiv>
      ):(
        <ApyWrapDiv>
          <ApyStakeDiv> {`${0}% APY (STAKE)`}</ApyStakeDiv>
          <ApyYieldDiv> {`${apy.toFixed(0)}% APY (YIELD)`}</ApyYieldDiv>
        </ApyWrapDiv>
      )}

      <ExpandContainerDiv>
        <ActionButton
          type="GET"
          title={title}
          onlyLocking={onlyLocking}
          onClick={handleLock}
        />
        <ActionButton
          type="DEPOSIT"
          title={title}
          onlyLocking={onlyLocking}
          onClick={handleStake}
        />

        <ExpandBtnSpan name="expand-btn" onClick={open ? () => handleCollapseContent("default") : undefined}>
          {open ? 'Collapse' : 'Expand'}
          <Img
            src="/img/arrow-nav.svg"
            alt="arrow"
          />
        </ExpandBtnSpan>
      </ExpandContainerDiv>
    </CollapseTriggerDiv>
  )
}

export default CollapseTrigger
