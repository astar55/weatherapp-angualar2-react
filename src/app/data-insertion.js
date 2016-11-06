"use strict";
var React = require('react');
var ReactDOM = require('react/lib/ReactDOM');
function datainsertion(data, location) {
    ReactDOM.render(React.createElement("div", {dangerouslySetInnerHTML: { __html: data[0] }}), document.querySelector("div[name=" + location + "]"));
}
exports.datainsertion = datainsertion;
function dataremove(location) {
    ReactDOM.unmountComponentAtNode(document.querySelector("div[name=" + location + "]"));
}
exports.dataremove = dataremove;
