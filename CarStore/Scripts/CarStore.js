var CarWrapper = function () {
    var uri = 'api/car';

    this.getList = function () {
        $.getJSON(uri)
        .done(function (data) {
            $.each(data, function (key, item) {
                $('<li/>', { text: item.Id + ' ' + item.Title }).appendTo('#carsContainer');
            });
        })
    }

    this.getItem = function () {
        var uriItem = uri + '/1';
        $.getJSON(uriItem)
        .done(function (item) {
            $('<li/>', { text: item.Id + ' ' + item.Title }).appendTo('#carContainer');
        })
    }
};


$(document).ready(function () {
    var c = new CarWrapper();
    c.getList();
    c.getItem();
});


