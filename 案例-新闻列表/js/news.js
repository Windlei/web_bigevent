$(function () {

  function padZero(n) {
    if (n < 10) {
      return '0' + n
    } else {
      return n
    }
  }
  // 定义格式化时间过滤器
  template.defaults.imports.dateFormat = function (dtstr) {
    let dt = new Date(dtstr)
    let y = dt.getFullYear()
    let m = padZero(dt.getMonth() + 1)
    let d = padZero(dt.getDate())

    let hh = padZero(dt.getHours())
    let mm = padZero(dt.getMinutes())
    let ss = padZero(dt.getSeconds())

    return y + '-' + m + '-' + d + '' + hh + ':' + mm + ':' + ss
  }
  function getNewslist() {
    $.get('http://ajax-base-api-t.itheima.net/api/news',
      function (res) {
        const { status, msg, data } = res
        if (status !== 200) return alert('请求数据失败')
        for (let i = 0; i < res.data.length; i++) {
          // 把每一项tags属性，从字符串改造成字符串数组
          data[i].tags = data[i].tags.split(',')

        }
        console.log(res);
        const htmlstr = template('tpl-news', res)
        $('#news-list').html(htmlstr)
      })
  }
  getNewslist()
})
