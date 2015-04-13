var localPassport 		= require('route/account/login/lib/localPassport');
var passPortSerialize 	= require('route/account/login/lib/passPortSerialize');

// シリアライズ関数をpassportインスタンスに登録
localPassport.serializeUser( passPortSerialize.serialize );
localPassport.deserializeUser( passPortSerialize.deSerialize );

module.exports = {
	localPassport: localPassport
};
