const smAddElement = function (parent, tag, text, classname) {
  const elem = document.createElement(tag);
  if (text) {
    elem.innerText = text;
  }
  if (classname) {
    elem.className = classname;
  }
  parent.append(elem);
  return elem;
};

STRINGIFY = (obj) => {
  let seen = [];
  return JSON.stringify(obj, function(key, val) {
    if (val != null && typeof val == "object") {
      if (seen.indexOf(val) >= 0) {
        return;
      }
      seen.push(val);
    }
    return val;
  });
}
