<template>
  <div class="list-table">
    <div class="table">
      <div class="theader">
        <span>序号</span>
        <span>名称</span>
        <span>代码</span>
        <span>
          涨幅<i @click="setOrderParam('asc', 'increase')">↑</i
          ><i @click="setOrderParam('desc', 'increase')">↓</i>
        </span>
        <span>
          现价<i @click="setOrderParam('asc', 'presentPrice')">↑</i
          ><i @click="setOrderParam('desc', 'presentPrice')">↓</i>
        </span>
        <span>
          涨跌<i @click="setOrderParam('asc', 'riseAndFall')">↑</i
          ><i @click="setOrderParam('desc', 'riseAndFall')">↓</i>
        </span>
        <span>
          成交量<i @click="setOrderParam('asc', 'volume')">↑</i
          ><i @click="setOrderParam('desc', 'volume')">↓</i>
        </span>
        <span>
          成交额<i @click="setOrderParam('asc', 'turnover')">↑</i
          ><i @click="setOrderParam('desc', 'turnover')">↓</i>
        </span>
        <span>
          涨速<i @click="setOrderParam('asc', 'increaseSpeed')">↑</i
          ><i @click="setOrderParam('desc', 'increaseSpeed')">↓</i>
        </span>
        <span>
          换手<i @click="setOrderParam('asc', 'changeHands')">↑</i
          ><i @click="setOrderParam('desc', 'changeHands')">↓</i>
        </span>
        <span>
          量比<i @click="setOrderParam('asc', 'volumeRatio')">↑</i
          ><i @click="setOrderParam('desc', 'volumeRatio')">↓</i>
        </span>
        <span>
          今开<i @click="setOrderParam('asc', 'todayPrice')">↑</i
          ><i @click="setOrderParam('desc', 'todayPrice')">↓</i>
        </span>
        <span>
          最高<i @click="setOrderParam('asc', 'highest')">↑</i
          ><i @click="setOrderParam('desc', 'highest')">↓</i>
        </span>
        <span>
          最低<i @click="setOrderParam('asc', 'lowest')">↑</i
          ><i @click="setOrderParam('desc', 'lowest')">↓</i>
        </span>
        <span>
          昨收<i @click="setOrderParam('asc', 'yesterdayPrice')">↑</i
          ><i @click="setOrderParam('desc', 'yesterdayPrice')">↓</i>
        </span>
        <span>
          市盈率<i @click="setOrderParam('asc', 'PER')">↑</i
          ><i @click="setOrderParam('desc', 'PER')">↓</i>
        </span>
        <span>
          振幅<i @click="setOrderParam('asc', 'amplitude')">↑</i
          ><i @click="setOrderParam('desc', 'amplitude')">↓</i>
        </span>
        <span>
          委差<i @click="setOrderParam('asc', 'deviation')">↑</i
          ><i @click="setOrderParam('desc', 'deviation')">↓</i>
        </span>
        <span>
          委比<i @click="setOrderParam('asc', 'Committee')">↑</i
          ><i @click="setOrderParam('desc', 'Committee')">↓</i>
        </span>
      </div>
      <div class="tbody" id="scrollDiv" tabindex="1">
        <div
          v-for="share in filterShareList"
          :key="share.index"
          class="tbody-item"
        >
          <span>{{ share.index }}</span>
          <span>{{ share.name }}</span>
          <span>{{ share.code }}</span>
          <span :class="colorCls(share.increase, 0)">{{ share.increase }}</span>
          <span :class="colorCls(share.increase, 0)">{{
            share.presentPrice
          }}</span>
          <span :class="colorCls(share.riseAndFall, 0)">
            {{ share.riseAndFall }}
          </span>
          <span class="yellowCls">{{ share.volume }}</span>
          <span class="yellowCls">{{ share.turnover }}</span>
          <span :class="colorCls(share.increaseSpeed, 0)">
            {{ share.increaseSpeed }}
          </span>
          <span>{{ share.changeHands }}</span>
          <span>{{ share.volumeRatio }}</span>
          <span>{{ share.todayPrice }}</span>
          <span>{{ share.highest }}</span>
          <span>{{ share.lowest }}</span>
          <span>{{ share.yesterdayPrice }}</span>
          <span>{{ share.PER }}</span>
          <span>{{ share.amplitude }}</span>
          <span :class="colorCls(share.deviation, 0)">{{
            share.deviation
          }}</span>
          <span :class="colorCls(share.Committee, 0)">{{
            share.Committee
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      order: "", //升序或降序
      key: "", //对应股票当前排序的键值
      intervalTime: null, //循环事件标志
      target: null, //当前鼠标滑过的目标对象
    };
  },
  computed: {
    shareList() {
      //股票数组
      return this.$store.state.shareList;
    },
    filterShareList() {
      //排序后的股票数组
      let shareList = [...this.shareList];
      if (this.order !== "") {
        if (this.order === "desc") {
          //降序
          shareList = shareList.sort((a, b) => {
            return parseFloat(a[this.key]) - parseFloat(b[this.key]);
          });
        } else if (this.order === "asc") {
          //升序
          shareList = shareList.sort((a, b) => {
            return parseFloat(b[this.key]) - parseFloat(a[this.key]);
          });
        }
      }
      return shareList;
    },
  },
  methods: {
    getShareList() {
      //通过vuex,模拟ajax异步获得股票列表
      this.$store.dispatch("getShareList").then(() => {
        this.autoScroll(); //添加自动滚动效果
      });
    },
    colorCls(val, ref) {
      //当前数据的颜色展示
      return {
        whiteClr: parseFloat(val) === ref,
        redCls: parseFloat(val) > ref,
        greenCls: parseFloat(val) < ref,
      };
    },
    setOrderParam(order, key) {
      //设置排序参数
      this.key = key;
      this.order = order;
    },
    autoScroll() {
      //自动滚动函数
      if (this.intervalTime) {
        clearInterval(this.intervalTime);
      }
      let len = this.shareList.length;
      let time = 500;
      if (len > 3000) {
        time = 100 / 3;
      }
      let scrollTop = $(".tbody").scrollTop();
      this.intervalTime = setInterval(function() {
        $(".tbody").animate(
          {
            scrollTop: scrollTop + "px",
          },
          time
        );
        scrollTop += 30;
      }, time);
    },
    handleScroll(e) {
      //滚动事件执行函数
      let that = this;
      let elm = document.getElementsByClassName("tbody");
      let height = elm[0].clientHeight + elm[0].scrollTop;
      let scrollHeight = elm[0].scrollHeight;
      if (height >= scrollHeight) {
        //滚动到底
        clearInterval(this.intervalTime);
        return;
      }
    },
    handleMouseout(e) {
      $("#scrollDiv")
        .children()
        .removeClass("highlight");
      this.autoScroll();
      $("#scrollDiv").on("scroll", this.handleScroll);
    },
  },
  mounted() {
    let that = this;
    $("#scrollDiv").on("scroll", this.handleScroll); //滚动事件
    $("#scrollDiv").on("mouseover", ".tbody-item", function() {
      //鼠标滑过事件
      if (that.intervalTime) {
        clearInterval(that.intervalTime);
      }
      $("#scrollDiv").unbind("scroll");
      let index = $(this).index();
      that.target = $(this);
      $("#scrollDiv")
        .children()
        .removeClass("highlight");
      $($("#scrollDiv div")[index]).addClass("highlight");
    });
    $("#scrollDiv").keydown(function(e) {
      //键盘按下事件
      if (e && e.keyCode === 38) {
        //up
        $(that.target).removeClass("highlight"); //删除当前元素样式
        that.target = $(that.target).prev(); //上一个元素
        $(that.target).addClass("highlight");
      } else if (e && e.keyCode === 40) {
        //down
        $(that.target).removeClass("highlight"); //删除当前元素样式
        that.target = $(that.target).next(); //下一个元素
        $(that.target).addClass("highlight");
      }
    });
    $("#scrollDiv").on("mouseleave", this.handleMouseout); //鼠标离开事件
    this.getShareList();
  },
  destroyed() {
    $("#scrollDiv .tbody-item").unbind();
    $("#scrollDiv").unbind();
    if (this.intervalTime) {
      clearInterval(this.intervalTime);
    }
  },
};
</script>
<style scoped>
.list-table {
  margin: 40px auto 0;
  width: 91%;
  height: 518px;
  background: rgb(33, 33, 46);
}
.theader,
.tbody {
  color: #fff;
  width: 100%;
}
.tbody {
  overflow: hidden;
  height: 500px;
}
.tbody-item {
  width: 100%;
  cursor: pointer;
}
.theader span {
  display: inline-block;
  font-weight: 100;
  font-size: 14px;
  width: 62px;
  text-align: center;
}
.theader span i {
  cursor: pointer;
  font-style: normal;
}
.tbody span {
  display: inline-block;
  font-weight: normal;
  font-size: 14px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  width: 62px;
}
.whiteClr {
  color: #fff;
}
.redCls {
  color: #dc143c;
}
.greenCls {
  color: #2e8b57;
}
.yellowCls {
  color: #ffd700;
}
.highlight {
  background: blue;
}
</style>
