const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: error.message,
  });
};

module.exports = errorHandler;
