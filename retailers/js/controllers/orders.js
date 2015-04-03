app.controller('OrdersController', ['$scope', '$rootScope', function(scope, root) {

	//variables
	scope.orders = [];
	scope.users = {};
	scope.products = {};
	scope.manufacturers = {};

	//functions
	scope.get = {
		orders: function() {
			console.log('orders');
		},
		users: function() {
			console.log('users');
		},
		products: function() {
			var data = {
				filter:{activated: 1},
				return: [
					'id',
					'name',
					'manufacturer'
				]
			};
			$.ajax({
				type: 'GET',
				url: '../php/products.php',
				dataType: 'json',
				data: data,
				success: function(data) {
					scope.products = {};
					$.each(data, function(i, product) {
						product.id = parseInt(product.id);
						product.manufacturer = parseInt(product.manufacturer);
						scope.products[product.id] = product;
					});
					scope.$apply();
					console.log(scope.products);
				},
				error: function(data) {
					console.log('error', data);
				}
			});
		},
		manufacturers: function() {
			var data = {
				filter:{activated: 1},
				return: [
					'id',
					'name'
				]
			};
			$.ajax({
				type: 'GET',
				url: '../php/manufacturers.php',
				dataType: 'json',
				data: data,
				success: function(data) {
					var manufacturers = {};
					$.each(data, function(i, manufacturer) {
						manufacturers[manufacturer.id] = manufacturer.name;
					});
					scope.manufacturers = manufacturers;
					scope.$apply();
				}
			});
		}
	};
	$.each(scope.get, function(i, go) {
		go();
	});

}]);