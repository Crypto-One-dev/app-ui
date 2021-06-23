import React from 'react'
import styled from 'styled-components'

const UserInfoContainerDiv = styled.div`
  padding: 30px 0 30px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);

  &:last-child{
    border-bottom: none;
  }
`

const FlexBetweenDiv = styled.div`
  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    flex-direction: column;
  `}
`

const FrozenDescDiv = styled.div`
  max-width: 400px;
  font-family: "Monument Grotesk Semi";
  font-size: 12.5px;
  line-height: 15px;
  margin-bottom: 15px;
  color: #ffffff;
  
  &:p:first-child {
    padding-top: 0;
  }
  &:p {
    padding-top: 10px;
  }
`

const OpacityFiveP = styled.p`
  opacity: 0.5;
`

const WrapBoxDiv = styled.div`
  background: #0d0d0d;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;

  & > * {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    color: #ffffff;
  }
`

const WrapBoxGrayComplete = styled.div`
  border: 1px solid rgba(100, 100, 100, 0.498039);
  box-sizing: border-box;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  max-width: 400px;
  width: 420px;
  height: 35px;
  
  & > div {
    flex-basis: 50%;
    border-right: 1px solid rgba(100, 100, 100, 0.498039);
    padding: 8px 24px;
    text-align: center;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 20px;
  }

  & > div:last-child {
    border-right: none;
  }
`

const FluidFooterContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`

const FluidFooterDiv = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 9px;
  color: #ffffff;
  opacity: 0.5;
  display: flex;
  justify-content: space-between;
  max-width: 571px;
  width: 100%;
  float: right;
  margin-top: 4px !important;
  margin-bottom: 15px;

  & > div {
    flex-basis: 50%;
    text-align: center;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    max-width: 100% !important;
  `}

`

const WrapBoxFRDiv = styled(WrapBoxDiv)`
    float: right;
`

const WrapBoxGradientComplete = styled.div`
  position: relative;
  padding: 8px 10px;
  max-width: 571px;
  width: 100%;
  /* height: 35px; */
  text-align: center;

  &::before{
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

  // cont.

`
