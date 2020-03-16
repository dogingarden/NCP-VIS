import React from 'react'
import createClass from 'create-react-class'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { FormattedMessage } from 'react-intl'
import messages from '../messages'

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
      options: [
        { value: '北京', label: '北京' },
        { value: '天津', label: '天津' },
        { value: '河北', label: '河北' },
        { value: '山西', label: '山西' },
        { value: '内蒙古', label: '内蒙古' },
        { value: '辽宁', label: '辽宁' },
        { value: '吉林', label: '吉林' },

        { value: '黑龙江', label: '黑龙江' },
        { value: '上海', label: '上海' },
        { value: '江苏', label: '江苏' },
        { value: '浙江', label: '浙江' },
        { value: '安徽', label: '安徽' },
        { value: '福建', label: '福建' },
        { value: '江西', label: '江西' },

        { value: '山东', label: '山东' },
        { value: '河南', label: '河南' },
        { value: '湖北', label: '湖北' },
        { value: '湖南', label: '湖南' },
        { value: '广东', label: '广东' },
        { value: '广西', label: '广西' },
        { value: '海南', label: '海南' },

        { value: '重庆', label: '重庆' },
        { value: '四川', label: '四川' },
        { value: '贵州', label: '贵州' },
        { value: '云南', label: '云南' },
        { value: '西藏', label: '西藏' },
        { value: '陕西', label: '陕西' },
        { value: '甘肃', label: '甘肃' },

        { value: '青海', label: '青海' },
        { value: '宁夏', label: '宁夏' },
        { value: '新疆', label: '新疆' },
        { value: '台湾', label: '台湾' },
        { value: '澳门', label: '澳门' },
        { value: '香港', label: '香港' }
      ],
      value: undefined
    };
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

    let index=data.map(d=>{
      return  { value: d.city, label: d.city };
    })
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
    const { multi, multiValue, options, value, isClearable} = this.state;
    const placeholder = <span><FormattedMessage {...messages.selectProvince}/></span>;
    return (
      <div id="select-province" width={500} 
        onWheel={(e) => this.handleScroll(e)}
      >
        <Select
          isMulti={multi}
          pageSize={3}
          options={options}
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
export default SelectProvince;