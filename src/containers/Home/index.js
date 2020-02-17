/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2019-07-29 08:40:18
 * @LastEditors: konglingyuan
 * @LastEditTime : 2020-02-15 17:34:31
 */
import React from 'react'
import Wrapper from "./Wrapper";
import { FormattedMessage } from 'react-intl';
// import './fullpage/fullpage.scrollHorizontally.limited.min';
// import './fullpage/fullpage.extensions.min';
import ReactFullpage from '@fullpage/react-fullpage';
import messages from './messages';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from "reselect";
import { 
  loadData, 
  changeCenter, 
  selectProvince,
  resizeScreen ,
  selectDate
} from './actions'

import { 
  getLoading, 
  getFailed, 
  getCitiesData,
  getSvgWidth,
  getSvgHeight,
  getChinaTopoJson,
  getBgType,
  getDataType,
  getSelectProvince ,
  getCenterCity,
  getDates,
  getSelectedDate
} from './selectors'
import SecondPage from './SecondPage/Loadable';
import AboutUs from './AboutUs/Loadable';
import './styles.css';

const fullpageOptions = {
  anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage'],
  sectionsColor: [
    '#ff73a1',
    '#4BBFC3',
    '#7BAABE',
    '#aaaaaa',
    '#ccddff',
    '#ccc',
  ],
  callbacks: ['onLeave', 'afterLoad'],
  menu: '#menu',
  slidesNavigation: true,
  scrollOverflow: true,
  scrollingSpeed: 1000,
};

class Home extends React.PureComponent {
  componentWillMount() {
    this.props.loadData();
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   const { svgWidth, svgHeight } = this.props
  //   return svgWidth !== nextProps.svgWidth
  //       || svgHeight !== nextProps.svgHeight
        
  // }
  render() {
    const { citiesData,svgWidth,svgHeight,chinaTopoJson,bgType,dataType,selectProvince,centerCity,dates,selectedDate,
      selectedProvince,
      changeCenter,
      resizeScreen,
      selectDate
    } = this.props
    
    if (citiesData[0]) {
      return (
        <Wrapper>
          <ul id="menu">
            <li data-menuanchor="firstPage">
              <a href="#firstPage">
                <FormattedMessage {...messages.firstSlide} />
              </a>
            </li>
            <li data-menuanchor="secondPage">
              <a href="#secondPage">
                <FormattedMessage {...messages.secondSlide} />
              </a>
            </li>
            <li data-menuanchor="3rdPage">
              <a href="#3rdPage">
                <FormattedMessage {...messages.thirdSlide} />
              </a>
            </li>
            {/* <li data-menuanchor="4thpage">
              <a href="#4thpage">
                <FormattedMessage {...messages.fourthSlide} />
              </a>
            </li> */}
          </ul>
          <ReactFullpage
            {...fullpageOptions}
            render={() => (
              <div id="myContainer">
                <div className="section">
                  <div className="slide">
                    <div className="intro">
                      <h1>
                        <FormattedMessage {...messages.title} />
                      </h1>
                      <p>
                        <FormattedMessage {...messages.desc} />
                      </p>
                    </div>
                  </div>
                  {/* <div className="slide">
                    <h1>Slide 1.2</h1>
                  </div>
                  <div className="slide">
                    <h1>Slide 1.3</h1>
                  </div> */}
                </div>
                <div className="section section2">
                  <div className="secondPageContainer">
                    <SecondPage {...{citiesData,svgWidth,svgHeight,chinaTopoJson,bgType,dataType,dates,selectedDate,
                      selectedProvince,
                      selectProvince,
                      centerCity,
                      changeCenter,
                      resizeScreen,
                      selectDate
                    }}/>
                  </div>
                </div>
                <div className="section">
                  <div className="slide">
                    <div className="intro">
                      <AboutUs/>
                    </div>
                  </div>
                </div>
              </div>
            )}
          />
        </Wrapper>
      )
    } else {
      return (
        <Wrapper />
      )
    }

  }
}

Home.propTypes = {
}

const mapStateToProps = createStructuredSelector({
  loading: state => getLoading(state),
  failed: state => getFailed(state),
  citiesData: state => getCitiesData(state),
  svgWidth: state => getSvgWidth(state),
  svgHeight: state => getSvgHeight(state),
  chinaTopoJson: state => getChinaTopoJson(state),
  bgType: state => getBgType(state),
  dataType: state => getDataType(state),
  selectedProvince: state => getSelectProvince(state),
  centerCity: state => getCenterCity(state),
  dates: state => getDates(state),
  selectedDate: state => getSelectedDate(state)
})

const mapDispatchToProps = dispatch => ({
  loadData: () => {
    dispatch(loadData())
  },
  changeCenter: (city) => {
    dispatch(changeCenter(city))
  },
  selectProvince: (city) => {
    dispatch(selectProvince(city))
  },
  resizeScreen: (width,height) =>{
    dispatch(resizeScreen(width,height))
  },
  selectDate: (dates)=>{
    dispatch(selectDate(dates))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
