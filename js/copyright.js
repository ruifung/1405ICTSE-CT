// JavaScript Document

	function copyright() {
    var text = "By Seong Chee Ken, Tan Jun Ming && Yee Kang Min. UCDF1405ICT(SE)T2 Internet Applications"
	var output = ""
	for(var i = 0; i < text.length; i++)output += String.fromCharCode(text.charCodeAt(i) ^ 52);
	window.alert(output);
	}
