const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * url 请求地址
 * success 成功的回调
 * fail 失败的回调
 */
function _get (url,success,fail) {
  wx.request({
    url:url,
    header:{'Content-Type': 'json'},
    success: function (res) {
      console.log('get success' + res.data)
      success(res)
    },
    fail:function (res) {
      console.log('get fail' + res.data)
      fail(res)
    }
  })
}

/**
 * url 请求地址
 * success 成功的回调
 * fail 失败的回调
 */
function _post_json (url,data,success,fail) {
  wx.request({
    url:url,
    /*header:{ 
      'Content-Type':'content-type x-www-form-urlencoded',
      'Accept': 'application/json',
    },*/
    method:'POST',
    data:data,
    success:function (res) {
      console.log(res)
    },
    fail:function (res) {
      console.log(res)
    }
  })
}


module.exports = {
  formatTime: formatTime,
  _get: _get,
  _post_json: _post_json
}


