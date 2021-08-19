setInterval(function()
{ 
    $.ajax({
      type:"GET",
      url:"/getTime",
      datatype:"json",
      success:function(data)
      {
          $('#date-time').html(new Date().toLocaleTimeString())
          if(data.message)
          {
            // console.log(data.message) 
             var message="<p>"+data.message+"<a id='dismissnotify' href='dismissnotify?id="+data.notifyid+ "' onclick='dismiss(this)'>  dismiss</a></p>"
            // console.log(message)
             $("#notifications").html(message);
          }
          else
          {
            $("#notifications").html("");
          }
      },
      error: function(error)
       {
       launch_toast("404","Reconnecting");
       }
    });
}, 7000)

function launch_toast(title,msg) {
    var x = document.getElementById("toast")
    x.className = "show";
    $('#toast_title').html(title)
    $('#toast_message').html(msg)
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 6000);
}



// Prints current date in the dashboard
function getDate()
{
   var tdate = new Date();
   var dd = tdate.getDate(); //yields day
   var MM = tdate.getMonth(); //yields month
   var yyyy = tdate.getFullYear(); //yields year
   var currentDate= dd + "/" +( MM+1)+"/"+yyyy;
   //console.log(currentDate)
   $('#today').html(currentDate)
}
$(function() {
   $( document ).ready()
    {
        setTimeout(getDate, 3000);
        setTimeout(getActiveExams,3000);
    };
})

function getActiveExams()
{

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


 $.ajax({
      type:"GET",
      url:"/activeExams?apikey="+apikey(),
      success:function(data)
      {
      //console.log(data[0])
      var i=0;
      $('#subject'+i).html(data[0].subject)
        $('#qtitle'+i).html(data[0].qTitle)
          $('#startat'+i).html(data[0].startAt)
      for(let i=0;i<data.length;i++)
      {
      
      
      }
         // $('#date-time').html(data)
      }
       });
}
function loadTask(id)
{
  $.ajax({
    type: "GET",
    url: "/rest/viewtask/"+id,
    data: { },
    success: function(data){
        $('#maincontent').html(data);
    }
});
}

