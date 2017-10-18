var app = angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http){
      $scope.data = {}
    $scope.submit = function(){
           $http({
            method: 'POST',
            url: '/distributor/login/',
            data: $scope.data
        }).then(function(rest) {
    console.log(rest.data);
  }) 
    }   
      });
   
          //  $http.post("/distributor/login", data);
