Cart = {
	items: [],
	newItem: function(){
		return {name:"", size:"", quantity:0, price:0.0};
	},
	add: function(item){
		Cart.items.push(item)
		$.cookie("bsd-cart", JSON.stringify(Cart.items));
	},
	remove: function(index){
		Cart.items.splice(index, 1);
		$("#details").html("");
		$("#details").append(Cart.details());
		if(Cart.items.length == 0){
			$("#pay").hide();
		}
		$.cookie("bsd-cart", JSON.stringify(Cart.items));
	},
	total: function(){
		total = 0;
		for(var i = 0; i < Cart.items.length; i++){
			total += Cart.items[i].price * Cart.items[i].quantity;
		}
		return total;
	},
	details: function(){
		var cart = $(document.createElement('div'));
		if(Cart.items.length == 0){
			cart.append("<label>You doesn't have anything in your cart.</label>");
			return cart;
		}
		var total = 0;
		for(var i = 0; i < Cart.items.length; i++){
			var item = $(document.createElement('div'));
			item.append("<p><label>Name: " + Cart.items[i].name + "</label></p>");
			item.append("<p><label>Size: " + Cart.items[i].size + "</label></p>");
			item.append("<p><label>Quantity: " + Cart.items[i].quantity + "</label></p>");
			item.append("<hr/>");
			item.append("<div style='float:left;'><label>Subtotal: RM " +
						(Cart.items[i].price * Cart.items[i].quantity).toFixed(2) + "</label></div>");
			item.append("<button type='button' class='btn btn-default' style='float:right;' "+
						"onclick='Cart.remove(" + i + ")'>Remove</button>");
			item.append("<div style='clear:both'></div>");
			total += Cart.items[i].price * Cart.items[i].quantity;
			cart.append(item);
			cart.append("<hr/>");
		}
		cart.append("<p><label id='total'>Total: RM " + total.toFixed(2) + "</label></p>");
		return cart;
	}
};
if($.cookie("bsd-cart")){
	Cart.items = JSON.parse($.cookie("bsd-cart"));
}