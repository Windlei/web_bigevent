$(function () {
  getlist()
  function getlist() {
    $('#cmt-list').empty()
    $.ajax({
      type: 'get',
      url: 'http://ajax-base-api-t.itheima.net/api/cmtlist',
      success: function (res) {
        let list = res.data
        list.forEach(function (item, index) {
          const { time, username, content, id } = item
          let str = ` <li class="list-group-item"><span class="badge" style="background-color:#F0AD4E">${time}</span><span class="badge" style="background-color:#5BC0DE">${username}</span>${content}</li>`
          $('#cmt-list').prepend(str)
        })
      }
    })
  }

  $('#formAddcmt').on('submit', function (e) {
    e.preventDefault()
    let mes = $(this).serialize()
    $.ajax({
      type: 'POST',
      url: 'http://ajax-base-api-t.itheima.net/api/addcmt',
      data: mes,
      success: function (msg) {
        if (msg.status !== 201) return alert(gg)
        getlist()
      }
    })
  })
})

