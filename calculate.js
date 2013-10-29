// typical input of function
// [{"qty":1,"price":5,"description":"beer"},{"qty":1,"price":5,"description":"burger"}]
exports.calculateSubtotal = function(items){
	var items_cost = 0;

	for (var i = 0; i < items.length; i++) {
		items_cost += items[i].quantity * items[i].price;
	}
	var subtotal = items_cost + (items_cost * 0.18) + (items_cost * 0.08875);
	return subtotal;
};
