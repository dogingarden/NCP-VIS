/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2019-06-19 17:09:39
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-02-21 14:42:58
 */
import styled from 'styled-components';
const ProcessWrapper = styled.div`
    position: absolute;
    list-style: none; 
    padding: 0; 
    margin: 0; 
    display: inline-block; 
    left: 200px; 
    top: 480px;
    width: 270px;
    & .icon{
        fill: rgb(24, 86, 163);
        width: 20px;
        height: 20px;
    }
    .bar{
        padding-left: 10px;
        position: relative;
        left: 0px;
        display: inline-block;
        bottom: 5px;
    }
    .button{
        display: inline-block; 
        margin:0 auto;
    }
    @media screen and (max-width: 900px) {
        & {
            left:unset;
            top:90px;
            transition: all 1s ease-in;
            -webkit-transition: all .3s ease-in;
        }
        
    }
    
`;

export default ProcessWrapper;