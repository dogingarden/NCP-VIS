/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2019-06-19 17:09:39
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-03-19 23:32:43
 */
import styled from 'styled-components';
const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background:rgb(191, 191, 191);
    & .svgContainer{
        width: 100%;
        height: 100%;
        background:rgb(191, 191, 191);
    }
    & .switch-container{
        position: absolute;
        bottom: 20px;
        left: 13px;
        z-index:1000;
    }
    & .screenshot-container{
        position: absolute;
        bottom: 20px;
        right: 13px;
        z-index:1000;
    }
    & .switch-container span{
        display: block;
    }
    & .axislabel{
        font-size: 14px;
    }
    @media screen and (max-width: 900px) {
        & .switch-container{
            left: 50%;
            transform: translateX(-50%);
            bottom: 5px;
        }
        & .axislabel{
            font-size: 9px;
        }
    }
`;

export default Wrapper;