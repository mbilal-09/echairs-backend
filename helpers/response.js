const response = (res, code, message, data, error) => {
  return res.send({
    status: code,
    message,
    data,
    error,
  });
};

module.exports = response;
