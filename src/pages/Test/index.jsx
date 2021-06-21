import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
& > div ,& > button {
    display: inline-block;
    text-align: center;
    max-width:500px;
    max-height:100px;
    vertical-align:middle;
    margin:10px 20px;
}
`

const Test = () => {
    return (<Wrapper>

    </Wrapper>);
}

export default Test;