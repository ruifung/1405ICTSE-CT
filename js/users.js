// remake

var User = {
	defaultProfile : {
		username : "yrf",
		firstName : "Professor",
		lastName : "Yip",
		gender : "Male",
		birthDate : "30-2-2017",
		company : "Apple INC",
		address : "444 Lorong Bahaya",
		about : "I am Proffesor!!!"
	},
	login : function(email, remember){
		if(typeof(email) === 'undefined'){
			return $.cookie('bsd-email');
		}else{
			var attr = {};
			if(remember) attr['expires'] = 7;
			$.cookie('bsd-email', email, attr);
			for(k in this.defaultProfile){
				if(typeof(this.defaultProfile[k])!== 'function'){
					$.cookie("bsd-" + k, User.defaultProfile[k], attr);
				}
			}
		}
	},
	logout : function(){
		$.removeCookie('bsd-email');
		for(k in this.defaultProfile){
			if(typeof(this.defaultProfile[k])!== 'function'){
				$.removeCookie("bsd-" + k);
			}
		}
		window.location = window.location.href;
	},
	profile : function(key, val){
		if(typeof(val) === 'undefined'){
			if($.cookie('bsd-' + key)){
				return $.cookie('bsd-' + key);
			}else{
				return this.defaultProfile[k];
			}
		}else{
			$.cookie('bsd-' + key, val);
		}
	}
};