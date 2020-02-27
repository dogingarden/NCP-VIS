import React, {  Component } from 'react';
import CountyMap from './CityMap';
import RadialMap from './RadialMap';

class Background extends Component {
	// shouldComponentUpdate(nextProps, nextState) {
    //     const { centerCity } = this.props
    //     console.log(centerCity)
    //     return centerCity !== nextProps.centerCity && (centerCity===null||nextProps.centerCity===null)
    // }
    render() {
		const {width,height,bgType,centerCity}=this.props

    	if (bgType==="GEO"){

	    	if (!this.props.chinaTopoJson) {
	            return null;
	        }else{
		        return (
		            <CountyMap chinaTopoJson={this.props.chinaTopoJson}
                            x={0}
                            y={0}
                            {...{width, height}}/>  
		        );
	    	}

	    }
	    if (bgType==="RADIAL"){
	    	return(
	    		<RadialMap  x={0}
	                        y={0}
	                        {...{width, height,centerCity}}/>  
	    	);
	    }
    }
}

// Background.propTypes = {
//     bfType: PropTypes.number.isRequired
// };

export default Background;
