const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404).json({
    status: 'error',
    message: error.message
  });
};

module.exports = notFound;
