var data;
var baseUrl = 'https://api.spotify.com/v1/search?type=artist&query='
var myApp = angular.module('myApp', [])

var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.audioObject = {}
  $scope.getSongs = function() {
    link = baseUrl + $scope.album;
    $http.get(baseUrl + $scope.album).success(function(response){
      var id = response.artists.items[0].id
      var albumURL = 'https://api.spotify.com/v1/artists/' + id + '/albums'

      $http.get(albumURL).success(function(response){
        data = $scope.albums = response.items;
        
        console.log(data);
        console.log(albumURL);

      })
    })
  }

  $scope.play = function(song) {
    if($scope.currentSong == song) {
      $scope.audioObject.pause()
      $scope.currentSong = false
      return
    }
    else {
      if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
      $scope.audioObject = new Audio(song);
      $scope.audioObject.play()  
      $scope.currentSong = song
    }
  }
})

// Add tool tips to anything with a title property
$('body').tooltip({
    selector: '[title]'
});
