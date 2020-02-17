/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2019-06-19 17:09:39
 * @LastEditors: konglingyuan
 * @LastEditTime : 2020-02-15 17:18:03
 */
import styled from 'styled-components';
const HeaderWrapper = styled.div`
    position: absolute;
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
    }
    
    @media screen and (max-width: 900px) {
        #select-data{
            left:20px;
            top:100px;
            transition: all 1s ease-in;
            -webkit-transition: all .3s ease-in;
        }
        & #select-city{
            left:20px;
            top:200px;
            transition: all 1s ease-in;
            -webkit-transition: all .3s ease-in;
        }
        & #select-province{
            left:20px;
            top:250px;
            transition: all 1s ease-in;
            -webkit-transition: all .3s ease-in;
        }
        & #select-date{
            top:150px;
            left:20px;
        }
        & .menus{
            left:20px;
            top:300px;
            transition: all 1s ease-in;
            -webkit-transition: all .3s ease-in;
        }
        
    }
    
`;

export default HeaderWrapper;