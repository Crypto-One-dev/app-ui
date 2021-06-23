import React from 'react'
import styled from 'styled-components'
import { getStayedNumber } from '../../../utils/utils'

const WrapBoxGrayDiv = styled.div`
  border: 1px solid rgba(100, 100, 100, 0.498039);
  box-sizing: border-box;
  border-radius: 6px 0px 0px 6px;
  display: flex;
  justify-content: space-between;
  width: 421px;
  height: 35px;
  padding: 8px 24px;
  width: ${({ width }) => width && width};
`

const DrawableAmount = ({
  withDrawable,
  withDrawableExit,
  title,
  titleExit,
  width
}) => {
  return (
    <WrapBoxGrayDiv width={width}>
      <span>{withDrawable > 0 ? `${getStayedNumber(withDrawable)} ${title}` : ''}</span>
      <span>{withDrawable > 0 && withDrawableExit > 0 ? '+' : ''}</span>
      <span>
        {withDrawableExit > 0 ? `${getStayedNumber(withDrawableExit)} ${titleExit}` : ''}
      </span>
    </WrapBoxGrayDiv>
  )
}

export default DrawableAmount

