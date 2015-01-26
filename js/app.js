var app = angular.module('kitePaint', ['ui.router']);

app.config(function($sceProvider) {
  // Completely disable SCE.  For demonstration purposes only!
  // Do not use in new projects.
  $sceProvider.enabled(false);
});

app.config(function($stateProvider, $urlRouterProvider){

	// For any unmatched url, send to /route1
	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('about', {
			url: '/about',
			templateUrl: 'html/pages/about.html',
			controller: 'AboutController',
			data: {
				title: 'About'
			}
		})
		.state('activate', {
			url: '/activate',
			templateUrl: 'html/pages/activate.html',
			controller: 'ActivateController',
			data: {
				title: 'Activate'
			}
		})
		.state('account', {
			url: '/account',
			templateUrl: 'html/pages/account.html',
			controller: 'AccountController',
			data: {
				title: 'Account'
			}
		})
		.state('changePassword', {
			url: '/changePassword',
			templateUrl: 'html/pages/changePassword.html',
			controller: 'ChangePasswordController',
			data: {
				title: 'Change Password'
			}
		})
		.state('contact', {
			url: '/contact',
			templateUrl: 'html/pages/contact.html',
			controller: 'ContactController',
			data: {
				title: 'Contact'
			}
		})
		.state('create', {
			url: '/create',
			templateUrl: 'html/pages/create.html',
			controller: 'CreateController',
			data: {
				title: 'Create'
			}
		})
		.state('designs', {
			url: '/designs',
			templateUrl: 'html/pages/designs.html',
			controller: 'DesignsController',
			data: {
				title: 'Designs'
			}
		})
		.state('edit', {
			url: '/edit/:type?id',
			templateUrl: 'html/pages/edit.html',
			controller: 'EditController',
			data: {
				title: 'Edit'
			}
		})
		.state('home', {
			url: '/',
			templateUrl: 'html/pages/home.html',
			controller: 'HomeController',
			data: {
				title: ''
			}
		})
		.state('manufacturer', {
			url: '/manufacturer',
			templateUrl: 'html/pages/manufacturer.html',
			controller: 'ManufacturerController',
			data: {
				title: 'Manufacturer'
			}
		})
		.state('retailer', {
			url: '/retailer',
			templateUrl: 'html/pages/retailer.html',
			controller: 'RetailerController',
			data: {
				title: 'Retailer'
			}
		})
		.state('view', {
			url: '/view?id',
			templateUrl: 'html/pages/view.html',
			controller: 'ViewController',
			data: {
				title: 'View'
			}
		});
});

if (embed) {
	verify_embed();
} else {
	if (parent !== window) {
		//don't allow embeds of site
		window.location.replace('error.php?m=embedding_prohibited');
	}
}

function verify_embed() {
	if (parent === window) {
		//don't allow embed url unless in iframe
		window.location.replace('http://kitepaint.com');
	}
	var parent_url = document.referrer;
	var parent_domain = parent_url.split('://')[1]; //take of protocol
	parent_domain = parent_domain.split('/')[0]; //take off path
	if (parent_domain.split('.').length === 3) {
		parent_domain = parent_domain.split('.')[1] + '.' + parent_domain.split('.')[2]; //take of subdomain if exists
	}
	var path = window.location.href.split('#')[1];
	if ( path !== '/edit/new?id=' + product) {
		window.location.replace('error.php?m=bed_embed_url');
	}

	//Check domain
	var content = {
		filter: {
			id: product
		},
		return: [
			'embed'
		]
	};
	$.ajax({
		type: 'GET',
		url: 'php/products.php',
		data: content,
		dataType: 'json',
		success: function(data) {
			var urls = data[0].embed.split(',');
			console.log(urls);

			if(urls.indexOf(parent_domain) < 0) {
				window.location.replace('error.php?m=bad_embed_domain');
			}
		},
		error: function(data) {
			window.location.replace('error.php?m=cannot_verify_embed_domain');
		}
	});
}

function create_cookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}

function read_cookie(name) {
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function erase_cookie(name) {
    create_cookie(name, "", -1);
}