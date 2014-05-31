/** @jsx React.DOM */
CarStoreApp = new Backbone.Marionette.Application();

Car = Backbone.Model.extend({
    defaults: {
        Id: 0,        
        Title: "",        
        Description: "",
        AuthorName: "",
        AuthorAdvertCount: 0,
        Location: "",
        ImageUrl: "",
        SmallImageUrl: "",
        Price: "",
        Make: "",
        Model: "",
        Fuel: "",
        Cylinders: "",        
        Odometer: "",
        VIN: "",
        RepairCost: "",
        PublishDate: ""
    }
});

CarCollection = Backbone.Collection.extend({
    model: Car,
    url: '../api/car'
});


CarListView = Backbone.Marionette.CompositeView.extend({
    viewMode : 'detail',

    initialize: function () {
        console.log("CarListView initialize start");        
        
        var self = this;

        this.collection = new CarCollection();
        
        this.collection.on("sync", function() {
            console.log("Collection synced");
            self.render();
        });

        this.collection.fetch({ reset: true });

        CarStoreApp.on('search:getall', function () {
            self.collection.fetch({ reset: true });
        });

        CarStoreApp.on('search:fetch', function (searchText) {
            LoaderHelper.showLoader();
            self.collection.fetch({ reset: true, data: { searchText: searchText } });
        });
        console.log("CarListView initialize end");
    },

    render : function() {
        console.log("carlistview render start. Mode = " + this.viewMode );
        LoaderHelper.hideLoader();
        React.renderComponent(<ReactCarGrid carList={this.collection.models} viewMode={this.viewMode} />, document.getElementById('car-collection-container'));
        console.log("carlistview render end");
    },

    changeViewMode: function(mode){
        console.log("changeViewMode start. mode = " + mode);
        this.viewMode = mode;
        this.render();
    }
});

AppRouter = Backbone.Router.extend({
    routes: {
        '' : 'getAll',
        'search' : 'getAll',
        'search/:searchText': 'searchCar'
    },

    getAll: function() {
        console.log('getAll start');
        CarStoreApp.trigger('search:getall');
    }, 

    searchCar: function (searchText) {
        console.log('searchCar start');
        CarStoreApp.trigger('search:fetch', searchText);
    },

    initialize: function () {

        var self = this;

        CarStoreApp.on('search:start', function (searchText) {
            self.navigate('search/' + encodeURIComponent(searchText), { trigger: true, replace: false });
        });

        CarStoreApp.on('search:getall', function (searchText) {
            self.navigate('search', { trigger: true, replace: false });
        });
    }
});

SearchView = Backbone.Marionette.ItemView.extend({

    btnSearchClick: function (data) {
        console.log("btnSearchClick start. text = " + data.text);
        if (data.text)
            CarStoreApp.trigger('search:start', data.text);
        else 
            CarStoreApp.trigger('search:getall');
    },

    render: function () {
        console.log("SearchView render start");
        React.renderComponent(<ReactSearchForm onSearchClick={this.btnSearchClick} />,  document.getElementById('search-container'));
        console.log("SearchView render finish");
    }

});

CarStoreApp.addInitializer(function (options) {
    console.log("CarStoreApp Initializer start");

    React.renderComponent(<ReactHeader />, document.getElementById('header-container'));
    
    var searchView = new SearchView();
    searchView.render();

    var carListView = new CarListView();
    carListView.render();

    var appRouter = new AppRouter();

    var changeGridView = function(mode) {
        carListView.changeViewMode(mode);
    }

    React.renderComponent(<ReactChangeGridView onChangeViewClick={changeGridView}/>, document.getElementById('grid-view-mode'));
    Backbone.history.start();

    console.log("CarStoreApp Initializer finish");
});



$(document).ready(function () {
    CarStoreApp.start();
});
