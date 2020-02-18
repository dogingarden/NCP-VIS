import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';

const centerColor="#fcd40d";
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
  render () {
    

    const { multi, multiValue } = this.state;
    const { dates, selectedDate } = this.props;
    const seDate={ value: selectedDate, label: selectedDate };
    return (
      <div  id="select-date" width={500}>
    
        <Select
          multi={multi}
          options={this.getOptions(dates)}
          // options={options}
          openMenuOnClick={true}
          onChange={this.handleOnChange}
          // valueRenderer={this.renderValue}
          value={multi ? multiValue : seDate}
        />
        {/* <div className="hint">{this.props.hint}</div> */}
        
      </div>
    );
  }
});
export default SelectDate;