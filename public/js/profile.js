$(document).ready(function(){
    $("#updateButton").on("click", function(event)
    {
 var id= $(this).val();
 
 var name= $("#fname").val();
 var phone=$("#mobile").val();
 var institution=$("#org").val();
 
        $('#updateButton').html('updating..');
        $.ajax({
            url:'REST/profile/'+id+'/update?apikey='+apikey()+'&name='+name+'&phone='+phone+'&institution='+institution,
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                $('#updateButton').html("Updated");
                $("#student").html(name);
            },
          
        });
    });
    
   // to fetch api key from cookies 
     function apikey()
 {
 var nameEQ = "apikey=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0)
        {
          var apikey=c.substring(nameEQ.length,c.length);
          }
          }
          return apikey;
          }
});

$(document).ready(function()
{
 	var id= $("#updateButton").val();
    $.getJSON('REST/profile/'+id+'/view?apikey='+apikey(), function(result)
    {
        
    $("#student").html(result.name)
    if(result.role==2)
    {
    $("#name-role").html("Lead/Manager")
    }
     $("#fname").val(result.name)
        $("#mobile").val(result.phone)
           $("#org").val(result.institution)
           
   });
   
   
 // to fetch apikey from cookie
 function apikey()
 {
 var nameEQ = "apikey=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0)
        {
          var apikey=c.substring(nameEQ.length,c.length);
          }
          }
          return apikey;
 }
});