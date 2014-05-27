CarStoreApp = new Backbone.Marionette.Application();

CarStoreApp.addRegions({
    searchResultsRegion: '#search-results-container',
    searchForsm: '#search-form'
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

    url: '../api/car',

    initialize: function (cars) {

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
    },

    initialize: function () {
        var self = this;

        this.collection = new CarCollection();
        this.collection.fetch({ reset: true });// it works with false too!!!! why???
        //this.render(); // it works without render too.

        CarStoreApp.on('search:fetch', function (searchText) {
            self.collection.fetch({ reset: true, data: { searchText: searchText } });
        });
    }
});

AppRouter = Backbone.Router.extend({
    routes: {
        'search/:searchText' : 'searchCar' 
    },

    searchCar: function (searchText) {
        CarStoreApp.trigger('search:fetch', searchText);
    },

    initialize: function () {
        
        var self = this;

        CarStoreApp.on('search:start', function (searchText) {
            self.navigate('search/' + encodeURIComponent(searchText), { trigger: true, replace: false });
        });
    }
});

SearchView = Backbone.Marionette.ItemView.extend({
    template: '#search-form-template',

    events: {
        'click .act-search' : 'btnSearchClick'
    },

    btnSearchClick: function () {
        CarStoreApp.trigger('search:start', $('#txtSearch').val());
    }
});



CarStoreApp.addInitializer(function (options) {
    var carListView = new CarListView();
    var searchView = new SearchView();

    CarStoreApp.searchResultsRegion.show(carListView);
    CarStoreApp.searchForsm.show(searchView);

    var appRouter = new AppRouter();
    //Backbone.history.start({ pushState: true, root:'home/index/' });

    Backbone.history.start();
});

$(document).ready(function () {
    CarStoreApp.start();   
});
