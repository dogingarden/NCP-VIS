/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2019-06-19 17:09:39
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-03-20 13:52:48
 */
import styled from 'styled-components';
const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background:rgb(191, 191, 191);
    & .top-cont{
        position: absolute;
        text-align: center;
        width: 100%;
        top: 0px; 
        display:table;
    }
    & .bottom-cont{
        position: absolute;
        text-align: center;
        width: 100%;
        bottom: 0px; 
        display:table;
    }
    & .temp-date{
        margin-top:30px;
        padding: 0 20px;
        text-anchor: middle;
        alignment-baseline: middle;
        font-family: DIN-Medium;
        text-align: left;
        width: 100%;
        // display:table-cell;
        vertical-align:bottom;
    }
    
    & .temp-name{
        padding: 0 20px;
        text-anchor: middle;
        alignment-baseline: middle;
        font-family: SourceHanSerifCN-Bold;
        text-align: left;
        width: 100%;
        // display: table-row;
        vertical-align:bottom;
    }
    .temp-type-num{
        padding: 0 20px;
        text-anchor: middle;
        alignment-baseline: middle;
        font-family: DIN-Medium,SourceHanSerifCN-Bold;
        text-align: left;
        width: 100%;
        // display:table-cell;
        vertical-align:bottom;
    }
    & .temp-image{
        text-anchor: middle;
        alignment-baseline: middle;
        font-family: SourceHanSerifCN-Bold;
        text-align: center;
        width: 100%;
        display: table-cell;
        vertical-align:bottom;
    }
    & .temp-image img{
        float:right;
        margin:0 10px 10px 0;
    }
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