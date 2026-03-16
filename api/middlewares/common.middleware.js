export function controllerHandler(controller) {
    return async (req, res, next) => {
        try {
            await controller(req, res, next);
        } catch (error) {
            console.error(error);
            next(error);
        }
    };
}
export function errorHandler(err, req, res, next) {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        message: err.message || "Une erreur interne est survenue",
        stack: process.env.NODE_ENV === "development" ? err.stack : {}
    });
}