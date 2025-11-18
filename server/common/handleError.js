function handleError(error, res) {
  if (error && error.isClientError) {
    return res
      .status(error.statusCode || 400)
      .json({ status: false, message: error.message || "Client Error" });
  }

  return res
    .status(500)
    .json({ status: false, message: "Internal Server Error" });
}

module.exports = { handleError };
