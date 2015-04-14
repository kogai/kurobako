var React = require('react');
var validator = require('validator');

var Store = require('../../flux/Store');
var Action = require('../../flux/Action');

var Btn = require('../../component/util/Btn');
var Input = require('../../component/util/Input');
var ValidationMessage = require('../../component/util/ValidationMessage');

module.exports = React.createClass({
  getInitialState: function () {
    return Store.getState();
  },
  componentDidMount: function () {
    this.setState({
      isVaildMail: true,
      isVaildPassword: true,
    });
  },
  _validate: function () {
    return (
      this.state.isVaildMail && this.state.isVaildPassword
    );
  },
  _postRegist: function (thisProps) {
    thisProps.mail = this.state.mail;
    thisProps.password = this.state.password;
    var isVaildInput = this._validate();
    this.setState({
      isVaildInput: isVaildInput
    });
    if(isVaildInput){
      Action.postRegist(thisProps);
    }
  },
  _validateMailChange: function (event) {
    var mail = event.target.value;
    this.setState({
      mail: mail,
      isVaildMail: validator.isEmail(mail)
    });
  },
  _validatePasswordChange: function (event) {
    var password = event.target.value;
    this.setState({
      password: password,
      isVaildPassword: validator.isAlphanumeric(password) && validator.isLength(password, 8)
    });
  },
  render: function () {
    var mailValidationMessage;
    var passwordValidationMessage;
    if(!this.state.isVaildMail){
      mailValidationMessage = 'メールアドレスを入力して下さい';
    }else{
      mailValidationMessage = '';
    }
    if(!this.state.isVaildPassword){
      passwordValidationMessage = 'パスワードは英数字8文字以上を入力して下さい';
    }else{
      passwordValidationMessage = '';
    }
    return (
      <div>
        <input type="mail" value={this.state.mail} placeholder='メールアドレス' onChange={this._validateMailChange}  />
        <ValidationMessage message={ mailValidationMessage } />
        <input type="password" value={this.state.password} placeholder='パスワード' onChange={this._validatePasswordChange}  />
        <ValidationMessage message={ passwordValidationMessage } />
        <Btn uri={ this.props.uri } name={ this.props.name } func={ this._postRegist }/>
      </div>
    );
  }
});
