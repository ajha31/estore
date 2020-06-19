//uploading picture
$(document).ready(function(){
    $("#upload").click(e => {
        e.preventDefault();
        var fd = new FormData();
    var files = $('#file')[0].files[0];
    fd.append('file',files);
    console.log(files);
    var val=files.name;
    localStorage.setItem("va",`${val}`);

        $.ajax({
            type: "POST",
            url: "/admin/photo",
            data: fd,
            processData: false,
            contentType: false,
            success: function(r){
                console.log("result:",r)
            },
            error: function (e) {
                console.log("some error:", e);
            }
        });
    
    })
})
//updating product in database
  
        $(document).ready(()=>{
            $('#post').click(e => {
                 e.preventDefault();
                 var valu=localStorage.getItem("value");
                  var y=localStorage.getItem("va");
                  localStorage.removeItem("va");
                 $.ajax({
                    type:'POST',
                    url: '/admin/update/'+valu,
                    data:{
                        pname:$('#pname').val(),
                        pdetail:$('#pdetail').val(),
                        photo:y,
                        price:$('#price').val(),
                        cat:$('#cat').val(),
                    },
                    }).done((result) => {
                        window.location.href='/admin/acontrol'
                });
             })
         })
//rendering in page
$(document).ready(()=>{
    var v=localStorage.getItem("value");
                
    $.ajax({
        metdod:'GET',
        url: '/admin/update/'+v,   
        dataType: 'json'
        }).done((data) => {
                $.map(data, (post, i) =>{
                    $('table').append(
                    `<tr>
                    <td>${post.pid}</td>
                    <td>${post.pname}</td>
                    <td>${post.pdetail}</td>
                    <td><img src="../../../images/${post.photo}" width="70px"</td>
                    <td>${post.price}</td>
                    <td>${post.category}</td>
                    </tr>`);
                    $('#pname').val(`${data[0].pname}`)
                    $('#price').val(`${data[0].price}`)
                    $('#pdetail').val(`${data[0].pdetail}`) 
                });
        console.log(data);
        
        });
        
    });