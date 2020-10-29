describe('JoinQuizController', function () {
    var $scope, mockPlayService;
    beforeEach(module('app'));
    beforeEach(inject(function ($controller, $rootScope, PlayService) {
        $scope = $rootScope.$new();
        mockPlayService = PlayService;
        $controller('JoinQuizController', {$scope: $scope, PlayService: mockPlayService});
    }));

    it('should place a join() function in the scope', function() {
        expect($scope.join).toBeDefined();
    });

    it('should join quiz when button clicked', async function() {
        spyOn(mockPlayService, "joinQuiz");
        $scope.roomCode = '1234';
        $scope.playerName = 'Fred';
        await $scope.join();
        expect(mockPlayService.joinQuiz).toHaveBeenCalledWith('1234', 'Fred');
    });

    it('should show error when join quiz call fails', async function() {
        spyOn(mockPlayService, "joinQuiz").and.throwError(new Error('Room not found'));
        $scope.roomCode = '1234';
        $scope.playerName = 'Fred';
        await $scope.join();
        expect($scope.status).toBe('error');
        expect($scope.error).toBe('Room not found');        
    });
});