/** @jsx React.DOM */
function LoaderHelper() {};

LoaderHelper.showLoader = function () {
    React.renderComponent(<ReactLoader />, document.getElementById('overlay'));
},

LoaderHelper.hideLoader = function () {
    React.unmountComponentAtNode(document.getElementById('overlay'));
}
