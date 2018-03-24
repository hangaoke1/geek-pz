const setCookie = function (name, value, expiredays) {
  let exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = name + '=' + escape(value) +
       ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString());
};

const getCookie = function(name) {
  let start, end;
  if (document.cookie.length > 0) {
    let start = document.cookie.indexOf(name + '=');
    if (start != -1) {
      start = start + name.length + 1;
      end = document.cookie.indexOf(';', start);
      if (end == -1) {
        end = document.cookie.length;
      }
      return unescape(document.cookie.substring(start, end));
    }
  }
  return null;
};
function removeCookie(name, path, domain) {
  if( getCookie(name) ) {
    document.cookie = name + '=' +
      ((path) ? ';path='+path:'')+
      ((domain)?';domain='+domain:'') +
      ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
  }
}

export default {
  getCookie,
  setCookie,
  removeCookie
};
