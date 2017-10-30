const utils = require('../../utils/util.js')
Page({
  data: {
    inputSearch: '',
    isSearch: true,
    botShow: false,
    resSearch:false,
    barTitle: '正在上映',
    movieName:'',
    countPage: 8, // 一次请求8条数据
    arrList: [], //数据数组
    movieStart: 0,  //从序号几开始
    movieTotal:0 //数据总条数，用来判断是否到底了
  },
  //搜索框搜索
  bindInput:function (e) {
    this.setData({
      inputSearch: e.detail.value
    })
  },
  //搜索按钮,请求数据
  searchTap:function () {
    if(this.data.inputSearch == ""){
      console.log("内容不为空")
      this.setData({
        arrList: [],
        movieStart: 0,
        movieTotal: 0,
        isSearch: true,
        botShow: false,
        resSearch:false
      })
      this.sendRequest();
      return;
    }
    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    var url = 'https://api.douban.com/v2/movie/search?q=' + that.data.inputSearch
    utils._get(url,function (res) {
      if(res.statusCode == 200){
        that.setData({
          isSearch:false,
          arrList: res.data.subjects,
          inputSearch: '',
          botShow:true,
          resSearch:false
        })
        if(res.data.total == 0){
          that.setData({
            botShow:false,
            resSearch:true
          })
        }
        wx.hideLoading()
      }else{
        //请求失败
        setTimeout(function(){
          wx.showLoading({
            title: '服务器开小差'
          })
        },800)
      }
    },function (res) {
      console.log(res)
    })
  },
  onLoad: function (params) {
    this.setData({
      barTitle: params.title,
      movieName: params.name
    })
    wx.setNavigationBarTitle({
      title: this.data.barTitle
    })
    //请求数据
    this.sendRequest()
  },
  sendRequest() {
    wx.showLoading({
      title: '加载中...',
    })
  	var that = this
    var url = 'https://api.douban.com/v2/movie/' + this.data.movieName + '?count=' + that.data.countPage + '&start=' + that.data.movieStart
    utils._get(url,function (res) {
      if(res.statusCode == 200){
        console.log(res.data);
        var movieStart = parseInt(that.data.countPage) + parseInt(that.data.movieStart)
        if(that.data.movieStart === 0){
          that.setData({
            arrList: res.data.subjects,
            movieStart: movieStart,
            movieTotal: res.data.total
          })
        }else{
          that.setData({
            arrList: that.data.arrList.concat(res.data.subjects),
            movieStart: movieStart
          })
        }
        wx.hideLoading()
      }else{
        //请求失败
        setTimeout(function(){
          wx.showLoading({
            title: '服务器开小差'
          })
        },800)
      }
    },function (res) {
      console.log(res.data)
    })
  },
  goDetails:function (event) {
    wx.navigateTo({
      url: '../details/details?movieId='+event.currentTarget.dataset.movieid
    })
  },
  //上拉触底事件
  onReachBottom:function () {
    if(this.data.isSearch){
      if(parseInt(this.data.movieStart) < parseInt(this.data.movieTotal)){
        wx.showLoading({
          title: '加载中...',
        })
        //请求数据
        this.sendRequest()
      }else{
        this.setData({
          botShow: true,
          resSearch:false
        })
      }
    }
  },
  //下拉刷新事件
  onPullDownRefresh:function () {
    this.setData({
      arrList: [],
      movieStart: 0,
      isSearch: true,
      botShow: false,
      resSearch:false
    })
    this.sendRequest()
    wx.stopPullDownRefresh()
  }
})
