//获取应用实例
const app = getApp()

Page({
  data: {
  	userInfo:{}
  },
  onLoad: function () {
    var that = this
    app.getUserInfo( function( userInfo ) {
        //更新数据
        that.setData( {
            userInfo: userInfo
        })
    })

/*wx.getUserInfo({
  success: function(res) {
    var userInfo = res.userInfo
    var nickName = userInfo.nickName
    var avatarUrl = userInfo.avatarUrl
    var gender = userInfo.gender //性别 0：未知、1：男、2：女
    var province = userInfo.province
    var city = userInfo.city
    var country = userInfo.country

    that.setData( {
      userInfo: res.userInfo
    })
  }
})*/

  },
  startTap:function () {
    wx.redirectTo({
      url:'../index/index'
    })

  }
})
