angular.module('geekShop')
.controller('ProductsCtrl', function (Product, $scope) {
  $scope.loading = true;

  Product.all()
  .success(function (products) {
    $scope.products = products;
  })
  .error(function () {
    $scope.error = 'An error has occurred trying to get the product list';
  })
  .finally(function () {
    $scope.loading = false;
  });
});
