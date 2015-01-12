app.controller('DesignsController', ['$scope', '$rootScope', function(scope, root) {
	//VARIABLES
		scope.designs = [];
		scope.users = {};
		scope.products = {};
		scope.manufacturers = {};
		scope.designs_limit = 50;
		scope.have_more = true;

	//FUNCTIONS
	scope.get_designs = function() {
		var content = {
			filter: {
				public: 1,
				active: 1
			},
			return: [
				'id',
				'created',
				'name',
				'product',
				'variations',
				'user'
			],
			order: ['id', 'DESC'],
			limit: '0, ' + scope.designs_limit
		};
		$.ajax({
			type: 'GET',
			url: 'php/designs.php',
			data: content,
			dataType: 'json',
			success: function(data) {
				if (data.length < scope.designs_limit) {
					scope.have_more = false;
				}
				scope.designs = data;
				$.each(scope.designs, function(i, design) {
					design.variations = JSON.parse(design.variations);
					$.each(design.variations, function(i, variation) {
						if (variation.primary) {
							design.primary = variation;
						}
					});
				});
				scope.$apply();
				console.log(scope.designs);
			},
			error: function(data) {
				console.log('error', data);
				root.error('Could not retrieve designs. Try again later.');
			}
		});
	};
	scope.get_designs();

	scope.get_users = function() {
		var content = {
			filter: {
				activated: 1,
				disabled: 0
			},
			return: [
				'loginid',
				'username',
			]
		};
		$.ajax({
			type: 'GET',
			url: 'php/users.php',
			data: content,
			dataType: 'json',
			success: function(data) {
				scope.users = {};
				$.each(data, function(i, user) {
					scope.users[user.loginid] = user;
				});
				scope.$apply();
				console.log(scope.users);
			},
			error: function(data) {
				console.log('error', data);
				root.error('Could not retrieve users. Try again later.');
			}
		});
	};
	scope.get_users();

	scope.get_manufacturer_names = function() {
		var content = {
			filter: {
				activated: 1
			},
			return: [
				'id',
				'name',
				'logo'
			]
		};
		$.ajax({
			type: 'GET',
			url: 'php/manufacturers.php',
			data: content,
			dataType: 'json',
			success: function(data) {
				scope.manufacturers = {};
				$.each(data, function(i, manufacturer) {
					scope.manufacturers[manufacturer.id] = manufacturer;
				});
				scope.$apply();
			},
			error: function(data) {
				console.log('error', data);
				root.error('Could not retrieve manufacturers. Try again later.');
			}
		});
	};
	scope.get_manufacturer_names();

	scope.get_product_names = function() {
		var content = {
			filter: {
				activated: 1
			},
			return: [
				'id',
				'name',
				'url',
				'manufacturer'
			]
		};
		$.ajax({
			type: 'GET',
			url: 'php/products.php',
			data: content,
			dataType: 'json',
			success: function(data) {
				scope.products = {};
				$.each(data, function(i, product) {
					scope.products[product.id] = product;
				});
				scope.$apply();
			},
			error: function(data) {
				console.log('error', data);
				root.error('Could not retrieve products. Try again later.');
			}
		});
	};
	scope.get_product_names();

	scope.more_designs = function() {
		var content = {
			filter: {
				public: 1,
				active: 1
			},
			return: [
				'id',
				'created',
				'name',
				'product',
				'variations',
				'user'
			],
			order: ['id', 'DESC'],
			limit: scope.designs.length + ', ' + (scope.designs.length + scope.designs_limit)
		};
		$.ajax({
			type: 'GET',
			url: 'php/designs.php',
			data: content,
			dataType: 'json',
			success: function(data) {
				if (data.length < scope.designs_limit) {
					scope.have_more = false;
				}
				$.each(data, function(i, design) {
					design.variations = JSON.parse(design.variations);
					$.each(design.variations, function(i, variation) {
						if (variation.primary) {
							design.primary = variation;
						}
					});
					scope.designs.push(design);
				});
				scope.$apply();
				console.log(scope.designs);
			},
			error: function(data) {
				console.log('error', data);
				root.error('Could not retrieve designs. Try again later.');
			}
		});
	};
}]);