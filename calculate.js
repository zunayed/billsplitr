// typical input of function
// [{"qty":1,"price":5,"description":"beer"},{"qty":1,"price":5,"description":"burger"}]
var calculateSubtotal = function(items){
	var items_cost = 0;
	for (var i = 0; i < items.length; i++) {
		items_cost += items[i].qty * items[i].price;
	}
	var subtotal = items_cost + (items_cost * 0.18) + (items_cost * 0.08875); 
	return {itemCost: items_cost, subtotal: subtotal};
};

var calculateGroupTotal = function(group_total, user_data){
    var items = user_data.items;
    var calculated_values = calculate.calculateSubtotal(items);
    var subtotal = calculated_values.subtotal;

};

exports.calculateSubtotal = calculateSubtotal;