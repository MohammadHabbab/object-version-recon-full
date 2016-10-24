module.exports = function(app) {

	var objectVersionController = require('../controllers/objectversion.controller');


	// Object routes
	app.route('/api')
			.get(objectVersionController.query)
			.post(objectVersionController.uploadFile)


 };
