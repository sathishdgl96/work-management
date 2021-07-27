
$(document).ready(function()
{
    $.ajax({
        type: "GET",
        url: "initial-nav.html",
        data: { },
        success: function(data){
            $('#header').html(data);
        }
    });
});