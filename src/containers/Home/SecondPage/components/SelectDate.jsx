import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
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
    width: 0,
  },
});
// const colourStyles = {
  
//   input: styles => ({ ...styles, ...dot() }),
//   placeholder: styles => ({ ...styles, ...dot() }),
//   singleValue: (styles) => ({ ...styles, ...dot() }),
//   clearIndicator:  (provided) => ({
//     ...provided,
//     padding: 0
//   }),
//   dropdownIndicator:  (provided) => ({
//     ...provided,
//     padding: 0
//   }),
// };
const centerColor="#fcd40d";
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
const SelectDate = createClass({
  displayName: 'SelectDate',

  propTypes: {
    hint: PropTypes.string,
    label: PropTypes.string
  },
  getInitialState () {
    return {
      multi: false,
      multiValue: [],
      value: undefined
    };
  },
  handleOnChange (value) {

    const { multi } = this.state;
    const { selectDate} = this.props
    if (multi) {
      this.setState({ multiValue: value });
    } else {
      this.setState({ value })
      selectDate(value.value)
    }
  },
  getOptions (data){
    let index=data.map(d=>{
      return  { value: d, label: d };
    })
    return index;
  },
  renderValue: function(option) {
    return <strong style={{ color: centerColor }}>{option.label}</strong>;
  },
  handleScroll(e) {
    // 阻止合成事件的冒泡
    e.stopPropagation();
    // 阻止与原生事件的冒泡
    e.nativeEvent.stopImmediatePropagation();
  },
  
  render () {
    

    const { multi, multiValue } = this.state;
    const { dates, selectedDate } = this.props;
    const seDate={ value: selectedDate, label: selectedDate };
    return (
      <div id="select-date" width={500} 
        onWheel={(e) => this.handleScroll(e)}
      >
    
        <Select
        
          multi={multi}
          styles={colourStyles}
          options={this.getOptions(dates)}
          openMenuOnClick={true}
          onChange={this.handleOnChange}
          value={multi ? multiValue : seDate}
        />
        {/* <div className="hint">{this.props.hint}</div> */}
        
      </div>
    );
  }
});
export default SelectDate;