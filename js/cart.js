var Cart = {
	Item: function(){},
	load: function(){
		items = [];
		if($.cookie("bsd-cart"))items = JSON.parse($.cookie("bsd-cart"));
		for(var i = 0; i < items.length; i++) items[i] = $.extend({}, Cart.Item.prototype, items[i]);
		return items;
	},
	add: function(item){
		var items = Cart.load();
		items.push(item);
		$.cookie("bsd-cart", JSON.stringify(items));
	},
	remove: function(index){
		var items = Cart.load();
		items.splice(index, 1);
		$.cookie("bsd-cart", JSON.stringify(items));
		$("#details").html("");
		$("#details").append(Cart.details());
		if(items.length == 0){
			$("#pay").hide();
		}
	},
	clear: function(){
		$.removeCookie("bst-cart");
	},
	total: function(){
		var items = Cart.load();
		total = 0;
		for(var i = 0; i < items.length; i++){
			total += items[i].total();
		}
		return total;
	},
	details: function(){
		var items = Cart.load();
		var cart = $(document.createElement('div'));
		if(items.length == 0){
			cart.append("<label>Nothing in your cart yet.</label>");
			return cart;
		}
		var total = 0;
		for(var i = 0; i < items.length; i++){
			var item = $(document.createElement('div'));
			item.append("<p><label>Name: " + items[i].name + "</label></p>");
			item.append("<p><label>Size: " + items[i].size + "</label></p>");
			item.append("<p><label>Quantity: " + items[i].quantity + "</label></p>");
			item.append("<p><label>Unit Cost: " + items[i].price + "</label></p>");
			item.append("<hr/>");
			item.append("<div style='float:left;'><label>Amount: RM " +
						items[i].total().toFixed(2) + "</label></div>");
			item.append("<button type='button' class='btn btn-default' style='float:right;' "+
						"onclick='Cart.remove(" + i + ")'>Remove</button>");
			item.append("<div style='clear:both'></div>");
			total += items[i].total();
			cart.append(item);
			cart.append("<hr/>");
		}
		cart.append("<p><label id='total'>6% GST: RM " + (total * 0.06).toFixed(2) + "</label></p>");
		cart.append("<p><label id='total'>Total: RM " + (total * 1.06).toFixed(2) + "</label></p>");
		return cart;
	},
	receipt: function(){
		var items = Cart.load();
		var table = $(document.createElement("table"));
		var tbody = $(document.createElement("tbody"));
		table.append(tbody);
		tbody.append("<tr><th>Item</th><th>Quantity</th><th>Unit Cost</th><th>Amount(RM)</th></tr>");
		for(var i in items){
			var tr = $(document.createElement('tr'));
			tr.append("<td>" + items[i].name + " - " + items[i].size + "</td>");
			tr.append("<td>" + items[i].quantity + "</td>");
			tr.append("<td>" + items[i].price.toFixed(2) + "</td>");
			tr.append("<td>" + items[i].total().toFixed(2) + "</td>");
			tbody.append(tr);
		};
		tbody.append("<tr><td></td><td></td><th>6% GST:</th><td>" + (Cart.total() * 0.06).toFixed(2) + "</td></tr>");
		tbody.append("<tr><td></td><td></td><th>Total:</th><td>" + (Cart.total() * 1.06).toFixed(2) + "</td></tr>");
		return table;
	}
};
Cart.Item.prototype = {
	constructor: Cart.Item,
	name: "",
	size: "",
	quantity: 0,
	price: 0,
	total: function(){
		return this.quantity * this.price;
	}
}