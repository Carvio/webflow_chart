/**
 * Utilities.
 */



/**
 * Adds opacity to an RGB value.
 */
function transparentize(color, opacity) {
  var alpha = opacity === undefined ? 1 : 1 - opacity;
  return Color(color).alpha(alpha).rgbString();
}

/**
 * Calculates percentage.
 *
 * @param part
 * @param total
 * @returns {number}
 */
function calc_percentage(part, total) {
  if (isNaN(part) && isNaN(total)) return 0;
  return (100 * part) / total;
}

/**
 * Set cookie.
 */
function setCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = '; expires=' + date.toGMTString();
  }
  else var expires = '';
  document.cookie = name + '=' + value + expires + '; path=/';
}

/**
 * Get cookie.
 */
function getCookie(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

/**
 * Erase cookie.
 */
function delCookie(name) {
  setCookie(name, '', -1);
}
