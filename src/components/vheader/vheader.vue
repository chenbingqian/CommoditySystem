<template>
  <div class="content_box_sel_div">
    <!--菜单头部-->
    <div class="kiki_header unified_Color">
      <div class="kiki_header_stl">
        <span class="text">PC操作系统</span>
        <div  class="img_ic_div" @click="goIndex()">
          <Tooltip content="切换到首页" placement="right">
            <img class="img_ic"  src="../../../static/image/header/switch.svg"  alt="返回首页">
          </Tooltip>
        </div>
      </div>
    </div>
    <!--菜单显示-->
    <div class="h_le_menu">
      <div class="btn-sel" ref="menuBoxTwo_s">
        <div class="kiki_content_sel h_le_menu">
          <Row>
            <Col>
              <Menu theme="dark"  accordion>
                 <div v-for="(OneMenus,i) in operationMenus">
                   <Submenu :key="'1-1'+i" :name="'1-'+i">
                     <template slot="title">
                       <img class="svg" :src="OneMenus.icon.default" height="22"/>&nbsp;&nbsp;<span class="content_span_two">{{OneMenus.names}}</span>
                     </template>
                     <template  v-for="(twoMenus,k) in OneMenus.subMenus">
                       <MenuItem @click.native="openPage(twoMenus)" :name="'1-'+ twoMenus.index"><span>{{twoMenus.name}}</span></MenuItem>
                     </template>
                   </Submenu>
                 </div>
              </Menu>
            </Col>
          </Row>
        </div>
      </div>
      <div class="kiki_footer"></div>
    </div>
    <!--tab切换-->
    <div class="nav-tab" ref="tab">
    	<!--
        	时间：2018-06-15
        	描述： 控制左侧菜单是否显示
        -->
      <div class="icon_div unified_Color_Sel" @click="leMenuSAH(1)" v-if="att">
        <img class="img_ic return_l" src="../../../static/image/header/rightarrow.svg" alt="">
      </div>
      <div class="icon_div unified_Color_Sel" @click="leMenuSAH(2)" v-if="att1">
        <img class="img_ic return_l" src="../../../static/image/header/leftarrow1.svg" alt="">
      </div>
       <!--
      	时间：2018-06-15
      	描述：当tab页打开太多时，出现左箭头切换tab页
      -->
      <div @click="arrow('left')"  v-show="arrowLeft">
        <Icon  class="arrow arrow-left"   type="arrow-left-b"></Icon>
      </div>
      
      <div class="nav" :style="{left:srollLeft*200+'px'}">
        <template v-for="menu in menus">
          <a @click="switchTab(menu)" :class="[menu.selected?'selected':'']">
            {{menu.name}}
            <div @click.stop="closeTab(menu)"><Icon class="tab-close"  type="android-close"></Icon></div>
          </a>
        </template>
      </div>
       <!--
      	时间：2018-06-15
      	描述：当tab页打开太多时，出现右箭头切换tab页
      -->
      <div @click="arrow('right')"  v-show="arrowRight">
        <Icon  class="arrow arrow-right"  type="arrow-right-b"></Icon>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
	import mockDate from '@/common/mockDate';
    export default{
        data(){
            return{
            	operationMenus: [],
              arrowLeft: false,
              arrowRight: false,
              srollLeft: 0,
              menus: [],
              isFalse:'',
              att:true,
              att1:false
            }
        },
        /**
         * 菜单数据
         * @param {Object} header
         */
        created() {
        	// 初始化菜单数据
          this.operationMenus = mockDate.vheaderDate.operationMenus;      
        },
        /**
         * 菜单数据
         * @param {Object} header
         */
        mounted () {
          this.arrowRight = this.menus.length > Math.floor(document.body.clientWidth / 200);
          let self = this;
          window.addEventListener('resize', function(e) {
            self.arrowRight = self.srollLeft + self.menus.length > Math.floor(document.body.clientWidth / 200);
          });
          if(this.menus.length == 0){
            let menu = {
              name: this.$route.name,
              selected: true,
              routePath: this.$route.path,
              routePathMark: this.$route.path
            };
            this.menus.push(menu);
          }
          this.$router.afterEach((transition) => {
            if(transition.path === '/xIndex') {
              this.isFalse = '/xIndex';
              return;
            }
            let tabName = transition.name;
            let menu = {
              name: tabName,
              selected: true,
              routePath: transition.path,
              routePathMark: transition.path
            };
            if(!this.menus.some(item => item.routePathMark === menu.routePathMark)) {
              this.menus.push(menu);
            }
            this.setTabSeleced(menu.routePathMark);
          });
        },
        /**
         * 菜单监听
         * @param {Object} header
         */
        watch: {
          srollLeft() {
            this.arrowLeft = this.srollLeft < 0;
            this.arrowRight = this.srollLeft + this.menus.length > Math.floor(document.body.clientWidth / 200);
          }
        },
        methods:{
        	/**
        	 *  切换到初始页
        	 */
          goIndex(){
            this.$router.push('/');
          },
          /**
           *  跳转页面
           */
          openPage(item) {
            this.$router.push(item.routerName);
          },
          /**
           * 左右滑动箭头
           * @param {Object} arrow left、right
           */
          arrow(arrow) {
            if(arrow === 'left') {
              this.srollLeft++;
            } else {
              this.srollLeft--;
            }
          },
          /**
           * 菜单显示
           *  	index 1 显示菜单，2不显示菜单
           * @param {Object} header
           */
          leMenuSAH(index) {
             let dom = document.getElementsByClassName('kiki_cont');
             //设置  menuBoxTwo_s 左侧菜单样式，控制是否显示
             this.$refs.menuBoxTwo_s.style.left = index == 1 ? 0 : '-270px';
             // 显示菜单
             if(index == 1){ 
               //Tab增加动画样式
               this.$refs.tab.style.marginLeft = '240px';
               this.$refs.tab.style.transition = "all 1.1s";
               this.$refs.tab.style.WebkitTransition = "all 1.1s";
               this.att1 = true;
               this.att = false;
               //主体增加样式
               dom[0].style.marginLeft = '240px';
               dom[0].style.transition = "all 1.2s";
               dom[0].style.WebkitTransition = "all 1.2s";
             }else {
             	 // 不显示菜单
               this.$refs.tab.style.marginLeft = '0px';
               dom[0].style.marginLeft = '0px';
               this.att1 = false;
               this.att = true;
             }
          },
          /**
           * 关闭tab
           * @param {Object} header
           */
          closeTab(menu) {
            if(menu.name != undefined){
              let _index = 0;
              let routePath = '';
              this.menus.map((item, index) => {
                if(item.routePathMark === menu.routePathMark) {
                  _index = index;
                }
              });
              this.menus.splice(_index,1);
              if(this.menus.length === 0) {
                this.goIndex();
                return;
              }
              if(menu.selected) {
                if(_index === this.menus.length) {
                  routePath = this.menus[_index -1].routePath;
                } else {
                  routePath = this.menus[_index].routePath;
                }
                this.$router.push(routePath);
              }
            }else {
              let _indexOne = 0;
              this.menus.map((item, index) => {
                if(item.routePathMark == menu.routePathMark) {
                  _indexOne = index;
                }
              });
              this.menus.splice(_indexOne,1);
            }
          },
         
          /**
           * 切换tab
           * @param {Object} header
           */
          switchTab(menu) {
            if(menu.selected) {
              this.setTabSeleced(menu.routePathMark);
            }
            this.$router.push(menu.routePathMark);
          },
          /**
           * 设置当前tab选中状态
           * @param {Object} header
           */
          setTabSeleced(routePathMark) {
            let _index = 0;
            for(let i=0;i<this.menus.length;i++){
                this.menus[i].selected = false;
                if(this.menus[i].routePathMark == routePathMark){
                    _index = i;
                    this.menus[i].selected = true;
                }
            }
            let showNum = Math.floor(document.body.clientWidth / 200);
            if(_index <= 0 - this.srollLeft) {
              this.srollLeft = 0 - _index;
            } else if(_index >= showNum - this.srollLeft) {
              this.srollLeft = 0 - (_index - showNum + 1);
            }
          },
        }
    }
</script>

<style>
  /*tab导航及header样式*/
  .content_span_two{
    position: relative;top:2px;
  }
  .kiki_content_sel{
    height:100%;
    position: fixed;
    z-index: 2;
    margin-top:80px;
    background: #000000;
  }
  .content_box_sel_div{
    width:100%;
    height:100%;
  }
  .kiki_header{
    position: fixed;
    z-index: 2;
  }
  .kiki_header_stl{
    width:384px;
    height:80px;
    float: left;
    
  }
  .text{
    font-size: 22px;
    color: #fff;
    display: inline-block;
    float: left;
    margin-top: 31px;
    margin-left: 15px;
  }
  .img_ic_div{
    width:30px;
    height:30px;
    float: left;
    margin-top: 26px;
    margin-left: 39px;
    cursor:pointer;
  }
  .img_ic{
    width:30px;
    height:30px;
    display: block;
  }

  .btn{
    margin-bottom:3px
  }
  .h_le_menu .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item:hover {
    background: #2D373A !important;
    color:#fff;
  }
  .ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item{
    padding-left: 87px;
    background: #000;   
  }
  .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title{
    padding-left: 48px;
  }
  .ivu-menu-dark{
    background: #24282b!important;
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title{
    background: 0px!important;
  }
  .box_hover>.ivu-menu-submenu:hover{
     background: #174811;
  }
  .btn-sel{
    transition: left 1s;
    -moz-transition: left 1s;
    /* Firefox 4 */
    -webkit-transition: left 1s;
    /* Safari 和 Chrome */
    -o-transition: left 1s;
    /* Opera */
    position: absolute;
    left: -270px;
    z-index: 5;
  }
  .box_hover .ivu-menu-submenu-title>i{
    display: none;
  }
  .menuBoxTwo .ivu-menu-submenu-title{
    width: 288px;
    height: 42px;
    position: relative;
    top: -14px;
    left: -24px;
  }
  /*!* 设置滚动条的样式 *!::-webkit-scrollbar {    width: 12px;}!* 滚动槽 *!::-webkit-scrollbar-track {    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);    border-radius: 10px;}!* 滚动条滑块 *!::-webkit-scrollbar-thumb {    border-radius: 10px;    background: rgba(0,0,0,0.1);    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);}::-webkit-scrollbar-thumb:window-inactive {    background: rgba(255,0,0,0.4);}*/
  /*tab导航及header样式*/
  /*tab标签*/
  .nav-tab {
    position: relative;
    background: #CEE3E7;
    height:50px;
    top:80px;
    /*width:100vw;*/
    white-space: nowrap;
    overflow: hidden;
    transition: left 1s;
    -moz-transition: left 1s;
    /* Firefox 4 */
    -webkit-transition: left 1s;
    /* Safari 和 Chrome */
    -o-transition: left 1s;
    /* Opera */

  }
  .nav-tab .arrow {
    height: 50px;
    width: 20px;
    font-size: 35px;
    padding:9px 2px 9px 2px;
    position: absolute;
    top: 0;
    z-index: 2;
    cursor: pointer;
    background: #999;
  }
  .nav-tab .arrow:hover {
    height: 50px;
    width: 20px;
    font-size: 35px;
    padding:9px 2px 9px 2px;
    position: absolute;
    top: 0;
    z-index: 2;
    cursor: pointer;
    background: #fff;
  }
  .nav-tab .arrow:hover {
    -webkit-transition: background 1s ease-in-out;
    -moz-transition: background 1s ease-in-out;
    -o-transition: background 1s ease-in-out;
    transition: background 1s ease-in-out;
  }
  .nav-tab .arrow.arrow-left {
    left: 33px;
  }
  .nav-tab .arrow.arrow-right {
    right: 1px;
    padding:9px 2px 9px 5px!important;
  }
  .nav {
    position: relative;
    z-index: 1;
    margin: 0px 19px;
    padding-left: 40px;
    width: 1000vw;
  }
  .nav a {
    position: relative;
    display: inline-block;
    padding: 5px 0;
    color: #000;
    margin: 0 -5px;
    width: 214px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    padding-right: 30px;
    bottom: -1px;
  }
  .nav a::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 1px;
    left: 0;
    z-index: -1;
    border-bottom: none;
    border-radius: 10px 10px 0 0;
    background: #ddd;
    /*box-shadow: 0 2px hsla(0, 0%, 100%, .5) inset;*/
    transform: perspective(10px) rotateX(2deg);
    transform-origin: bottom;
  }
  .nav .tab-close {
    padding: 0 10px;
    position: absolute;
    right: 30px;
    top: 22px;
  }
  .nav a.selected {
    z-index: 2;
  }
  .nav a.selected::before {
    margin-bottom: -1px;
  }
  .nav a.selected::before {
    background: #fff!important;
  }
  /*tab标签*/
  /*其他小控件样式*/
  .icon_div{
    width: 33px;
    height: 50px;
    position: absolute;
    left: 0px;
    border: 1px solid #3B6236;
    background: #fff;
    z-index: 2;
    padding-top: 14px;
    cursor: pointer;
    padding-left: 6px;
  }
  .icon_div>img{
    width: 20px;
    height: 20px;
    display: block;
  }
  /*其他小控件样式*/
  .kiki_content_sel .ivu-row .ivu-col .ivu-menu{
    z-index: 1;
  }

</style>
