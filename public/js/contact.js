//for loading  user home page
$(document).ready(()=>{
   
    $.ajax({
       metdod:'GET',
       url: '/user/welcome/cont',   
       dataType: 'json'
       }).done((data) => {
       console.log(data);
   
        $('#dyna').append(`
        <div>
        
              <img class="img-thumbnail" style="width:300px" src="../../../images/${data[0].photo}  "> 
          <div class="product-caption">
              <ul>
              <li><h4>name:</h4><h2>${data[0].name}</h2></li>
              <li><h4>email:</h4><h2>${data[0].aemail}</h2></li>
              <li><h4>mobileno:</h4><h2>${data[0].phoneno}</h2></li>
              <a href="https://www.facebook.com/aman.jha.18400" class="btn_1">
              connect with facebook</a>
              </ul>
              </div
              
          </div>
          
     </div
  `)  
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