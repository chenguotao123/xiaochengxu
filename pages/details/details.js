//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    movieId:'',
    arrList: []
  },

  onLoad: function (params) {
    wx.showLoading({
      title: '加载中...',
    })
    this.setData({
      movieId:params.movieId
    })
    //请求数据
    this.sendRequest(this.data.movieId)
  },

  sendRequest(param) {
  	var that = this
    wx.request({
      url: 'https://api.douban.com/v2/movie/subject/' + param, //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'json' // 默认值
      },
      success: function (res) {
        that.setData({
        	arrList: res.data
        })
        wx.hideLoading()
      }
    })
  }
})
