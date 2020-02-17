import styled from 'styled-components';
import flags from './flags.png';

const Wrapper = styled.div`
  position: absolute;
  left: 20px;
  top: 14px;
  z-index: 99;
  opacity: 1;
  & .language-current {
    color: #004f69;
    margin: 15px 0 6px 15px;
    z-index: 99;
    cursor: pointer;
  }
  & .flag-zh,
  & .flag-cn {
    background-position: 0 0;
  }
  & .flag {
    width: 35px;
    height: 24px;
    display: inline-block;
    margin: 0 17px 0 0;
    vertical-align: middle;
    background-image: url(${flags});
  }
  & .flag-en {
    background-position: -35px 0;
  }
  & .language.active .language-triangle {
    fill: #004f69;
  }
  & .language-triangle {
    position: absolute;
    top: 22px;
    left: 3px;
    fill: #fff;
    height: 6px;
    width: 8px;
  }
  & .languages {
    display: none;
    border-radius: 15px;
    background-color: #fff;
    padding: 46px 0 15px 0;
    position: relative;
    margin-top: -46px;
    z-index: -1;
  }
  .active {
    display: block;
  }
`;

export default Wrapper;
