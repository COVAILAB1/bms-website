export const createBMS = (req, res) => {
  res.json({
    success: true,
    status: 200,
    data: "some data",
    message: "data created successfully",
    errorMessage: "no error",
  });
};
