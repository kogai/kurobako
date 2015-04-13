var React = require('react');
var Store = require('../../flux/Store');
var Action = require('../../flux/Action');

var Btn = React.createClass({
  getInitialState: function () {
    return Store.getState();
  },
  componentDidMount: function () {
    Store.addChangeListener(this._postEvent);
  },
  _postEvent: function (event) {
    this.setState({
      isNotPosting: Store.getState().isNotPosting
    });
    if(this.state.isNotPosting){
      Action.postEnything({
        method: this.props.method,
        uri: this.props.uri,
        name: this.props.name
      });
    }
  },
  render: function () {
    return (
      <div method={ this.props.method } uri={ this.props.uri } onClick={ this._postEvent } >
        { this.props.name }
      </div>
    );
  }
});

module.exports = Btn;
