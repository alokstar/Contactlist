/**
 * Created by Alok on 6/30/2016.
 */
var app= angular
            .module("mymodule",[])
            .controller("mycontroller",function ($scope,$http) {
                console.log("hello from controller");
                
                var refresh=function () {
                    $http.get('/contactlist1').success(function (responsejo) {
                        console.log("i got the data i requested");
                        $scope.people = responsejo;
                        $scope.person1="";
                    })
                };
                refresh();

                $scope.addcontact=function () {
                    console.log($scope.person1);
                    $http.post('/contactlist1',$scope.person1).success(function (responseyo) {
                        console.log(responseyo);
                        refresh();
                    });
                };

                $scope.remove=function (id) {
                    console.log(id);
                    $http.delete('/contactlist1/'+id).success(function (response) {
                        refresh();
                    })
                }
                
                $scope.edit=function (id) {
                    console.log(id);
                    $http.get('/contactlist1/'+id).success(function (response) {
                        $scope.person1=response; //very imp person1 coz we have written that in view using ng-model
                    });
                }
                
                $scope.update=function () {
                    console.log($scope.person1._id);
                    $http.put('/contactlist1/'+$scope.person1._id,$scope.person1).success(function (response) {
                        refresh();
                    })
                }
                
                $scope.deselect=function () {
                    $scope.person1="";
                }
            });