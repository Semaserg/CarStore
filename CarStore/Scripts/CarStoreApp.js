CarStoreApp = new Backbone.Marionette.Application();

CarStoreApp.addRegions({
    mainRegion: '#carsContainer'
});

Car = Backbone.Model.extend({
    defaults: {
        Id: 0,
        Speed: 100,
        Title: 'Empty',
        Rank:0
    },

    rankUp: function () {
        this.set('Rank', this.get('Rank') + 1);
    },

    rankDown: function () {
        this.set('Rank', this.get('Rank') - 1);
    }
});

CarCollection = Backbone.Collection.extend({
    model: Car,

    url: 'api/car',

    initialize: function (cars) {
        var defaultRank = 1;
        _.each(cars, function (car) {
            //car.set('Speed', 10); // do not works I don`t know why
            //car['Speed'] = 10;
            car.Speed = 10;
            car.Rank = defaultRank;
            defaultRank++;
        });

        var self = this;

        CarStoreApp.on('car:up', function (car) {
            car.rankUp();
            self.sort();
            self.trigger('reset');
            //alert('Up car with Title ' + car.attributes.Title);
        });

        CarStoreApp.on('car:down', function (car) {
            car.rankDown();
            self.sort();
            self.trigger('reset');
            //alert('Down car with Title ' + car.attributes.Title);
        });

        CarStoreApp.on('car:destroy', function (car) {
            car.destroy();// destroy model
            self.sort();
            self.trigger('reset');
            //alert('Down car with Title ' + car.attributes.Title);
        });
    },

    comparator: function (car) {
        return car.get('Rank');
    }
});

CarView = Backbone.Marionette.ItemView.extend({
    template: '#car-template',
    tagName: 'li',
    className: 'media',
    
    events: {
        'click .act-up': 'upBtnClick',
        'click .act-down': 'downBtnClick',
        'click .act-destroy': 'destroyBtnClick'
    },
    upBtnClick: function () {
        // alert('Title is ' + this.model.Speed);
        //var self = this;
        CarStoreApp.trigger('car:up', this.model);
    },
    downBtnClick: function () {
        CarStoreApp.trigger('car:down', this.model);
    },
    destroyBtnClick: function () {
        CarStoreApp.trigger('car:destroy', this.model);
    }

});

CarListView = Backbone.Marionette.CompositeView.extend({
    template: '#car-list-template',
    tagName: 'div',
    className: 'panel panel-default',
    id: 'carCollection',
    itemView: CarView,

    appendHtml: function (collectionView, itemView) {
        collectionView.$('ul').append(itemView.el);
    }
});

CarStoreApp.addInitializer(function (options) {
    var carListView = new CarListView({
        collection : options.cars
    });
    CarStoreApp.mainRegion.show(carListView);
});

$(document).ready(function () {
    var cars = new CarCollection([
        { Title: "Mustang" },
        { Title: "Camaro" },
        { Title: "Lanos" }
    ]);

    CarStoreApp.start({ cars: cars });

});
