const errorHandler = (err, req, res, next) => {
  const error = res.statusCode === 200 ? 400 : res.statusCode;
  res.status(error);

  res.json({
      message: err.message,
      error: true,
      stack: process.env.NODE_ENV === 'DEVELOPMENT' ? err.stack : null
  });
}

module.exports = {
  errorHandler
}
