'use strict';

(function() {
    var app = angular.module('nightlifeApp', ['ngTable']);
    
        app.factory("MyYelpAPI", function($http) {
          function randomString(length, chars) {
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
            return result;
          }
          
          return {
            "retrieveYelp": function(location, callback) {
                var method = 'GET';
                var url = 'https://api.yelp.com/v2/search';
                var params = {
                        callback: 'angular.callbacks._0',
                        location: location,
                        oauth_consumer_key: 'LgRfnUX5fUNhNL5a90m3Hg', //Consumer Key
                        oauth_token: 'hSFDXjWZ--Zfoe1un9ryi2eFS1ZhZTgw', //Token
                        oauth_signature_method: "HMAC-SHA1",
                        oauth_timestamp: new Date().getTime(),
                        oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                        category_filter: 'bars'
                    };
                var consumerSecret = '1FTuNUPFo_qMHhhwAouFBEorQJ4'; //Consumer Secret
                var tokenSecret = 'CfbzR1348MtE7cLWLsl2Zly9Gdk'; //Token Secret
                var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, { encodeSignature: false});
                params['oauth_signature'] = signature;
                console.log(params);
                $http.jsonp(url, {params: params}).success(callback);
            }
          };
        });
        
        app.controller('activityController', ['$scope', '$http', 'MyYelpAPI', function ($scope, $http, MyYelpAPI) {

        //Handle GitHub Auth
         $scope.loggedIn = false;
         var displayName = document.querySelector('#display-name');
         var apiUrl = '/api/user/:id';
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
             $scope.loggedIn = true;
           }, function errorCallback(response) {
             console.log(response);
           });
           
            //Get Venues from Yelp
            if (sessionStorage.venues) {
                $scope.venues = JSON.parse(sessionStorage.venues);
            }
            else {
                $scope.venues = [];
            }
            $scope.getActivities = function(location) {
                console.log("Looking for bars in " + location);
                MyYelpAPI.retrieveYelp(location, function(data) {
                    $scope.venues = data.businesses;
                    sessionStorage.setItem('venues', JSON.stringify(data.businesses));
                    console.log($scope.venues);
                });
            };
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