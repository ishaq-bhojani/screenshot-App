angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $cordovaFileTransfer, $ionicLoading, $cordovaInAppBrowser) {
  $scope.takeScreenShot = function () {
    window.plugins.screenshot.save(function(error,res){
      if(error){
        console.log(error);
      }else{
        $scope.progress = 0;
        $ionicLoading.show({
          template: 'Uploading Image...'
        });
        console.log('ok',res.filePath); //should be path/to/myScreenshot.jpg
        $cordovaFileTransfer.upload('http://node-image-upload.herokuapp.com/saveImage', res.filePath, {})
          .then(function(result) {
            $scope.url = result.response;
            $ionicLoading.hide();
          }, function(err) {
            console.log(err)
          }, function (progress) {
            $scope.progress= Math.round((progress.loaded * 100) / progress.total);
            console.log($scope.progress+'%');
          });
      }
    },'jpg',50,'myScreenShot');
  };
  $scope.openUrl = function () {
    var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
    };
    $cordovaInAppBrowser.open($scope.url, '_blank', options)
  }
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
