//rendering in page
$(document).ready(()=>{
    
    var uid=document.getElementById('span').innerText;          
    $.ajax({
        metdod:'GET',
        url: '/user/welcome/cart/data/'+uid, 
        dataType: 'json'
        }).done((data) => {
            const a = [];
            $.map(data, (post, i) =>{
                    a.push({pid:post.pid,price:post.price,pn:post.pname})

                    $('table').append(
                    `<tr>
                    <td>${post.pid}</td>
                    <td>${post.pname}</td>
                    <td>${post.pdetail}</td>
                    <td><img src="../../../images/${post.photo}" width="70px"</td>
                    <td id="price">${post.price}</td>
                    <td>${post.category}</td>
                    <td><input type="button" class="delete btn_1"  value="remove" id="${post.pid}"></td>
                    </tr>`);
                });
                
                $('table').append(`
                <tr><td colspan="4">Totals</td><td id="total" name="total"></td> </tr></table>`);
                $(function() {
                    
                    var a= $("#total").html(sumColumn(5));
                    var b=a[0].innerHTML;
                    if(b==0){
                        document.getElementById('checkout').style.display="none";
                        document.getElementById('thead').style.display="none";
                    }
                    localStorage.removeItem('q');
                    localStorage.setItem('q',`${b}`)
                  });
                function sumColumn(index) {
                var total = 0;
                $("td:nth-child(" + index + ")").each(function() {
                  total += parseInt($(this).text(), 10) || 0;
                 });  
                 return total;
                 }
                localStorage.setItem('a',JSON.stringify(a)); 
        });  
        
    });
    
//after check out
$(document).ready(function(){
    $('#checkout').click(e => {
       var a = JSON.parse(localStorage.getItem('a'));
       var n=document.getElementById('fname').innerHTML;
       var m=document.getElementById('mobile').innerHTML;
       var ad=document.getElementById('address').innerHTML;
       var uid=document.getElementById('span').innerHTML;
       var ord = JSON.stringify(Math.random()*1000);
	   var i = ord.indexOf('.');
       ord = 'ORD'+ ord.substr(0,i);
       localStorage.setItem('o',`${ord}`);
       var today = new Date();
       var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
       var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
       var dT = date+' '+time;

       var b=[];

       for (let i = 0; i < a.length; i++) {
        b.push([n,m,ad,a[i].price,a[i].pid,ord,dT,uid,a[i].pn])};
       
     $.ajax("/user/welcome/order", {
        data: { "strArr": b },
        type: "POST",
        async: true,
}).done((data)=>{
 window.location.href='/user/welcome/checkout'
})})})
//delete from cart
 $(document).ready(function(){
    $('body').on("click",".delete",function(){
   var pid= $(this).attr('id');
   var uid=document.getElementById('span').innerText; 
   $.ajax({
       type:'DELETE',
       url: '/user/cart/delete/', 
       data:{
        prid:pid,
        usid:uid
    },  
    }).done((data) => {
           alert(data.message);  
   })
   $(this).closest('tr').remove()
   window.location.href='/user/welcome/cart/'+uid
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
