
var number=1
function addQuestions()
{
var testid=testid()
var apikey=apikey()
var question = $("#question_desc").val();
var correctOption=$("#correctValue").val();
var options = [];
options.push($("#option1").val())
options.push($("#option2").val())
options.push($("#option3").val())

var marks =1;
$.ajax({
  type: "POST",
  url: "/lecture/question/"+testid+"/"+number+"?apikey="+apikey+"&question="+question+"&options="+options+"&correctoption="+correctOption+"&mark="+marks,
  cache: false,
  success: function(data){
  number=number+1;
     //$("#").text(data);
     //console.log(data)
     alert("added questions"+number)
     
  }
});


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
}