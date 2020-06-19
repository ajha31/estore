//for updating data
$(document).ready(()=>{
    var id = document.getElementById('span').innerHTML; 
    $.ajax({
        metdod:'GET',
        url:`/user/welcome/ac/`+id,
        dataType: 'json'
        }).done((data) => {
           console.log(data);
           $('#name').val(`${data[0].name}`)
           $('#password').val(`${data[0].password}`)
           $('#password2').val(`${data[0].password}`)
           $('#mobileno').val(`${data[0].mobileno}`) 
           $('#address').val(`${data[0].address}`) 
        })  
    });
//for sending data
    $(document).ready(()=>{
        $('#post').click(e => {
             e.preventDefault();
             var id = document.getElementById('span').innerHTML;
             console.log(id);
             $.ajax({
                type:'POST',
                url: 'user/welcome/update/'+id,
                data:{
                    name:$('#name').val(),
                    password:$('#password').val(),
                    mobileno:$('#mobileno').val(),
                    address:$('#address').val(),
                },
            }).done((result) => {
                console.log(result);
                window.location.href='/user/welcome'
            });
         })
     })
     
     // for using filter
     $(document).ready(()=>{
        $('.filter ').click(e => {
             e.preventDefault();
             var valu=$(e.target).html(); //using the event target
               localStorage.removeItem("storage");
             localStorage.setItem("storage",`${valu}`);
             window.location.href=`../../../user/welcome/product/${valu}` 
         })
     })