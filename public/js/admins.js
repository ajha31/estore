
//uploading picture from admin pannel 
   $(document).ready(function(){
    $("#upload").click(e => {
        e.preventDefault();
        var fd = new FormData();
    var files = $('#file')[0].files[0];
    fd.append('file',files);
    console.log(files);
    var val=files.name;
    localStorage.setItem("value",`${val}`);

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
//inserting product in database
  
        $(document).ready(()=>{
            $('#post').click(e => {
                 e.preventDefault();
                  var v=localStorage.getItem("value");
                  localStorage.removeItem("value");
                 $.ajax({
                    method:'POST',
                    url: '/admin/dtusers',
                    data:{
                        pname:$('#pname').val(),
                        pdetail:$('#pdetail').val(),
                        photo:v,
                        price:$('#price').val(),
                        cat:$('#cat').val(),
                    },
                    }).done((data) => {
                });
                window.location.href='/admin/acontrol'
             })
         })
        
         //for loading the data on admin page
         $(document).ready(()=>{       
            $.ajax({
                metdod:'GET',
                url: '/admin/dtusers',   
                dataType: 'json'
                }).done((data) => {
                        $.map(data, (post, i) =>{
                            $('table').append(
                            `<tr>
                            <td>${post.pname}</td>
                            <td>${post.pdetail}</td>
                            <td><img src="../../../images/${post.photo}" width="70px"</td>
                            <td id="price">${post.price}</td>
                            <td>${post.category}</td>
                            <td><input type="button" class="delete btn"  value="remove" id="${post.pid}"></td>
                            <td><input type="button" class="edit black-btn" style="color:white" value="edit" id="${post.pid}"></td>
                            </tr>`);
                        });
                        $('table').append(`
                        <tr><td colspan="3">Totals</td><td id="subtotal"></td> </tr></table>`);
                        $(function() {
                            $("#subtotal").html(sumColumn(4));
                          });
                        function sumColumn(index) {
                        var total = 0;
                        $("td:nth-child(" + index + ")").each(function() {
                          total += parseInt($(this).text(), 10) || 0;
                         });  
                         return total;
                         }
                });  
                
            });
        

 //delete the product
 $(document).ready(function(){
     $('body').on("click",".delete",function(){
    var id= $(this).attr('id');
    $.ajax({
        type:'DELETE',
        url: '/admin/delete/'+id,   
        }).done((data) => {
            alert(data.message);
        
    })
    $(this).closest('tr').remove()
   
     });
   });

   //loading the edit of specific product
 $(document).ready(function(){
    $('body').on("click",".edit",function(){
    var id= $(this).attr('id');
    localStorage.removeItem("value");
    localStorage.setItem("value",`${id}`);
    console.log('clicked',id)
    window.location.href='/admin/acontrol/pedit/'+id
    });
  });