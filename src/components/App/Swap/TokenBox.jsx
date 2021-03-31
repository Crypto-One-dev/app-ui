import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Flex, Box, Image } from 'rebass/styled-components';
import styled from 'styled-components';
import { InputAmount } from '.';
import { newFormatAmount } from '../../../utils/utils';
import { ButtonMax } from '../Button';
import CurrencyLogo from '../Currency';
import { Type } from '../Text';

const Wrapper = styled.div`
    position: relative;
    height: ${({ height }) => (height || "90px")};
    width: ${({ width }) => (width || "100%")};
    background: #1c1c1c;
    border: 2px solid #000000;
    padding:0 15px;
    border-radius: ${({ borderRadius }) => borderRadius || "15px"};
`
const TokenInfo = styled(Flex)`
align-items:center;
margin-left:8px;
&:hover{
  filter:brightness(0.8)  
}
`


const TokenBox = ({ hasMax, currency }) => {
    const [onMax, setOnMax] = useState(false)
    const [inputAmount, setInputAmount] = useState("")

    useEffect(() => {
        if (inputAmount === currency?.balance) {
            setOnMax(true)
        } else {
            setOnMax(false)
        }
    }, [inputAmount])

    return (<Wrapper  >
        <Flex
            p="10px 0"
            justifyContent={"space-between"}
        >
            <Box>
                <Type.SM color={'secodery'}>
                    From
                </Type.SM>
            </Box>
            <Box>
                <Type.SM color={'secodery'}>
                    Balance: {newFormatAmount(currency?.balance)}
                </Type.SM>
            </Box>
        </Flex>

        <Flex
            justifyContent="space-between"
            alignItems="center"
            mt="5px"
            style={{
                cursor: "pointer"
            }}
        >
            <InputAmount placeholder="0.0" value={inputAmount} onChange={(e) => setInputAmount(e.currentTarget.value)} />

            {hasMax && !onMax && <ButtonMax width={"40px"}
                onClick={() => setInputAmount(currency.balance)}>
                MAX
            </ButtonMax>}

            <TokenInfo>
                <CurrencyLogo
                    style={{ verticalAlign: "middle" }}
                    currency={currency}
                    size={"25px"}
                />
                <Type.LG color="text1" ml="1" mr="2">BUSD</Type.LG>
                <Image src="/img/select.svg" size="15px" />
            </TokenInfo>
        </Flex>

    </Wrapper>);
}

export default TokenBox;