var React = require('react');
var validator = require('validator');

var Store = require('../../flux/Store');
var Action = require('../../flux/Action');

var Btn = require('../../component/util/Btn');
var Input = require('../../component/util/Input');
var ValidationMessage = require('../../component/util/ValidationMessage');

var Regist = React.createClass({
  getInitialState: function () {
    return Store.getState();
  },
  componentDidMount: function () {
    this.setState({
      isVaildInput: true
    });
  },
  _validate: function (mail, password) {
    return (
      validator.isEmail(mail) && validator.isAlphanumeric(password) && validator.isLength(password, 8)
    );
  },
  _postRegist: function (thisProps) {
    thisProps.mail = this.state.mail;
    thisProps.password = this.state.password;
    var isVaildInput = this._validate(this.state.mail, this.state.password);
    this.setState({
      isVaildInput: isVaildInput
    });
    if(isVaildInput){
      console.log('vaild');
      Action.postRegist(thisProps);
    }else{
      console.log('invaild');
    }
  },
  _handleMailChange: function (event) {
    this.setState({
      mail: event.target.value
    });
  },
  _handlePasswordChange: function (event) {
    this.setState({
      password: event.target.value
    });
  },
  render: function () {
    var validationMessage;
    if(!this.state.isVaildInput){
      validationMessage = 'no';
    }else{
      validationMessage = '';
    }
    return (
      <div>
        <input type="mail" value={this.state.mail} placeholder='メールアドレス' onChange={this._handleMailChange}  />
        <input type="password" value={this.state.password} placeholder='パスワード' onChange={this._handlePasswordChange}  />
        <Btn method='post' uri='/account/regist' name='新規登録' func={ this._postRegist }/>
        <ValidationMessage message={validationMessage} />
      </div>
    );
  }
});

module.exports = Regist;
