angular.module('geekShop')
.service('API', function ($http) {
  var API_URL = 'http://js-litoral-api.mybluemix.net';
  return {
    get: function (path) {
      return $http.get(API_URL + path);
    },
    post: function (path, data) {
      return $http.post(API_URL + path);
    },
    put: function (path) {
      return $http.put(API_URL + path);
    },
    delete: function (path) {
      return $http.delete(API_URL + path);
    }
  };
})

.service('Product', function (API) {
  return {
    all: function () {
      return API.get('/products');
    },
    get: function (id) {
      return API.get('/products/' + id);
    },
    getComments: function (id) {
      return API.get('/products/' + id + 'comments');
    },
    addComment: function (id, text) {
      return API.post('/products/' + id + 'comments', { product_id: id, text: text });
    }
  };
});
