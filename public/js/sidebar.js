/*===== SHOW NAVBAR  =====*/ 
const showNavbar = (toggleId, navId, bodyId, headerId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId),
    bodypd = document.getElementById(bodyId),
    headerpd = document.getElementById(headerId)

    // Validate that all variables exist
    if(toggle && nav && bodypd && headerpd){
        toggle.addEventListener('click', ()=>{
            // show navbar
            nav.classList.toggle('show')
            // change icon
            toggle.classList.toggle('bx-x')
            // add padding to body
            bodypd.classList.toggle('body-pd')
            // add padding to header
            headerpd.classList.toggle('body-pd')
        })
    }
}

showNavbar('header-toggle','nav-bar','body-pd','header')

/*===== LINK ACTIVE  =====*/ 
const linkColor = document.querySelectorAll('.nav__link')

function colorLink(){
    if(linkColor){
        linkColor.forEach(l=> l.classList.remove('active'))
        this.classList.add('active')
    }
}
linkColor.forEach(l=> l.addEventListener('click', colorLink))


function loadPage(event)
{
event.preventDefault();
 var link=$(event).attr('href')
  $.get(link, function(data){
    $('#maincontent').html(data);
  });
}

function logoutPage()
{
//event.preventDefault();
//var link=$(event).attr('href')
 var nameEQ = "apikey=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0)
        {
          var apikey=c.substring(nameEQ.length,c.length);
          document.cookie = "apikey ="+apikey+"; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          $.get("/logout",(data)=>{
            if(data.data==1)
            {
                //console.log("Logged out")
                window.location.assign("/login") 
            }

        });

        }
        
     }
}

function dismiss(e)
{
    var link=$("#dismissnotify").attr('href');
    event.preventDefault();
        $.ajax({
            type: "GET",
            url: link,
            success: function(data){
                $("#notifications").html("");
            }
        });

}
