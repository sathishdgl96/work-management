$('#userlink').click(function(e){
    e.preventDefault();
    $.ajax({
        type: "GET",
        url: "/onboarding",
        data: { },
        success: function(data){
            $('#maincontent').html(data);
        }
    });
});

$('#dismisslink').click(function(e){
    alert("triggerred");
        e.preventDefault();
        
    });
    


$('#leavelink').click(function(e){
    console.log("triggerred");
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: "/apply-leave",
            data: { },
            success: function(data){
                $('#maincontent').html(data);
            }
        });
    });
    