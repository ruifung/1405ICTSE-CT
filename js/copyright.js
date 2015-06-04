// JavaScript Document

	function copyright() {
    var text = "By Seong Chee Ken, Lim Eng Shun, Phang Lik Haeng && Yip Rui Fung. UCDF1405ICT(SE)T2 Computer Technology"
	var output = ""
	for(var i = 0; i < text.length; i++)output += String.fromCharCode(text.charCodeAt(i) ^ 52);
	window.alert(output);
	}
