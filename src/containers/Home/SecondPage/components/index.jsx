
import React from 'react';
import Background from './Background';
import CircleMap from './Circle';
import Header from './Header';
import Wrapper from './Wrapper'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.myRef=React.createRef()
        this.resize.bind(this)
    }
    screenChange(){
        window.addEventListener('resize', this.resize);
    }
    resize=() => {
        const { resizeScreen } = this.props
        const width = this.myRef.current.clientWidth
        const height = this.myRef.current.clientHeight
        resizeScreen(width, height)
    }
    componentDidMount() {
        this.screenChange()
        this.resize()
    }
    componentWillUnmount(){
        window.removeEventListener('resize',this.resize);
    }

    render() {
        const { dataType,bgType,centerCity,citiesData,chinaTopoJson, 
            changeCenter, svgWidth, svgHeight,dates,selectDate,selectedDate,
            selectProvince,
            selectedProvince
            } = this.props
        const width=svgWidth
        const height=svgHeight
        
        return (
          <Wrapper >
              <Header 
                  { ...{citiesData, centerCity, changeCenter, selectProvince ,bgType, dataType,dates,selectedDate,selectDate}}/>

              <div className="svgContainer" ref={this.myRef}>
                <svg {...{width,height}} >
                  
                    <Background {...{chinaTopoJson,bgType}}
                        {...{width,height}}
                    />            
                    <CircleMap  {...{citiesData, bgType, dataType, centerCity , selectedProvince, chinaTopoJson, selectedDate}}
                        handleChangeCernter = {changeCenter}
                        x={0}
                        y={0}
                        {...{width,height}}
                        />
                </svg> 
              </div>
          </Wrapper>
        );
    }
}


export default App;