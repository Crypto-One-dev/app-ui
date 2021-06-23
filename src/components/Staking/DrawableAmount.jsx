import React from 'react'
import { getStayedNumber } from '../../utils/utils'

const DrawableAmount = ({
  withDrawable,
  withDrawableExit,
  title,
  titleExit,
  width
}) => {
  return (
    <div className={`wrap-box-gray ${width}`}>
      <span>{withDrawable > 0 ? `${getStayedNumber(withDrawable)} ${title}` : ''}</span>
      <span>{withDrawable > 0 && withDrawableExit > 0 ? '+' : ''}</span>
      <span>
        {withDrawableExit > 0 ? `${getStayedNumber(withDrawableExit)} ${titleExit}` : ''}
      </span>
    </div>
  )
}

export default DrawableAmount
