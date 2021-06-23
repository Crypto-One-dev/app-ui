import React from 'react'
import styled from 'styled-components'
import useWeb3 from '../../../helper/useWeb3'
import ExitModal from '../../Staking/ExitModal'
import { validChains } from '../../Staking/Data'
import ToggleButtons from '../../Staking/ToggleButtons'
import { injected } from '../../../connectors'
import { useWeb3React } from '@web3-react/core'
import { sendTransaction } from '../../../utils/Stakefun'
import { getTransactionLink } from '../../../utils/explorers'
import { FlexCenter } from '../Container';

const BackBtnDiv = styled.div `
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 20px;
  text-align: right;
  color: #ffffff;
  cursor: pointer;
`

const DepositContainerDiv = styled.div`
    width: 100%;
    max-width: 415px;
    display: flex;
    flex-direction: column;
    margin: 60px auto 0;
  & > * {
    margin-bottom: 10px;
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    width: 100%;
    margin: 60px auto 0;
  `}
`

const VaultExitDiv = styled.div`
  background: #0d0d0d;
  border: 1px solid rgba(0, 209, 108, 0.5);
  border-radius: 100px;
  display: block;
  width: 100%;
  height: 35px;
  padding: 10px 21px;
  display: flex;
  justify-content: space-between;

`

const VaultExitTitleDiv = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 12.5px;
  line-height: 14px;
  color: #ffffff;

  @media screen and (max-width: 370px) {
    font-size: 10px;
  }
`

const VaultExitBtn = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  text-align: right;

  @media screen and (max-width: 370px) {
    font-size: 10px;
  }
`

const OffBtnSpan = styled.span`
  color: rgba(255, 85, 85);
  text-transform: uppercase;
  cursor: pointer;

  opacity: ${({ exitBtn }) => exitBtn && 0.25};
`

const OnBtnSpan = styled.span`
  color: #00d16c;
  padding-left: 10px;
  text-transform: uppercase;;
  cursor: pointer;

  opacity: ${({ exitBtn }) => !!!exitBtn && 0.25};
`

const BalanceWalletP = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  padding: 0 21px;
  color: rgba(255, 255, 255, 0.5);
`

const GrayBoxDiv = styled.div`
  border: 1px solid rgba(100, 100, 100, 0.498039);
  box-sizing: border-box;
  border-radius: 6px;
  width: 100%;
  height: 35px;
  padding: 10px 21px;

  display: flex;
  justify-content: space-between;

  & > *{
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    color: #ffffff;
  }
`

const InputTransparentInput = styled.input`
  background: transparent;
  border: transparent;
  width: 80%;
  color: #ffffff;
`

const PointerSpan = styled.span`
  cursor: pointer;
`

const ContractBoxDiv = styled.div`
  border: 1px solid rgba(100, 100, 100, 0.498039);
  box-sizing: border-box;
  border-radius: 6px;
  width: 100%;
  height: 35px;
  text-align: center;
  justify-content: center;
  align-items: center;
  display: flex;
`

const ShowContractA = styled.a`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);

  cursor: pointer;
`

const Div1 = styled.div`
  display: flex;
  justify-content: ${({ approve, approveClick }) => approve === 0 ? 'space-between' : (approveClick ? 'space-between' : 'center')};
`

const Div2 = styled.div`
  width: 190px;
  height: 35px;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 21px;
  padding: 7px;
  text-align: center;
  text-transform: uppercase;
  border-radius: 6px;
  cursor: pointer;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin: 0 3px;
  `}

  color: ${({ approveClick }) => !approveClick ? "#000000 !important" : "rgba(255, 255, 255, 0.5)" };
  background: ${({ approveClick }) => !approveClick ? "linear-gradient(90deg, #08a4f5 -0.01%, #2bede3 93.42%), linear-gradient(247.41deg, #a2fbb0 16.32%, #5ec4d6 87.6%) !important" : "#1c1c1c"};
`

const Div3 = styled.div`
  width: 190px;
  height: 35px;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 21px;
  padding: 7px;
  text-align: center;
  text-transform: uppercase;
  border-radius: 6px;
  cursor: pointer;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin: 0 3px;
  `}

  color: ${({ approve }) => approve ? "#000000 !important" : "rgba(255, 255, 255, 0.5)" };
  background: ${({ approve }) => approve ? "linear-gradient(90deg, #08a4f5 -0.01%, #2bede3 93.42%), linear-gradient(247.41deg, #a2fbb0 16.32%, #5ec4d6 87.6%) !important" : "#1c1c1c"};
`

const WrongNetworkSpan = styled.span`
  background: linear-gradient(90deg, #08a4f5 -0.01%, #2bede3 93.42%);
  border-radius: 6px;
  color: #ffffff;
  display: inline-block;
  padding: 1px;
  text-decoration: none;
  margin: 0 3px;

  &:span {
    background: #0d0d0d;
    display: block;
    border-radius: 6px;
    width: 100%;
    height: 35px;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const WrapBoxGradientComplete = styled.div`
  position: relative;
  padding: 8px 10px;
  max-width: 571px;
  width: 100%;
  text-align: center;

  max-width: 415px !important;
  width: 100%;

  cursor: pointer;

  &::before {
  content: "";
  border: 1px solid transparent;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 6px;
  background: linear-gradient(90deg, #08a4f5 -0.01%, #2bede3 93.42%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    max-width: 100% !important;
  `}
`

const WrapStep = styled(FlexCenter)`
  margin-top:10px;
`

const CycleNumber = styled(FlexCenter)`
width:20px;
height:20px;
border-radius:20px;
background: ${({ theme, active }) => active ? "linear-gradient(90deg, #08a4f5 -0.01%, #2bede3 93.42%)" : theme.border1};
color: ${({ theme, active }) => active ? theme.text1_2 : theme.text1};
z-index: 0;
font-size:12px;
margin:0 -1px;
`

const Line = styled.div`
background: ${({ theme }) => "linear-gradient(90deg, #08a4f5 -0.01%, #2bede3 93.42%)"};
height: 2px;
width: 50%;
`

const Deposit = (props) => {
  const {
    title,
    stakeType,
    lockStakeType,
    balanceWallet,
    stakingContract,
    StakedTokenContract,
    StakeAndYieldContract,
    exit,
    owner,
    chainId,
    approve,
    handleBack,
    exitable,
    yieldable
  } = props

  const web3React = useWeb3React()
  const web3 = useWeb3()
  const { activate } = web3React
  const [open, setOpen] = React.useState(false)
  const [selectedStakeType, setSelectedStakeType] = React.useState(stakeType)
  const [stakeAmount, setStakeAmount] = React.useState('')
  const [exitBtn, setExitBtn] = React.useState(exit)
  const [approveClick, setApproveClick] = React.useState(false)
  React.useEffect(() => {
    setSelectedStakeType(stakeType)
    setExitBtn(exit)
  }, [owner, chainId, exit, stakeType])

  const chooseTypeStake = (e) => {
    console.log(e.target.value);
    setSelectedStakeType(e.target.value)
  }

  const handleConnect = async () => {
    try {
      await activate(injected)
    } catch (error) {
      console.log(error)
    }
  }

  const handleApprove = () => {
    try {
      if (!owner) {
        return
      }
      if (approve || approveClick) {
        return
      }
      let amount = web3.utils.toWei('1000000000000000000')
      sendTransaction(
        StakedTokenContract,
        `approve`,
        [stakingContract, amount],
        owner,
        chainId,
        `Approved ${title}`
      ).then(() => {
        setApproveClick(true)
      })
    } catch (error) {
      console.log('error happened in Approve', error)
    }
  }
  const handleStake = () => {
    try {
      if (!owner) {
        return
      }
      if (stakeAmount === '0' || stakeAmount === '') return
      if (approve || approveClick) {
        let amount = web3.utils.toWei(stakeAmount)
        let type = '3'
        sendTransaction(
          StakeAndYieldContract,
          `deposit`,
          [amount, type, exitBtn],
          owner,
          chainId,
          `Staked ${stakeAmount} ${title}`
        ).then(() => {
          setStakeAmount('0')
        })
      }
    } catch (error) {
      console.log('error happened in Stake', error)
    }
  }
  const handleVaultExit = (data) => {
    if (lockStakeType) {
      return
    }
    setExitBtn(data)
  }
  console.log(selectedStakeType);
  return (
    <>
      <BackBtnDiv>Back</BackBtnDiv>
      <DepositContainerDiv>
        <ToggleButtons
        // TODO: use SC method instead
          classes="width-unset"
          data={[
            {
              title: 'STAKE & YIELD',
              value: '3',
              tooltip: 'Earn double rewards with Yearn Finance ',
              disabled: yieldable ? false : true
            },
          ]}
          handleSelectedButton={chooseTypeStake}
          name={`Stake-Yield-${title}`}
          defaultChecked={'3'}
          lockStakeType={lockStakeType}
        />
        {exitable && (
          <VaultExitDiv>
            <VaultExitTitleDiv>Vault Exit</VaultExitTitleDiv>
            <VaultExitBtn>
              <OffBtnSpan exitBtn={exitBtn} onClick={() => handleVaultExit(false)}> OFF </OffBtnSpan>
              <OnBtnSpan
                exitBtn={exitBtn}
                onClick={() => {if (lockStakeType) {return} setOpen(true) }}>ON
              </OnBtnSpan>
            </VaultExitBtn>
          </VaultExitDiv>
        )}

        <div>
          <BalanceWalletP>
            {`${title} Balance: ${balanceWallet}`}
          </BalanceWalletP>
        </div>

        <GrayBoxDiv>
          <InputTransparentInput
            type="number"
            value={stakeAmount}
            placeholder={`0 ${title}`}
            onChange={(e) => setStakeAmount(e.target.value)}
          />
          <PointerSpan onClick={() => setStakeAmount(balanceWallet)}>
            MAX
          </PointerSpan>
        </GrayBoxDiv>
        <ContractBoxDiv>
          <ShowContractA
            href={getTransactionLink(chainId, stakingContract)}
            target="_blink"
          >
            Show me the contract
          </ShowContractA>
        </ContractBoxDiv>

        {owner ? (
          validChains.includes(chainId) ? (
            <>
              <Div1 approve={approve} approveClick={approveClick}>
                {approve === 0 ? (
                  <Div2 approveClick={approveClick} onClick={handleApprove}>
                    Approve
                  </Div2>
                ) : (
                  approveClick && (
                    <Div2 approveClick={approveClick} onClick={handleApprove}>
                      Approve
                    </Div2>
                  )
                )}
                <Div3 approve={approve} onClick={handleStake}>
                  stake
                </Div3>
              </Div1>
              {approve === 0 ? (
                <WrapStep>
                    <CycleNumber active={true}>1</CycleNumber>
                    <Line></Line>
                    <CycleNumber active={approveClick}>2</CycleNumber>
                </WrapStep>
              ) : (
                approveClick && (
                  <WrapStep>
                    <CycleNumber active={approveClick}>1</CycleNumber>
                    <Line></Line>
                    <CycleNumber active={true}>2</CycleNumber>
                </WrapStep>
                )
              )}
            </>
          ) : (
            <WrongNetworkSpan>
              <span>Wrong Network</span>
            </WrongNetworkSpan>
          )
        ) : (
          <WrapBoxGradientComplete onClick={handleConnect}>
            <div>connect wallet</div>
          </WrapBoxGradientComplete>
        )}
        <ExitModal
          open={open}
          hide={() => setOpen(!open)}
          handleOn={() => {
            setExitBtn(true)
            setOpen(!open)
          }}
          handleOff={() => {
            setExitBtn(false)
            setOpen(!open)
          }}
        />

      </DepositContainerDiv>
    </>
  )
}

export default Deposit

// upToExtraSmall: 500,
// upToSmall: 720,
// upToMedium: 960,
// upToLarge: 1280