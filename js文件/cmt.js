function getComment() {
  $.ajax({
    method: 'GET',
    url: 'http://ajax-base-api-t.itheima.net/api/cmtlist',
    data: {},
    success: function (res) {
      const { status, msg, data } = res
      if (status !== 200) return alert('获取列表失败')
      const rows = []
      $.each(data, function (i, item) {
        const { id, username, content, time } = item
        let str = ` <li class="list-group-item"><span class="badge" style="background-color:#F0AD4E">${time}</span><span class="badge" style="background-color:#5BC0DE">${username}</span>${content}</li>`
        rows.push(str)
      })
      $('#cmt-list').empty().append((rows.join('')))
    }

  })
}
getComment()

$(function () {
  $('#formAddcmt').submit(function (e) {
    e.preventDefault()
    // serialize获取全部内容返回的值，前提是他们都有name=''才可以
    const data = $(this).serialize()
    console.log(data);
    // 添加内容
    $.post('http://ajax-base-api-t.itheima.net/api/addcmt', data, function (res) {
      const { status, msg, data } = res
      if (status !== 201) return alert('发表评论失败')
      getComment()
      $('#formAddcmt')[0].reset()
    })
  })

})
