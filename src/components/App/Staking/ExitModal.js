import React from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components'

const CloseDiv = styled.div`
  color: white;
  position: absolute;
  top: 3px;
  right: 10px;
  font-size: 28px;
  font-weight: bold;

  &:hover, &:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
  }
`

const ModalContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "Monument Grotesk";
  font-weight: 300;
  align-items: center;
  text-align: justify;
  flex-direction: column;
`

const ExitModalTitleSpan = styled.span`
  font-family: "Monument Grotesk";
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
  margin-bottom: 30px;
`
const ExitModalContentDiv = styled.div`
  max-width: 435px;
  width: 100%;

  & > p {
    margin-bottom: 20px;
    font-family: "Monument Grotesk";
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    color: #ffffff;
    opacity: 0.5;
  }
`

const DescBtnYesP = styled.p`
  color: #00d16c !important;
  opacity: 1 !important;
`

const DescBtnNoP = styled.p`
  color: #ff5555 !important;
  opacity: 1 !important;
`

const FlexBetweenDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

const BtnYesDiv = styled.div`
  height: 40px;
  background: rgba(0, 209, 108, 0.2);
  border: 1px solid #00d16c;
  border-radius: 6px;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  max-width: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #00d16c;
  margin: 0 5px;
  cursor: pointer;
`

const BtnYesDiv = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  max-width: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #ff5555;
  height: 40px;
  border: 1px solid #ff5555;
  background: rgba(255, 85, 85, 0.2);
  border-radius: 6px;
  margin: 0 5px;
  cursor: pointer;
`

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
    maxWidth: '550px',
    width: '80%',
    background: '#2D2F35',
    border: '1px solid #000000',
    borderRadius: '10px',
    padding: '50px 50px 20px'
  }
}
const ExitModal = (props) => {
  const { open, hide, handleOff, handleOn } = props
  return (
    <ReactModal
      isOpen={open}
      style={customStyles}
      closeTimeoutMS={200}
      onRequestClose={hide}
      shouldCloseOnOverlayClick={true}
    >
      <CloseDiv onClick={hide}>
        &times;
      </CloseDiv>
      <ModalContentDiv>
        <ExitModalTitleSpan>
          Are you sure you want to exit the Vaults?
        </ExitModalTitleSpan>
        <ExitModalContentDiv>
          <p>
            Initiating "Exit Vault" will release your stake evenly over the
            course of a set period of days (currently set to 75 days), and your
            farming rewards will diminish by the same rate (currently set to
            1/75 per day).
          </p>
          <p>
            For example, if you exit the vault now with a sDEA balance of 75,
            then after 24 hours, your sDEA balance will be 74, your DEA balance
            will be 1, and your farming rewards will diminish by 1/75. After
            another 24 hours, your sDEA balance will be 73, your DEA balance
            will be 2, and your farming rewards will diminished by 2/75. And so
            on.
          </p>

          <DescBtnYesP>
            YES, I want to exit, I agree to unlocking my tokens in the schedule
            outlined above, and I agree to diminishing my staking returns.
          </DescBtnYesP>

          <DescBtnNoP>
            No, I want to stay in the Vaults, continue earning trading fees, and
            support the DEUS ecosystem.
          </DescBtnNoP>
          <FlexBetweenDiv>
            <BtnYesDiv onClick={handleOn}>YES</BtnYesDiv>
            <BtnNoDiv onClick={handleOff}>NO</BtnNoDiv>
          </FlexBetweenDiv>
        </ExitModalContentDiv>
      </ModalContentDiv>
    </ReactModal>
  )
}

export default ExitModal
