//for loading  user home page
$(document).ready(()=>{
   
    $.ajax({
       metdod:'GET',
       url: '/admin/dtusers',   
       dataType: 'json'
       }).done((data) => {
       console.log(data);
   
       $.map(data, (post, i) =>{
           $('#dyna').append(`<div class="col-xl-4 col-lg-4 col-md-8 justify-content-between">
           <div class="single-product mb-60">
               <div class="product-img">
               <a  href="/user/welcome/singlep/${post.pid}">
                   <img class="img-thumbnail" style="width:300px" src="../../images/${post.photo} " >
                </a>
                   <div class="new-product">
                       <span>new</span>
                   </div>
               </div>
               <div class="product-caption">
                   <h4><a  href="/user/welcome/singlep/${post.pid}">${post.pname}</a></h4>
                   <div class="price">
                       <ul>
                           <li><b>₹</b>${post.price}</li>
                    
                       </ul>
                   </div>
               </div>
           </div>
       </div>`
          );

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


  