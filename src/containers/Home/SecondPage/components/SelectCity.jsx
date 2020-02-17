import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';

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
      options: [
        { value: '北京', label: '北京' },
        { value: '天津', label: '天津' },
        { value: '上海', label: '上海' },
        { value: '杭州', label: '杭州' },
      ],
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
      changeCenter(value.value)
    }
  },
  getOptions (data){
    let index=data.map(d=>{
      return  { value: d.city, label: d.city };
    })
    return index;
  },
  renderValue: function(option) {
    return <strong style={{ color: centerColor }}>{option.label}</strong>;
  },
  render () {
    

    const { multi, multiValue } = this.state;
    const {centerCity, citiesData} = this.props;
    const selectedCity={ value: centerCity, label: centerCity };
    return (
      <div  id="select-city" width={500}>
    
        <Select
          multi={multi}
          options={this.getOptions(citiesData)}
          // options={options}
          openMenuOnClick={true}
          pageSize={3}
          onChange={this.handleOnChange}
          // valueRenderer={this.renderValue}
          value={multi ? multiValue : selectedCity}
        />
        {/* <div className="hint">{this.props.hint}</div> */}
        
      </div>
    );
  }
});
export default SelectCity;