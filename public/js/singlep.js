$(document).ready(()=>{
    var v=$(location).attr('pathname')
    var res = v.slice(22, 24); 
    console.log(res) ;        
    $.ajax({
        metdod:'GET',
        url:`/user/welcome/sp/`+res,
        dataType: 'json'
        }).done((data) => {
           console.log(data);
           
                $('#dyna').append(`
             <div>
                   <img class="img-thumbnail" style="width:500px" src="../../../images/${data[0].photo}  "> 
               <div class="product-caption">
                   <h4><b>₹</b>${data[0].price} <span style="margin-left: 10em;"></span><input type="button" class="cart btn_1"  value="add to cart" id="${data[0].pid}"></h4>
                   <div class="price">
                       <ul>
                           <li>${data[0].pname}</li>
                           <li>${data[0].pdetail}</li>
                           <li>${data[0].category}</li>
                       </ul>
                   </div>
                   
               </div>
               
          </div
       `)
        })  
    });
    //adding product into cart
$(document).ready(function(){
    $('body').on("click",".cart",function(){
    var prid= $(this).attr('id');
    var uid=document.getElementById('span').innerText; 
     $.ajax({
        type:'POST',
        url: '/user/cart',
        data:{
            pid:prid,id:uid
        },
        }).done((data) => {
            window.location.href='/user/welcome/cart/'+uid
    });
   
    });
  });

  // for sending to the filtered product page
$(document).ready(()=>{
    $('.filter ').click(e => {
         e.preventDefault();
         var valu=$(e.target).html(); //using the event target
           localStorage.removeItem("storage");
         localStorage.setItem("storage",`${valu}`);
         window.location.href=`../../../user/welcome/product/${valu}` 
     })
 })