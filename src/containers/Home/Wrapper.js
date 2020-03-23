/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2019-06-19 17:09:39
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-03-23 12:30:26
 */
import styled from 'styled-components';
import bg from './images/virus-corona-2-scaled-big.jpg';
// import bgSmall from './images/virus-corona-2-scaled-small.jpg';

const Wrapper = styled.div`
    width:100%;
    height:100%;
    margin:0px;
    & .secondPageContainer{
        width:100%;
        height:100%;
    }
    & .section2 .fp-scroller{
        height:100%;
    }
    & .intro{

    }
    & #fistSlider{
        background-image: url(${bg});
        transform: translate(00%, 00%);  // 利用位移实现居中    
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    }
    & #fistSlider .intro{
        color: white;
        font-family: arial,helvetica;
        background: linear-gradient(to bottom,
            rgba(29, 29, 29,0.8) 0%,
            rgba(29, 29, 29,0.3) 50%,
            rgba(29, 29, 29,0.8) 100%);
    }
    & #fistSlider .intro h1{
        color: white;
    }
    @media screen and (max-width: 900px) {
        & #fistSlider{
            background-image:  sunset;
        }
    }
`;
export default Wrapper;