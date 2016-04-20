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
})

.controller('ProductCtrl', function (Product, $scope, $stateParams) {
  $scope.loading = true;

  Product.get($stateParams.id)
  .success(function (product) {
    $scope.product = product;
    $scope.loading_comments = true;

    Product.getComments(product.id)
    .success(function (comments) {
      $scope.product.comments = comments;
    })
    .error(function () {
      $scope.error_comments = 'An error has occurred trying to get the comments';
    })
    .finally(function () {
      $scope.loading_comments = false;
    });
  })
  .error(function () {
    $scope.error = 'An error has occurred trying to get the product';
  })
  .finally(function () {
    $scope.loading = false;
  });

  $scope.postComment = function (id, text) {
    $scope.error_submitting = null;
    $scope.submitting = true;
    Product.addComment(id, text)
    .success(function (comment) {
      $scope.product.comments.push(comment);
      $scope.text = '';
    })
    .error(function () {
      $scope.error_submitting = 'An error has occurred trying to post your comment';
    })
    .finally(function () {
      $scope.submitting = false;
    });
  };
});
