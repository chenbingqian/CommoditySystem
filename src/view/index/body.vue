<!--
作者：MR.LI - 李天玉
时间：2017-09-27
描述：路由body页
-->
<template>
  <div >
    <div class="kiki_sticky clearfix">
      <div class="sticky_main">
        <vheader ref="vheader"></vheader>
        <div class="kiki_cont">
        	<router-view keep-alive>
          </router-view>
        </div>
      </div>
    </div>
    <!--Loading展示-->
    <div class="fade-transition ivu-modal-mask loading" id="global-spin">
      <Spin class="div_window" fix>
        <Icon type="load-c" size=33 class="demo-spin-icon-load"></Icon>
        <div class="demo-text">Loading</div>
      </Spin>
    </div>
  </div>
</template>

<script>
  import vheader from '@/components/vheader/vheader';

  export default {
    data() {
      return {

      };
    },
    components: {
      vheader
    }, 
    methods: {
    }
  }
</script>

<style>
  .ivu-modal-mask.loading {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55, 55, 55, 0.3)!important;
    height: 100%;
    z-index: 1000;
    display: none;
  }
  .demo-text{
    color: #0F95AC;
  }
  .div_load{
    color: #0F95AC;
  }
  .demo-spin-icon-load{
    color: #0F95AC;
  }
  .div_window {
    width: 400px !important;
    height: 300px !important;
    position: fixed !important;
    left: 50% !important;
    top: 50% !important;
    margin-top: -150px;
    margin-left: -250px;
    background-color: rgba(220, 220, 220, 0) !important;
  }
</style>
