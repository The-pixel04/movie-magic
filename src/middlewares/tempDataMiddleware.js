export const tempData = (req, res, next) => {
    res.setError = (message) => {
        req.session.error = {
            message,
            isFirstRequest: true,
        }
    }

    if (!req.session.error) {
        return next();
    }

    if (!req.session.error.isFirstRequest) {
        req.session.error = null;
        return next();
    }

    if (req.session.error.isFirstRequest) {
        req.session.error.isFirstRequest = false;
        res.locals.error = req.session.error;
    } else {
        req.session.error = null;
    }

    next();
}