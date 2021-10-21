import '@testing-library/jest-dom';
// import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";
Date.prototype.toJSONLocal = (function () {
  function addZ(n) {
    return (n < 10 ? '0' : '') + n;
  }
  return function () {
    return this.getFullYear() + '-' +
      addZ(this.getMonth() + 1) + '-' +
      addZ(this.getDate()) + 'T' +
      addZ(this.getHours()) + ':' +
      addZ(this.getMinutes()) + ':' +
      addZ(this.getSeconds())
  };
}());