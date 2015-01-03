﻿app.controller('voteController', function ($scope, $http, $routeParams, $location) {

    $http.get("Poll/" + $routeParams.pollId)
        .then(onPollAvailable);
    
    function onPollAvailable(response) {
        $scope.poll = response.data;
    }

    $scope.vote = function () {

        var data = {
            PollId: $routeParams.pollId,
            OptionIds: []
        };

        $scope.poll.options.forEach(function(option) {
            if (option.checked === true) {
                data.OptionIds.push(option.id);
            }
        });

        $http.post('Vote', data)
            .success(onVoted);
    };

    function onVoted() {
        $location.path("/" + $routeParams.pollId + "/results");
    }
    
});