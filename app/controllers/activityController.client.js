'use strict';

(function() {
    var app = angular.module('nightlifeApp', ['ngResource', 'ngRoute', 'ngTable']);
        app.controller('activityController', ['$scope', '$resource', '$route', '$routeParams', '$location', '$http', 'ngTableParams', function ($scope, $resource, $route, $routeParams, $location, $http, ngTableParams) {

        //Handle GitHub Auth
         var displayName = document.querySelector('#display-name');
         var loggedInMenu = document.querySelector('.loggedInMenu');
         var login = document.querySelector('.login');
         var apiUrl = '/api/:id';
      /*
         function updateHtmlElement (data, element, userProperty) {
            element.innerHTML = data[userProperty];
         }
        */ 
         // GET GitHub User Info
         $http({
           method: 'GET',
           url: apiUrl
         }).then(function successCallback(response) {
             var userObject = response.data;
             displayName.innerHTML = userObject['displayName'];
             loggedInMenu.setAttribute("style", "display: default");
             login.setAttribute("style", "display: none");
           }, function errorCallback(response) {
             console.log(response);
           });
           
            //Handle Yelp Activity Functionality
            $scope.activity = "Test Activity";
           
            var self = this;
            $scope.activities = [{venue: "Wonderbar", image: "Ooh, pretty picture."}];
            self.tableParams = new ngTableParams({}, { dataset: $scope.activities});
      }]);
            
            /*var Surveys = $resource('/api/{id}/surveys');
            var SurveyRemove = $resource('/api/{id}/surveyRemove');
            $scope.newSurveyShow = false;
            $scope.allSurveysShow = true;
            $scope.survey = {};
            $scope.choice = {};
            var allPath = $location.absUrl().split("/");
            $scope.surveyPath = allPath[allPath.length - 1];
            $scope.surveyToShow = decodeURIComponent($scope.surveyPath);
            $scope.userToShow = allPath[allPath.length - 3];
            console.log($scope.surveyToShow);
            var SurveyVote = $resource('/'+$scope.userToShow+'/survey/'+$scope.surveyPath);
            
            $scope.getSurveys = function() {
                Surveys.query(function (results) {
                    $scope.surveyTotal = results.length;
                    $scope.allSurveys = results;
                });
            };
            
            $scope.getSurveys();
            
            $scope.viewNewSurvey = function () {
              $scope.newSurveyShow = true;
              $scope.allSurveysShow = false;
              $scope.linkShow = false;
            };
            
            $scope.viewAllSurveys = function () {
              $scope.newSurveyShow = false;
              $scope.allSurveysShow = true;  
              $scope.linkShow = false;
            };

            $scope.viewLink = function () {
              $scope.newSurveyShow = false;
              $scope.allSurveysShow = false;  
              $scope.linkShow = true;
            };
            
            $scope.deleteSurvey = function (surveyName) {
                var surveyToDelete = {name: surveyName};
                console.log("Deleting " + surveyToDelete);
                SurveyRemove.save(surveyToDelete, function() {
                    $scope.getSurveys();
                });
            };
            
            $scope.addOption = function () {
                $scope.survey.surveyOptions.push({placeholder: 'New Option'});
            };
            
            $scope.survey.surveyOptions = [
                {placeholder: 'Billy'},
                {placeholder: 'Jason'}
            ];
            
            $scope.submitPoll = function () {
                var newSurvey = $scope.survey;
                console.log(newSurvey);
                Surveys.save(newSurvey, function () {
                    $scope.getSurveys();
                });
                $scope.newSurveyShow = false;
                $scope.surveyNamePath = encodeURIComponent($scope.survey.name);
                var links = document.querySelector('#surveyLink') || null;
                if (links !== null) {
                    links.setAttribute("href", links.href.replace('pollNameHere',$scope.surveyNamePath));
                }
                $scope.viewLink();
            };
            
            $scope.submitVote = function () {
                var choice = $scope.choice;
                console.log(choice);
                SurveyVote.save(choice, function () {
                    console.log("You voted, dude!");
                });
            };  
            */
})();