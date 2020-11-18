/**
 * Returns response object
 * @param {string} message Response message
 * @param {*} data Data to be returned
 * @param {boolean} success Status of the request
 */


function response(message, data, success) {
  return {
    message: formatMessage(message),
    data: data || null,
    success: success ? true : success
  };
}

function formatMessage(str) {
  if (!str) return ""

  // Make first letter capital
  return str.charAt(0).toUpperCase() + str.slice(1)
}

module.exports = response