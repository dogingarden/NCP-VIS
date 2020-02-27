/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2019-06-19 17:09:39
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-02-26 10:23:14
 */
import styled from 'styled-components';
const HeaderWrapper = styled.div`
    position: absolute;
    z-index:100;
    width: 100%;
    & #selectorcontainer { width: 100%; margin: auto auto; position: relative;} 
    & #select-data{
        top:200px;
        left:200px;
    }
    & #select-city{
        top:300px;
        left:200px;
    }
    & #select-province{
        top:350px;
        left:200px;
    }
    & #select-date{
        top:250px;
        left:200px;
    }
    & .menus{
        list-style: none; 
        padding: 0; 
        margin: 0; 
        display: inline-block; 
        position: absolute; 
        left: 200px; 
        top: 400px;
        width: 260px;
    }
    
    @media screen and (max-width: 900px) {
        & #selectorcontainer{
            top: 40px;
        }
        #select-data{
            left:20px;
            top:90px;
            transition: all 1s ease-in;
            -webkit-transition: all .3s ease-in;
        }
        & #select-city{
            margin:0 4px;
            float:left;
            left: unset;
            position: relative;
            top: unset;
            transition: all 1s ease-in;
            -webkit-transition: all .3s ease-in;
        }
        & #select-province{
            margin:0 4px;
            float:left;
            left: unset;
            position: relative;
            top: unset;
            transition: all 1s ease-in;
            -webkit-transition: all .3s ease-in;
        }
        & #select-date{
            margin:0 4px;
            float:left;
            left: unset;
            position: relative;
            top: unset;
            transition: all 1s ease-in;
            -webkit-transition: all .3s ease-in;
        }
        & .menus{
            width: 300px;
            left: 150px;
            top: 70px;
            transition: all 1s ease-in;
            -webkit-transition: all .3s ease-in;
        }
        & .process{
            position: absolute;
            transform: translateX(-50%);
            top:200px;
            transition: all 1s ease-in;
            -webkit-transition: all .3s ease-in;
        }
        & .select-group{
            position: absolute;
            transform: translateX(-50%);
            transition: all 1s ease-in;
            -webkit-transition: all .3s ease-in;
            width: 390px;
            top: 150px;
            left: 50%;
            text-align:center;
            z-index: 101;
        }
        
    }
    
`;

export default HeaderWrapper;