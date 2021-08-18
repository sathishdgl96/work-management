 var nameEQ = "apikey=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0)
        {
          var apikey=c.substring(nameEQ.length,c.length);
           $.post("/rest/loginrequest?apikey="+apikey,function(data){
          if(data.status==1 && data.role==1)
          {
          console.log("success");
          window.location.replace("/dashboard");
          }
          else if (data.status==1 && data.role==2)
          {
          }
          else{}
           });
           
        }
     }

$(document).ready(function(){ 
    $("#login").on("submit", function(event){
        event.preventDefault();
 
        var formValues= $(this).serialize();
         $('#signin').prop('disabled', true);
          $("#signin").html("Processing...");
          
 
        $.post("/rest/loginrequest", formValues, function(data){
            if(data.status==1 && data.role==1)
            {
            $("#signin").html("Welcome back....");
            document.cookie="apikey="+data.apikey
            window.location.replace("/dashboard");
            }
            else if(data.status==1 && data.role==2)
            {
            $("#signin").html("Welcome back....");
            document.cookie="apikey="+data.apikey
            window.location.replace("/manage");
            }

            else if(data.status==0)
            {
            $("#signin").html("Onboarding....");
              document.cookie="apikey="+data.apikey
            window.location.replace("/onboarding");
            }
            else
            {
            $("#password").css("border", "2px solid red");
            $("#signin").html("Try Again");
               $('#signin').prop('disabled', false);
            }
            
        });
    });
});
