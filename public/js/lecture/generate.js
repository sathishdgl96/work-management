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
        
function testid()
{
 var nameEQ = "testid=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0)
        {
          var testid=c.substring(nameEQ.length,c.length);
          }
          }
    return testid;    
}


function addStudent()
{
var sname = $("#sname").val();
var data = $("#test").serializeArray();
data.push({sname:sname, testid:testid()});
console.log(data);

$.ajax({
  type: "POST",
  url: "/lecture/question/addStudent?apikey="+apikey()+"&sname="+sname+"&testid="+testid(),
  cache: false,
  success: function(data){
     //$("#").text(data);
     console.log(data)
  }
});
}


$(document).ready(function() 
{
setCookie();
          $(function() {
               $('#startAt').datetimepicker({
    format:'d-m-y H:i',
});
   $('#endAt').datetimepicker({
    format:'d-m-y H:i',
});
                
 });
})

function setTimeAndTitle()
{
var qtitle = $("#qTitle").val();
var startAt=$("#startAt").val();
var endAt=$("#endAt").val();
var subject=$("#subject").val();
var isProctored=$('#isProctored').checked;
var isPublic=$('#isPublic').checked
isProctored=1;
isPublic=1;
$.ajax({
  type: "POST",
  url: "/lecture/question/set-timing-and-title?apikey="+apikey()+"&testid="+testid()+"&questionTitle="+qtitle+"&startAt="+startAt+"&endAt="+endAt+"&isProctored="+isProctored+"&isPublic="+isPublic+"&subject="+subject,
  cache: false,
  success: function(data){
     //$("#").text(data);
     console.log(data)
     alert(data)
     window.location="/lecture/generate/questions"
  }
});
}







function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
} 

function setCookie() {
    var myCookie = getCookie("testid");

    if (myCookie == null) {
    var testid = $("#testid").val();
       document.cookie = "testid="+testid;
    }
    else {
        
    }
}
