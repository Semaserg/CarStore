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
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search" ref="searchText" />
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="button" onClick={this.searchClickHandler}>
                            <span className="glyphicon glyphicon-search"></span>
                        </button>
                    </span>
                </div>
            );
    }
});

var ReactCarGrid = React.createClass({
    render: function () {
        console.log("ReactCarGrid render start. Mode=" + this.props.viewMode); 
        var rowList = null;
        switch(this.props.viewMode)
        {
            case "brief":
                rowList = this.props.carList.map(function(entity){
                    return <ReactCarBriefGridRow carEntity={entity.attributes} />;
                });
                break;
            case "detail":
                rowList = this.props.carList.map(function(entity){
                    return <ReactCarDetailGridRow carEntity={entity.attributes} />;
                });
                break;
        }   
        return (
          <div>{rowList}</div>
        );
    }
});

var ReactCarDetailGridRow = React.createClass({
    
    render: function(){
        return (
            <div className="panel panel-default">
                <div className="panel-body car-entity-detail">
                    <div className="block car-data">
                        <div className="block image-block">
                            <img src={this.props.carEntity.ImageUrl} />
                        </div>
                        <div className="block description-block">
                            <h2>{this.props.carEntity.Title}</h2>
                            <div>{this.props.carEntity.Description}</div>
                        </div>
                        <div className="block details-block">
                            <div className="block publish-time text-right text-muted">Published: {this.props.carEntity.PublishDate}</div>
                            <div className="block details-container">
                                <div className="block details-left text-info">
                                    <ul>
                                        <li>Make: {this.props.carEntity.Make}</li>
                                        <li>Model: {this.props.carEntity.Model}</li>
                                        <li>Fuel: {this.props.carEntity.Fuel}</li>
                                        <li>Engine: {this.props.carEntity.Engine}</li>
                                    </ul>
                                </div>
                                <div className="block details-right text-info">
                                    <ul>
                                        <li>Cylinders: {this.props.carEntity.Cylinders}</li>
                                        <li>Odometer: {this.props.carEntity.Odometer}</li>
                                        <li>VIN: {this.props.carEntity.VIN}</li>
                                        <li>Repair Cost: {this.props.carEntity.RepairCost}</li>
                                    </ul>
                                </div>
                                <div className="block price text-right">
                                    {this.props.carEntity.Price}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="block car-bottom-details">
                        <div className="block listed-by text-muted">Listed by: {this.props.carEntity.AuthorName}</div>
                        <div className="block location text-muted">Location: {this.props.carEntity.Location}</div>
                        <div className="block other-from-user text-right">
                            <a href="#">Other user listings ({this.props.carEntity.AuthorAdvertCount})</a>
                        </div>
                    </div>
                   

                </div>
            </div>
            );
    }
});

var ReactCarBriefGridRow = React.createClass({

    render: function() {
        return (
            <div className="panel panel-default">
                <div className="panel-body car-entity-brief">
                    <div className="block image-block">
                        <img src={this.props.carEntity.SmallImageUrl} />
                    </div>
                    <div className="block description-block">
                        <h2>{this.props.carEntity.Title}</h2>
                        <div className="block location text-muted">{this.props.carEntity.Location}</div>
                    </div>
                    <div className="block details-container">
                        <div className="block details-left text-info">
                            <ul>
                                <li>Make: {this.props.carEntity.Make}</li>
                                <li>Model: {this.props.carEntity.Model}</li>
                            </ul>
                        </div>
                        <div className="block details-right text-info">
                            <ul>
                                <li>Fuel: {this.props.carEntity.Fuel}</li>
                                <li>Engine: {this.props.carEntity.Engine}</li>                                
                            </ul>
                        </div>                        
                    </div>
                    <div className="price-container text-right">
                        <div className="block price">{this.props.carEntity.Price}</div>
                        <div className="block publish-time text-muted">Published: {this.props.carEntity.PublishDate}</div>
                    </div>
                </div>
            </div>
            );
    }
});

var ReactChangeGridView = React.createClass({
    briefViewClickHandler : function () {
        console.log("briefViewClickHandler start");
        if (this.props.onChangeViewClick) {
            this.props.onChangeViewClick("brief");
        }        
    },

    detailViewClickHandler : function () {
        console.log("detailViewClickHandler start");
        if (this.props.onChangeViewClick) {
            this.props.onChangeViewClick("detail");
        }       
    },

    render : function (){
        return(
                <div class="btn-group">
                    <button type="button" className="btn btn-default" onClick={this.detailViewClickHandler}>
                        <span className="glyphicon glyphicon-th-large"></span>
                    </button>
                    <button type="button" className="btn btn-default" onClick={this.briefViewClickHandler} >
                        <span className="glyphicon glyphicon-list"></span>
                    </button>
                </div>
            );
    }
});

var ReactLoader = React.createClass({
    getInitialState: function() {
        return {progressValue: 1};
    },
    tick: function() {
        //debugger;
        //var maxValue = 100;
        //var newValue = (this.state.progressValue > maxValue) ? 0 : this.state.progressValue + 1;        
        //this.setState({progressValue: newValue});
        this.setState({progressValue: this.state.progressValue + 1});
    },
    componentDidMount: function() {
        this.interval = setInterval(this.tick, 1000);
    },
    componentWillUnmount: function() {
        clearInterval(this.interval);
    },

    render : function() {
        //var divStyle = {
        //    style: "width: " + this.state.progressValue + "%;"
        //};

        return (
            <div className="overlay">
                <div className="progress-container">
                    Loading... {this.state.progressValue}
                </div>  
            </div>  

            );
    }
});
