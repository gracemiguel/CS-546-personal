const axios = require('axios')
(function($){

    var newShowForm = $('#searchForm')
    var newShowInput = $('#search_term')
    var newShowArea = $('#showContainer')
    var indivShow = $('#show')
    var showList = $('#showList')

    $.ajax({
        method: 'GET',
        url: "http://api.tvmaze.com/shows", 
        success: function(data){
            $('#show').hide()
            for(i=0; i<data.length; i++){
                var li =$('<li>')
                var a = $('<a />', {text: data[i].name})
                li.append(a)
                showList.append(li)
            }
            $('#showList').show()
            
            // $.each(data, function(index, value){        // adding each show to the showList tag
            //     $("li").attr(`<a href= ${value._links.self.href}.>`+value.name+'</a>')
            //     alert($("li").attr(`<a href= ${value._links.self.href}.>`+value.name+'</a>'))
            // })
        },
    }).then(function(responseMessage){
        console.log(responseMessage)
    })

    myNewSearchForm.submit(function(event){
        event.preventDefault()
        var search = newShowInput.val()

        if(search.trim()){
            showList.removeAttr('hidden')
            $('#show').empty()      //removes contents of the div
            var requestConfig = {
                method: 'POST',
                url: `http://api.tvmaze.com/search/shows?q=${search}`,
                data: function(data){
                    for( i=0; i<data.length; i++){
                        var h1 = $('<h1>')
                        var name = $(data[i].name)
                        var img = $(data[i].img)
                        h1.append(name)

                    }
                    $('#show').show()
                }
            }
            
                $.ajax(requestConfig).then(function(responseMessage){
                    console.log(responseMessage);
                    var newElement = $(responseMessage)
                    newShowArea.append(newElement)

                })
            
        }
    })
})(window.jQuery)

    