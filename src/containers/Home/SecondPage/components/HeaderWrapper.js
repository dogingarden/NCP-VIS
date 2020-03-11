/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2019-06-19 17:09:39
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-03-11 13:52:57
 */
import styled from 'styled-components';
const HeaderWrapper = styled.div`
    position: absolute;
    z-index:101;
    width: 100%;
    top:20%;
    left:10%;
    & #selectorcontainer { 
        width: 100%; 
        margin: auto auto; 
        position: relative;
    } 
    & #select-data{
        top:0px;
        left:0px;
        font-size:14px;
    }
    & #select-city{
        top:100px;
        left:0px;
    }
    & #select-province{
        top:150px;
        left:00px;
    }
    & #select-date{
        top:50px;
        left:0px;
    }
    & .menus{
        list-style: none; 
        padding: 0; 
        margin: 0; 
        display: inline-block; 
        position: absolute; 
        left: 0px; 
        top: 200px;
        width: 260px;
        font-size: 15px;
    }
    
    @media screen and (max-width: 900px) {
        top:0;
        left:0;
        & #selectorcontainer{
            top:40px;
        }
        #select-data{
            font-size:11px;
            left:20px;
            top:90px;
            transition: all 1s ease-in;
            -webkit-transition: all .3s ease-in;
        }
        & #select-city{
            margin:0 auto; 
            float:unset;
            left: unset;
            position: relative;
            top: unset;
            transition: all 1s ease-in;
            -webkit-transition: all .3s ease-in;
        }
        & #select-province{
            margin:0 auto; 
            display: inline-block;
            float:unset;
            left: unset;
            position: relative;
            top: unset;
            transition: all 1s ease-in;
            -webkit-transition: all .3s ease-in;
        }
        & #select-date{
            
            margin:0 auto; 
            float:unset;
            left: unset;
            position: relative;
            top: unset;
            top:-1px;
            transition: all 1s ease-in;
            -webkit-transition: all .3s ease-in;
        }
        & .menus{
            font-size: 11px;
            width: 300px;
            left: 150px;
            top: 70px;
            transition: all 1s ease-in;
            -webkit-transition: all .3s ease-in;
        }

        & .select-group{
            position: absolute;
            transform: translateX(-50%);
            transition: all 1s ease-in;
            -webkit-transition: all .3s ease-in;
            width: 100%;
            top: 160px;
            left: 50%;
            text-align:center;
            z-index: 101;
        }
        
    }
    
`;

export default HeaderWrapper;