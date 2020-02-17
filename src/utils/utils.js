/*
 * @Author: konglingyuan
 * @Description: A Vue/React Project File
 * @Date: 2020-01-07 14:03:39
 * @LastEditors: konglingyuan
 * @LastEditTime: 2020-01-07 14:15:51
 */
const combineData = function(data){
    let dates=[]
    data.forEach(d=>{
        if(dates.indexOf(d.date)<0){
            dates.push(d.date)
        }
    })
    dates=dates.sort((a,b)=>{
        return ~~a - ~~b
    })
    let showData=[]
    dates.forEach((date)=>{
        let tempArr={date,data:[]}
        data.forEach(d=>{
            if(~~d.cum_dx > 0 && d.date===date){
                tempArr.data.push(d)
            }
        })
        showData.push(tempArr)
    })
    //一个是选中 一个是全部
    let datesObj={selected:dates[0],all:dates}
    return {data:showData,dates: datesObj}
}
export {combineData}