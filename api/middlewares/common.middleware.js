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
  let response = {
    error: true,
    message: "The server has failed, please try again."
  }

  if(process.env.NODE_ENV === 'dev') {
    response.message = err.message;
    response.stack = err.stack;
  }
  res.status(500).json(response);
  next();
}

export function notFoundHandler(req, res, next) {
  res.status(404).json({error: "Route Not Found"});
  next();
}