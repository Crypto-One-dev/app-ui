const UserInfoContainerDiv = styled.div`
    padding: 30px 0 30px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
 
 &:last-child {
  border-bottom: none;
}
`

const FlexBetweenDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

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

const BlueColorSpan = styled.span`
  color: #08a4f5;
`

const Opacity5Div = styled.div`
opacity: 0.5;
padding-top: 3px;
`

const WrapBoxMB15Div = styled.div`
  background: #0d0d0d;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;

  margin-bottom: 15px;

  & > * {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    color: #ffffff;
  }
`

const WrapBoxGrayDiv = styled.div`
  border: 1px solid rgba(100, 100, 100, 0.498039);
  box-sizing: border-box;
  border-radius: 6px 0px 0px 6px;
  display: flex;
  justify-content: space-between;
  width: 421px;
  height: 35px;
  padding: 8px 24px;
  width: 300px !important;

    ${({ theme }) => theme.mediaWidth.upToMedium`
        width: 100% !important;
  `}

    @media screen and (min-width: 370px) and (max-width: 445px) {
        padding: 8px 5px;
    }
  
  width: ${({ width }) => width && width};
`

const NumberInput = styled.input`
  background: transparent;
  border: transparent;
  width: 80%;
  color: #ffffff;
`
const SetUnfreezeSpan = styled.div`
    opacity: 0.75;
    cursor: pointer;

    display: flex;
    align-items: center;
`

const WrapBoxGradientDiv = styled.div`
  position: relative;
  padding: 8px 10px;
  width: 160px;
  height: 35px;
  text-align: center;
  border-radius: 6px;

  cursor: pointer;

    ${({ theme }) => theme.mediaWidth.upToMedium`
        width: 371px;
    `}
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
 
const WrapBoxFluidDiv = styled.div`
  position: relative;
  padding: 8px 0;
  width: 160px;
  height: 35px;
  text-align: center;
  border-radius: 6px;

    &::before {
        content: "";
        border: 1px solid #ff0000;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 0px 6px 6px 0px;
    }
`

const FluidSpan = styled.span`
  width: 55px;
  height: 17px;
  font-style: normal;
  font-weight: normal;
  font-size: 9px;
  line-height: 20px;
  color: #ffffff;
  opacity: 0.5;

  @media screen and (min-width: 370px) and (max-width: 445px) {
      font-size: 7px;
  }

  @media screen and (max-width: 370px) {
      font-size: 5px;
  }
`

const HourSpan = styled.span`
  width: 84px;
  height: 20px;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  text-align: right;
  color: #ffffff;

  @media screen and (min-width: 370px) and (max-width: 445px) {
      font-size: 10px;
  }

  @media screen and (max-width: 370px) {
      font-size: 8px;
  }
`

const SubDescriptionDiv = styled.div`
  font-weight: 400;
  font-size: 10px;
  text-align: right;
  opacity: 0.5;
  margin-top: -8px;
  margin-bottom: 20px;
`

// implement the styled components.