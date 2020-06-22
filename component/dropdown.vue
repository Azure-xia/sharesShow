<template>
  <div class="seo-dropdown">
    <a class="nav-item-link"
       href="https://www.kujiale.com/activity/136"
       target="_blank"
       data-kioid="客户端下载">{{dropHeader.name}}</a>
    <svg focusable="false"
         aria-hidden="false"
         viewBox="0 0 1024 1024"
         class="trigger">
      <path d="M832.267 277.333H189.46a21.333 21.333 0 00-17.685 33.259l306.09 453.76a21.333 21.333 0 0034.817.779L849.387 311.36a21.333 21.333 0 00-17.12-34.027z"></path>
    </svg>
    <div class="download-dropdown">
      <div class="download-dropdown-inner">
        <div>
          <a class="download-dropdown-item"
             href="dropItem.url"
             target="_blank"
             data-kioid="{{dorpItem.kioid}}"
             :key="dropItem.id"
             v-for="dropItem in dropItems">{{dropItem.name}}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return;
  },
  props: {

  }
}
</script>
<style scoped>
.seo-dropdown {
  position: relative;
  display: flex;
  align-items: center;
}
.seo-dropdown .download-dropdown {
  display: none;
  position: absolute;
  width: 136px;
  padding-top: 6px;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 100%);
}
.seo-dropdown:hover .download-dropdown {
  display: block;
}
.seo-dropdown .download-dropdown .download-dropdown-inner::before {
  position: absolute;
  display: block;
  width: 11px;
  height: 11px;
  content: "";
  background: #fff;
  top: -5.5px;
  transform: translateX(-50%) rotate(45deg);
  left: 50%;
  box-shadow: -3px -7px 6px 0 rgb(112, 152, 204, 0.16);
}
.seo-dropdown .download-dropdown .download-dropdown-inner {
  position: relative;
  border: 1px solid #f0f3f7;
  background: #fff;
  border-radius: 3px;
  font-family: Penrose, PingFang SC Regular, BaseFont;
  box-shadow: 0 0 6px 0 rgb(112, 152, 204, 0.16);
}
.download-dropdown-item {
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  color: rgb(102, 102, 102);
  font-size: 14px;
  position: relative;
}
.trigger {
  width: 11px;
  height: 11px;
  fill: rgb(109, 115, 133, 0.5);
  margin-left: 6px;
}
</style>