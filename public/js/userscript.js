//for loading  user home page
//for loading the first 3 product
$(document).ready(()=>{
   
    $.ajax({
       metdod:'GET',
       url: '/admin/dtusers',   
       dataType: 'json'
       }).done((data) => {
       console.log(data);
      for (let i = 0; i <3; i++) {
            $('#dyna').append(`<div class="col-xl-4 col-lg-4 col-md-6">
            <div class="single-product mb-60">
                <div class="product-img">
                <a href="/user/login">
                    <img class="img-thumbnail" style="width:300px" src="./images/${data[i].photo} ">
                </a>
                    <div class="new-product">
                        <span>New</span>
                    </div>
                </div>
                <div class="product-caption">
                    
                    <h4><a href="#">${data[i].pname}</a></h4>
                    <div class="price">
                        <ul>
                            <li><b>₹</b>${data[i].price}</li>
 
                        </ul>
                    </div>
                </div>
            </div>
        </div>`
           );
      }

   });

});


  