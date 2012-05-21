
define(["knockout","sammy","viewmodels/appViewModel"], function(ko, Sammy, appViewModel) {

	function initialize() {
		
		ko.applyBindings(new appViewModel);

	}
	
	return {
		initialize: initialize
	}

});