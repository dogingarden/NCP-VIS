/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2019-06-19 17:09:39
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-03-11 22:02:37
 */
import styled from 'styled-components';
const ProcessWrapper = styled.div`
    position: absolute;
    text-align: center;
    vertical-align: middle;
    list-style: none; 
    padding: 0; 
    margin: 0; 
    left: 9%; 
    top: calc(20% + 330px);
    width: 300px;
    z-index:100;
    & .icon{
        fill: rgba(0,0,0,0.5);
        width: 25px;
        height: 25px;
    }
    .bar{
        padding-left: 10px;
        position: relative;
        left: 0px;
        display: inline-block;
        bottom: 5px;
        vertical-align: middle;
    }
    .button{
        display: inline-block; 
        margin:0 auto;
    }
    @media screen and (max-width: 900px) {
        position: absolute;
        transform: translateY(-130%);
        top: 100%;
        bottom: unset;
        left:unset;
        width: 100%;
        transition: all 1s ease-in;
        -webkit-transition: all .3s ease-in;
    }
    
`;

export default ProcessWrapper;