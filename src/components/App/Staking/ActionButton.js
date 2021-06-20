import React from 'react'
import styled from 'styled-components'

const Span1 = styled.span`
  border-radius: 6px;
  color: #fff;
  display: inline-block;
  padding: 1px;
  text-decoration: none;
  margin: 0 3px 5px;
  border: none;
  cursor: pointer;
  
  background: ${({ type, onlyLocking }) => type === 'GET' ? (onlyLocking ? 'linear-gradient(90 deg, #08a4f5 -0.01%, #2bede3 93.42%)' : '"#ec357a"') : 'linear-gradient(247.41deg, #a2fbb0 16.32%, #5ec4d6 87.6%)'};
  opacity: ${({ title, type }) => title === 'BPT' && type === 'LOCK' && 0};

  ${({ theme }) => theme.mediaWidth.upToLarge`
    margin: 0 3px 3px;
  `}

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0 1px 3px;
  `}
`

const Span2 = styled.span`
  background: #0d0d0d;
  display: block;
  padding-top: 2px;
  border-radius: 6px;
  width: 150px;
  height: 35px;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    font-size: 10.5px;
    width: 100px;
    height: 30px;
  `}

  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 9px;
    width: 85px;
    height: 28px;
  `}

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-size: 10px;
    width: 100px;
    height: 28px;
  `}

  background: ${({ onlyLocking }) => onlyLocking && "#2d2f35 !important"};
  &:hover {
    background: ${({ type, onlyLocking }) => type === 'GET' ? (onlyLocking ? 'linear-gradient(90deg, #08a4f5 -0.01%, #2bede3 93.42%), linear-gradient(247.41deg, #a2fbb0 16.32%, #5ec4d6 87.6%) !important' : '#ec357a !important') : 'linear-gradient(247.41deg, #a2fbb0 16.32%, #5ec4d6 87.6%) !important'};
    color: ${({ type, onlyLocking }) => type === 'GET' ? (onlyLocking ? '#000' : '#fff') : '#000'};
  }
`

const ActionButton = (props) => {
  const { type, title, onlyLocking, onClick } = props
  return (
    <Span1 onClick={(e) => onClick(e)}>
      <Span2>
        {type === 'STAKE' && onlyLocking ? 'GET BPT' : `${type} ${title}`}
      </Span2>
    </Span1>
  )
}

export default ActionButton
