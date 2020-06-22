/**股票列表是个数组，由股票对象组成。
 * 股票对象属性有序号index,名称name，代码code，涨幅increase,现价presentPrice，涨跌riseAndFall，成交量volume，
 * 成交额turnover，涨速increaseSpeed，换手changeHands，量比volumeRatio，今开todayPrice，最高highest，最低lowest，
 * 昨收yesterdayPrice，市盈率PER，振幅amplitude，委差deviation，委比Committee */

import {
    deepCopy
} from "./utils/utils.js";
const partShareList = [{
        name: "平安银行",
        code: "000001",
        increase: "0.22%",
        presentPrice: "13.62",
        riseAndFall: "0.03",
        volume: "585972",
        turnover: "8.02亿",
        increaseSpeed: "0.07%",
        changeHands: "0.30%",
        volumeRatio: "0.79",
        todayPrice: "13.68",
        highest: "13.85",
        lowest: "13.58",
        yesterdayPrice: "13.59",
        PER: "7.73",
        amplitude: "1.99%",
        deviation: "-506",
        Committee: "-2.53%",
    },
    {
        name: "万科A",
        code: "000002",
        increase: "0.72%",
        presentPrice: "26.60",
        riseAndFall: "0.19",
        volume: "709041",
        turnover: "18.9亿",
        increaseSpeed: "0.00%",
        changeHands: "0.73%",
        volumeRatio: "0.86",
        todayPrice: "26.59",
        highest: "26.85",
        lowest: "26.42",
        yesterdayPrice: "26.41",
        PER: "60.16",
        amplitude: "1.63%",
        deviation: "-1575",
        Committee: "-27.12%",
    },
    {
        name: "国农科技",
        code: "000004",
        increase: "-0.99%",
        presentPrice: "28.95",
        riseAndFall: "-0.29",
        volume: "12829",
        turnover: "3735万",
        increaseSpeed: "-0.34%",
        changeHands: "1.53%",
        volumeRatio: "0.57",
        todayPrice: "29.24",
        highest: "29.54",
        lowest: "28.95",
        yesterdayPrice: "29.24",
        PER: "313.07",
        amplitude: "2.02%",
        deviation: "-138",
        Committee: "-46.00%",
    },
];

function extendObj(arr, num) {
    let len = arr.length; //原数组的长度
    let n = Math.floor(num / len); //取整
    let m = num % len; //取余
    let shareList = []; //代构建的股票列表

    for (let i = 0; i < n; i++) {
        shareList.push(deepCopy(arr));
    }
    for (let i = 0; i < m; i++) {
        shareList.push(deepCopy(arr[i]));
    }
    shareList = shareList.flat(); //转换为一维数组
    shareList.map((item, index) => {
        item.index = index + 1;
        return item;
    });
    return shareList;
}
export default extendObj(partShareList, 300); //将数组扩展成4000个数据项