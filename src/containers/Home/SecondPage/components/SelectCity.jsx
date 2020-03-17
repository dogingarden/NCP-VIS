import React from 'react'
import createClass from 'create-react-class'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { FormattedMessage } from 'react-intl'
import messages from '../messages'
import { injectIntl } from 'react-intl';

const dot = (color = 'rgb(252, 212, 13)') => ({
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
const centerColor="#fcd40d";

const SelectCity = createClass({
  displayName: 'SelectCity',

  propTypes: {
    hint: PropTypes.string,
    label: PropTypes.string
  },
  getInitialState () {
    return {
      multi: false,
      multiValue: [],
      isClearable: true,
      value: undefined
    };
  },
  handleOnChange (value) {

    const { multi } = this.state;
    const { changeCenter } = this.props
    if (multi) {
      this.setState({ multiValue: value });
    } else {

      this.setState({ value });

      if(value===null){
        changeCenter(value)
      }else{
        changeCenter(value.value)
      }
    }
  },
  getOptions (data){
    let index
    const locale = this.props.intl.locale
    if(locale==='zh'){
      index=data.map(d=>{
        return  { value: d.city, label: d.city };
      })
    }else{
      index=data.map(d=>{
        return  { value: d.city, label: d.en };
      })
    }
    
    return index;
  },
  getSelectedCity(selectedCity, citiesData){
    const locale = this.props.intl.locale
    let selectItem
    if(locale==='zh'){
      citiesData.forEach(d=>{
        if(d.city===selectedCity.value){
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
  renderValue: function(option) {
    return <strong style={{ color: centerColor }}>{option.label}</strong>;
  },
  handleOnClose(){
    const { changeCenter } = this.props
    changeCenter(null)
  },
  handleScroll(e) {
    // 阻止合成事件的冒泡
    e.stopPropagation()
    // 阻止与原生事件的冒泡
    e.nativeEvent.stopImmediatePropagation()
  },
  render () {
    const { multi, multiValue, isClearable, value} = this.state
    const { citiesData , centerCity } = this.props

    const placeholder = <span><FormattedMessage {...messages.selectCity}/></span>
    let selectedCity
    if(centerCity!==value){
      selectedCity={ value: centerCity, label: centerCity }
    }else{
      selectedCity={ value: value, label: value }
    }

    if(centerCity===null){
      selectedCity=null
    }else{
      selectedCity=this.getSelectedCity(selectedCity, citiesData)
    }
    // console.log(selectedCity)
    return (
      <div id="select-city" width={500} 
        onWheel={ (e) => this.handleScroll(e) }
      >
        <Select
          multi={multi}
          options={this.getOptions(citiesData)}
          openMenuOnClick={true}
          pageSize={3}
          onChange={this.handleOnChange}
          value={multi ? multiValue : selectedCity}
          styles={colourStyles}
          isClearable={isClearable}
          placeholder={placeholder}
          valueRenderer={this.renderValue}
          onClose={this.handleOnClose}
        />
        <div className="hint">{this.props.hint}</div>
      </div>
    );
  }
});
export default injectIntl(SelectCity)