/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2019-06-19 17:09:39
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-03-07 00:29:22
 */
import styled from 'styled-components';
const ProcessWrapper = styled.div`
    position: absolute;
    text-align: center;
    vertical-align: middle;
    list-style: none; 
    padding: 0; 
    margin: 0; 
    left: 180px; 
    top: 520px;
    width: 300px;
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

        
    }
    
`;

export default ProcessWrapper;