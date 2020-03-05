/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2019-06-19 17:09:39
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-03-05 22:10:49
 */
import styled from 'styled-components';
const ProcessWrapper = styled.div`
    position: absolute;
    list-style: none; 
    padding: 0; 
    margin: 0; 
    display: inline-block; 
    left: 200px; 
    top: 490px;
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

        
    }
    
`;

export default ProcessWrapper;