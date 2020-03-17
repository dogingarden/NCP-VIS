import React from 'react'
import createClass from 'create-react-class'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { FormattedMessage } from 'react-intl'
import messages from '../messages'
import { injectIntl } from 'react-intl'

const dot = (color = 'rgb(204, 224, 151)') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});
const colourStyles = {
  
  input: styles => ({ ...styles, ...dot() }),
  placeholder: styles => ({ ...styles, ...dot() }),
  singleValue: (styles) => ({ ...styles, ...dot() }),
  clearIndicator:  (provided) => ({
    ...provided,
    padding: 0
  }),
  dropdownIndicator:  (provided) => ({
    ...provided,
    padding: 0
  }),
};
const provinceColor="#cce097";

const SelectProvince = createClass({
  displayName: 'SelectProvince',
  propTypes: {
    hint: PropTypes.string,
    label: PropTypes.string
  },
  getInitialState () {
    return {
      multi: false,
      multiValue: [],
      isClearable: true,
      optionsData: [
        { value: '北京', label: '北京', en:'Beijing' },
        { value: '天津', label: '天津', en:'Tianjin' },
        { value: '河北', label: '河北', en:'Hebei' },
        { value: '山西', label: '山西', en:'Shanxi' },
        { value: '内蒙古', label: '内蒙古', en:'Neimenggu' },
        { value: '辽宁', label: '辽宁' , en:'Liaoning'},
        { value: '吉林', label: '吉林' , en:'Jilin'},

        { value: '黑龙江', label: '黑龙江' , en:'Heilongjiang'},
        { value: '上海', label: '上海', en:'Shanghai' },
        { value: '江苏', label: '江苏', en:'Jiangsu' },
        { value: '浙江', label: '浙江', en:'Zhejiang' },
        { value: '安徽', label: '安徽' , en:'Anhui'},
        { value: '福建', label: '福建' , en:'Fujian'},
        { value: '江西', label: '江西', en:'Jiangxi' },

        { value: '山东', label: '山东' , en:'Shandong'},
        { value: '河南', label: '河南', en:'Henan' },
        { value: '湖北', label: '湖北', en:'Hubei' },
        { value: '湖南', label: '湖南' , en:'Hunan'},
        { value: '广东', label: '广东', en:'Guangdong' },
        { value: '广西', label: '广西' , en:'Guangxi'},
        { value: '海南', label: '海南' , en:'Hainan'},

        { value: '重庆', label: '重庆' , en:'Chongqing'},
        { value: '四川', label: '四川' , en:'Sichuan'},
        { value: '贵州', label: '贵州' , en:'Guizhou'},
        { value: '云南', label: '云南' , en:'Yunnan'},
        { value: '西藏', label: '西藏' , en:'Xizang'},
        { value: '陕西', label: '陕西' , en:'Shaanxi'},
        { value: '甘肃', label: '甘肃' , en:'Gansu'},

        { value: '青海', label: '青海' , en:'Qinghai'},
        { value: '宁夏', label: '宁夏' , en:'Ningxia'},
        { value: '新疆', label: '新疆' , en:'Xinjiang'},
        { value: '台湾', label: '台湾', en:'Taiwan' },
        { value: '澳门', label: '澳门' , en:'Macau'},
        { value: '香港', label: '香港' , en:'Hongkong'}
      ],
      value: undefined
    };
  },
  getSelectedCity(selectedCity, citiesData){
    const locale = this.props.intl.locale
    let selectItem
    if(locale==='zh'){
      citiesData.forEach(d=>{
        if(d.city===selectedCity.value){
          console.log({ value: d.city, label: d.city })
          selectItem = { value: d.city, label: d.city };
        }
      })
    }else{
      citiesData.forEach(d=>{
        if(d.city===selectedCity.value){
          selectItem = { value: d.city, label: d.en };
        }
        
      })
    }
    return selectItem
  },
  handleOnChange (value) {
    const { selectProvince } = this.props
    const { multi, multiValue } = this.state;
    if (multi) {
      this.setState({ multiValue: [].concat(multiValue, value) });
    } else {
      this.setState({ value })
      if(value===null){
        selectProvince(value)
      }else{
        selectProvince(value.value)
      }
      
    }
  },
  handleOnClose(){
    const { selectProvince } = this.props
    selectProvince(null)
  },
  getOptions (data){

    let index
    const locale = this.props.intl.locale
    if(locale==='zh'){
      index=data.map(d=>{
        return  { value: d.value, label: d.value };
      })
    }else{
      index=data.map(d=>{
        return  { value: d.value, label: d.en };
      })
    }
    return index;
  },
  renderValue: function(option) {
    return <strong style={{ color: provinceColor }}>{option.label}</strong>;
  },
  handleScroll(e) {
    // 阻止合成事件的冒泡
    e.stopPropagation();
    // 阻止与原生事件的冒泡
    e.nativeEvent.stopImmediatePropagation();
  },
  render () {
    const { multi, multiValue, optionsData, value, isClearable} = this.state;
    const placeholder = <span><FormattedMessage {...messages.selectProvince}/></span>;
    return (
      <div id="select-province" width={500} 
        onWheel={(e) => this.handleScroll(e)}
      >
        <Select
          isMulti={multi}
          pageSize={3}
          options={this.getOptions(optionsData)}
          onChange={this.handleOnChange}
          onClose={this.handleOnClose}
          value={multi ? multiValue : value}
          placeholder={placeholder}
          valueRenderer={this.renderValue}
          isClearable={isClearable}
          styles={colourStyles}
        />
        <div className="hint">{this.props.hint}</div>
      </div>
    );
  }
});
export default injectIntl(SelectProvince)