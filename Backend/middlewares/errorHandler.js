export const errorHandler = (err, req, res, next) => {
  res.json({
    success: false,
    message: err.message || "No Error Message",
    status: err.statusCode || 200,
    data: {},
  });
};
