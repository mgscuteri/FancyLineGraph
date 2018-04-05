var app = angular.module('myApp', []);

app.controller('myCtrl', ['$scope', '$interval', function($scope, $interval) {
    $scope.firstName= "John";
    $scope.lastName= "Doe";
    $scope.x1 = 10;
    $scope.x2 = 50; 
    $scope.y1 = 10;     
    $scope.y2 = 50;
    $scope.i;
    $scope.animationSeconds;
    $scope.framesPerSecond;
    $scope.animationIntervals;
    $scope.timePerInterval;
    $scope.xInterval;
    $scope.yInterval;
    $scope.currentX;
    $scope.currentY;

    var stop;

    $scope.Draw = function(){
    	var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");		
		ctx.beginPath();
		ctx.moveTo($scope.x1,$scope.y1);	
		ctx.lineTo($scope.x2,$scope.y2);
		ctx.stroke();
		ctx.closePath()
		
		ctx.font = "11px Arial";
		ctx.fillText("x1,y1", $scope.x1 - 3, $scope.y1 - 3);
		ctx.fillText("x2,y2", $scope.x2 - 3, $scope.y2 - 3);
    }
 	
	$scope.IntervalDraw = function(){
		if (i <= $scope.animationIntervals){
	    	var c = document.getElementById("myCanvas");
			var ctx = c.getContext("2d");
			
			ctx.moveTo($scope.currentX,$scope.currentY);	
			ctx.lineTo($scope.currentX + $scope.xInterval, $scope.currentY + $scope.yInterval);	
			ctx.stroke();

			$scope.currentX = $scope.currentX + $scope.xInterval;
			$scope.currentY = $scope.currentY + $scope.yInterval;
			$scope.i ++;
 	   }
 	}

    $scope.DrawAnimated = function(){    	

    	if(angular.isDefined(stop)) return;
    	$scope.animationSeconds = 2.8
		$scope.framesPerSecond = 60;    	
		$scope.animationIntervals = ($scope.animationSeconds * $scope.framesPerSecond);
		$scope.timePerInterval = ($scope.animationSeconds/$scope.animationIntervals) * 1000;
		$scope.xInterval = (parseInt($scope.x2) - parseInt($scope.x1)) / $scope.animationIntervals;
		$scope.yInterval = (parseInt($scope.y2) - parseInt($scope.y1)) / $scope.animationIntervals;
		$scope.currentX = parseInt($scope.x1);
		$scope.currentY = parseInt($scope.y1);	    			    	
		$scope.i = 0;

		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.fillText("x1,y1", $scope.x1 - 3, $scope.y1 - 3);				    	

    	stop = $interval(function(){
    		if($scope.i <= $scope.animationIntervals){
		    	var c = document.getElementById("myCanvas");
				var ctx = c.getContext("2d");
				
				ctx.beginPath();
				ctx.moveTo($scope.currentX,$scope.currentY);	
				ctx.lineTo($scope.currentX + $scope.xInterval, $scope.currentY + $scope.yInterval);	
				ctx.stroke();
				ctx.closePath()

				$scope.currentX = $scope.currentX + $scope.xInterval;
				$scope.currentY = $scope.currentY + $scope.yInterval;
				$scope.i ++;
    		} else{
    			$scope.StopLoop();
    		}
    	}, Math.floor($scope.timePerInterval))    	
    }

	$scope.StopLoop = function(){
		if (angular.isDefined(stop)) {
			var c = document.getElementById("myCanvas");
			var ctx = c.getContext("2d");
			ctx.fillText("x2,y2", $scope.currentX - 3, $scope.currentY - 3);
			$interval.cancel(stop);
			stop = undefined;
		}
    } 

    $scope.ClearCanvas = function(){
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.fillStyle = "white";
		ctx.fillRect(0,0,600,350)
    } 
}]);


app.directive("testDir", function() {
	return{
		template : "<canvas id=\"myCanvas\" width=\"600\" height=\"350\" style=\"border:2px solid #000000;\"> </canvas>"	

	};
});



