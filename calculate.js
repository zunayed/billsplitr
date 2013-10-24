
// [{"qty":1,"price":5,"description":"beer"},{"qty":1,"price":5,"description":"burger"}]
var calculateSubtotal = function(items){
	var items_cost = 0;

	for (var i = 0; i < items.length; i++) {
		items_cost += items[i].qty * items[i].price
	};

	var subtotal = items_cost + (items_cost * .18) + (items_cost * .08875) 
	return {itemCost: items_cost, subtotal: subtotal}
}

exports.calculateSubtotal = calculateSubtotal;