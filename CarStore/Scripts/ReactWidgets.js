/** @jsx React.DOM */

var ReactHeader = React.createClass({
    render: function () {
        return (
            <div class="page-header">
                <h1>Car Store App<small> find car of your dream</small></h1>
            </div>
        );
    }
});

var ReactSearchForm = React.createClass({
    searchClickHandler : function(){
        console.log("ReactSearchForm searchClickHandler start");
        var searchText = this.refs.searchText.getDOMNode().value.trim();
        console.log("searchClickHandler, search text : " + searchText);
        this.props.onSearchClick({text : searchText});
    },

    render: function(){
        return (
             <div class="container-fluid">
                <div class="navbar-form navbar-left" role="search">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Search" ref="searchText" />
                    </div>
                    <a class="btn btn-default act-search" id="btnSearch" onClick={this.searchClickHandler}>Search</a>
                </div>
            </div>
            );
    }
});

var ReactCarGrid = React.createClass({
    //getInitialState: function() {
    //        return { 
    //            carList: [] 
    //        };
    //    },
    render: function () {
        console.log("ReactCarGrid render start"); 
        var rowList = this.props.carList.map(function(entity){
                return <ReactCarGridRow carEntity={entity} />;
           });
        return (
          <div>{rowList}</div>
        );
    }
});

var ReactCarGridRow = React.createClass({
    render: function(){
        return (
            <div>
        <a class="pull-left" href="#">
           <img class="media-object" src="../Images/1401031633_camaro_256.png" alt="..." />
       </a>
       <div class="media-body">
           <h4 class="media-heading">{this.props.carEntity.Title}</h4>
           <div>Id: {this.props.carEntity.Id}</div>
           <div>Rank: {this.props.carEntity.Rank}</div>
           <div>Speed: {this.props.carEntity.Speed}</div>
           <div>
               <div class="btn-group btn-group-justified">
                   <div class="btn-group">
                       <button type="button" class="btn btn-default act-up">UP</button>
                   </div>
                   <div class="btn-group">
                       <button type="button" class="btn btn-default act-destroy">Destroy</button>
                   </div>
                   <div class="btn-group">
                       <button type="button" class="btn btn-default act-down">DOWN</button>
                   </div>
               </div>
           </div>
       </div>
        </div>
        );
    }
});