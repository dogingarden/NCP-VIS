/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-01-07 14:03:39
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-03-06 16:26:39
 */
const combineData = function(data){
    let dates=[]
    let arr = ["city_confirmedCount","city_curedCount","city_deadCount","GDP","POP","hospital","bed","doctor"]
    let maxValue = {'day_inc': 0}
    arr.forEach(d=>{
        maxValue[d]=0
    })
    data.forEach(d=>{
        if(dates.indexOf(d.date)<0){
            dates.push(d.date)
        }
        arr.forEach(item=>{
            if(maxValue[item] < ~~d[item]){
                maxValue[item] = d[item]
            }
        })
    })
    dates=dates.sort((a,b)=>{
        return ~~a - ~~b
    })
    let showData=[]
    dates.forEach((date)=>{
        let tempArr={date, data:[]}
        let tempData=[]
        data.forEach(d=>{
            // if(~~d.cum_dx > 0 && d.date===date){
            if( d.date===date){
                tempData.push(d)
            }
        })

        tempArr.data = tempData.sort((a,b)=>{
            return a.province.localeCompare(b.province,"zh");
        })
        
        showData.push(tempArr)
    })
    showData.forEach((tempArr,i)=>{
        tempArr.data.forEach((d,cityI)=>{
            if(i===0){
                d.day_inc = 0
            }else{
                d.day_inc = d['city_confirmedCount']-showData[i-1].data[cityI]['city_confirmedCount']
            }
            //获取每日新增的最大值
            if(maxValue['day_inc'] < d.day_inc){
                maxValue['day_inc'] = d.day_inc
            }
            //序号
            d.index = cityI
            d.arrLength = tempArr.data.length
        })
    })
    //一个是选中 一个是全部
    let datesObj = {selected: dates[0], all: dates}
    return {data: showData, dates: datesObj, maxValue}
}
//根据中心城市、展示类别选出用于时间轴上展示的数据
const getTimelineData=function( centerCity, dataType, allData){
    let showData=[]
    allData.forEach(d=>{
        let temp={ value:0 }
        temp.date=d.date
        let filterResult = d.data.filter(d=>{
            return d.city===centerCity
        })
        if(filterResult.length>0){
            temp.value=filterResult[0][dataType]
        }else{
            temp.value=0
        }
        showData.push(temp)
    })
    return showData
}
export { combineData, getTimelineData }