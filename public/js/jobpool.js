function createJobPool(event) {
    $('main').html("creating shared workspace");
    var link = "/createjobpool"
    $.get(link, function (data) {
        $('main').html(data);
    });
}
