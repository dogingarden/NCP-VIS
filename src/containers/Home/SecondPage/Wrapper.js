/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2019-06-19 17:09:39
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-03-07 00:55:23
 */
import styled from 'styled-components';
const Wrapper = styled.div`
    width:100%;
    height:100%;
    margin:0px;
    font-size: 11px;
    background: radial-gradient(ellipse at center, 
        rgba(211, 211, 211,0.8) 0%,
        rgba(190, 190, 190,0.8) 47%,
        rgba(174, 174, 174,0.6) 100%);
	text-align: center;
	padding:0 !important;
    
    
    
    & select { position: absolute; right: 0px; top: 924px; }
    & a:hover { color: #F9786C; text-decoration: underline; }	
    & li { text-align: left; }
    & li span { display: inline-block; text-align: right; margin-right: 5px; }
    & .active { color: #000; font-weight: bold; text-decoration: none; cursor: default; }
    & .active:hover { text-decoration: none; color: #000; }
    
    & #about { position: absolute; top: 924px; right: 0; font-size: 9px; }
    & #about a, #about a:link, #about a:active { font-weight: normal; text-decoration: none; cursor: pointer; color: #000; }
    & #about a:hover { 
        color: #F9786C; 
    }

    & h1 { font-size: 32px; margin-bottom: 10px;    
        font-weight: bold;
    }	
    & h2 { font-size: 18px; margin-top: 0; margin-bottom: 0; font-weight: bold;
            -webkit-margin-before: 0.43em;
            -webkit-margin-after: 0.43em;
            -webkit-margin-start: 0px;
            -webkit-margin-end: 0px;
        }
    & h4 { margin: 0 auto; font-weight: normal; width: 500px;font-size: 11px;display: block;
    }
    & h3 { float:left; font-weight: normal; font-size: 16px;display: inline-block;
    }
    & div{
        text-align: center;
    }
`;
export default Wrapper;