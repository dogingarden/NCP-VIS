/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2019-06-19 17:09:39
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-03-11 12:05:58
 */
import styled from 'styled-components';
const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    & .svgContainer{
        width: 100%;
        height: 100%;
    }
    & .switch-container{
        position: absolute;
        bottom: 20px;
        left: 13px;
        z-index:1000;
    }
    & .switch-container span{
        display: block;
    }
    @media screen and (max-width: 900px) {
        & .switch-container{
            left: 50%;
            transform: translateX(-50%);
            bottom: 5px;
        }
        
    }
`;

export default Wrapper;