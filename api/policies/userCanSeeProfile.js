/**
 * Allow a logged-in user to see, edit and update his own profile
 */

module.exports = function(req, res, next) {

	var sessionUserMatchesId = req.session.me === req.param('id');

	// The requested id does not match the user's id,
	if (!sessionUserMatchesId) {
		req.session.flash = {
			err: {
        name: 'Authentication error',
        message: 'You must be logged in to see this page.'
      }
		}
    return res.redirect('/login');
	}
	return next();
};
