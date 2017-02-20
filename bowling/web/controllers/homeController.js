   
var LAST_FRAME = 9;

var Player = function (name) {
	this.name = name;
	this.rolls = [];
	this.round = 0;
	this.reset();
};

Player.prototype.reset = function() {
	this.round = 0;
	for (var i=0;i<23;i++) {
		this.rolls[i]=0;
	}
};

Player.prototype.currentFrame = function() {

    if (this.round > 18) {
    	return LAST_FRAME;
    }
	return ( this.round - this.round % 2 ) / 2 ;
};

Player.prototype.currentChance = function() {

	if (this.round>18) { 
		return this.round -18; 
	}
	return this.round % 2;
};

Player.prototype.numberOfChanceInFrame = function(f) {
	
	if ( f === LAST_FRAME ) {
		return 3;	
	} 
	return 2;
};

Player.prototype.numberOfChanceInCurrentFrame = function() { 
	
	return this.numberOfChanceInFrame(this.currentFrame());
};

Player.prototype.gameIsOver = function() {

	if (this.round<=19) { return false;}

	//xx var f = this.currentFrame();
	if (this.round === 20	) {
		if (this.rolls[this.round-2]==10) {
			return false;
		}
	}
	return true;

};
/**
 *  records the number of pin knocked down by the player
 *  and update current round counter accordingly.
 *  the function will throw if number of pin is incompatible with 
 *  number of standing pins
 */
Player.prototype.roll  = function (pin) {
	
	if (this.gameIsOver() ) {
		console.log("round = "  + this.round + " "+ JSON.stringify(this.rolls));
		alert(" Game is over");
	}
	if (pin <0 || pin >10) {
		alert("Invalid number of pin");
	}

	if (pin > this.standingPin() ) {
		alert("Not so many standing pin");	
	}

	this.rolls[this.round] = pin;

	if (pin == 10 && this.round < 17) {
		this.round++; // no need to play second round in frame
	}

	this.round++;
};

Player.prototype.standingPin  = function () {

	// returns the number of standing pins
	if (this.round%2 ==0) { 
		return 10;
	}
	
	if (this.round == 19  && this.rolls[this.round-1]==10) {
	   // last round
	   return 10;
	}
	return 10 - this.rolls[this.round-1];
};


Player.prototype.frameIsStrike = function (f) {

	return this.rolls[f*2] === 10;
};

Player.prototype.frameIsSpare = function (f) {

	return !this.frameIsStrike(f) && (this.rolls[f*2] + this.rolls[f*2+1] === 10);
};

Player.prototype.frameIsNormal = function (f) {
	
	return  (this.rolls[f*2] + this.rolls[f*2+1] < 10);
};


Player.prototype.frameText = function (f,i) {
	
	if ((f*2+i)>=this.round) {
		return ".";	
	}
	if (this.frameIsStrike(f) && f<9) {
		if (i==0) { return "" }
		return "X";
	}
	if (this.frameIsSpare(f)) {
		if (i==0) { return this.rolls[f*2] }
		return "/";
	}
	return this.rolls[f*2+i];
};

/**
 *  3 2 | 10  - | 10 
 */
Player.prototype.frameScore = function (f) {

	var score = 0;

	if (f === LAST_FRAME )  {
		
		score += this.rolls[f*2] + this.rolls[f*2+1] + this.rolls[f*2+2];

	} else if (this.frameIsStrike(f)) {

		if (this.frameIsStrike(f+1) ) {

			score += 20 + this.rolls[(f+2)*2];
		} else {
			score += 10 + this.rolls[(f+1)*2] + this.rolls[(f+1)*2+1];
		}

	} else if (this.frameIsSpare(f)) {

		score += 10 + this.rolls[(f+1)*2];

	} else {

		score += this.rolls[f*2] + this.rolls[f*2+1];

	}
	return score;
};




Player.prototype.scoreString = function() {

	var r = [];
	for (var f =0;f < 10 ; f++ ) {
		r.push(this.frameText(f,0));
		r.push(this.frameText(f,1));
	}
	r.push(this.frameText(9,2));
	return r;
};


Player.prototype.score = function(maxFrame) {

	var score = 0;
	
	maxFrame = (maxFrame == null ) && 10;

	for (var f =0;f < maxFrame ; f++ ) {
		score += this.frameScore(f);
	}
	return score;
};


var Game = function() {
	this.round   = 0;
	this.currentPlayerIndex = 0;
	this.players = [];
	this.reset();
};

Game.prototype.roll = function(pin) {

	this.currentPlayer().roll(pin);

	if (this.currentPlayer().currentChance() ===0 || this.currentPlayer().gameIsOver()) {
		this.currentPlayerIndex ++;
		if (this.currentPlayerIndex >= this.players.length ) {
		    this.round += 1;
		    this.currentPlayerIndex = 0;
		}		
	}
};

function randint(maxValue) {
    return Math.floor(Math.random() * maxValue + 1)
}

Game.prototype.roll_rnd= function() {

    nbPin = randint(this.currentPlayer().standingPin());
    this.roll(nbPin)
};


Game.prototype.reset = function()	{
	this.round =0;
	this.currentPlayerIndex = 0;
	this.players.forEach(function(player){ player.reset(); })
};





Game.prototype.status = function() {
	if (this.players.length === 0 ) {
		return "new";
	}
	if (this.round == 0  && 
		this.currentPlayerIndex ==0 && 
		this.currentPlayer().currentChance() == 0) {
		return "ready";
	}
	if (this.currentPlayer().gameIsOver()) {
		return "completed";
	}
	return "in progress";
};

Game.prototype.addPlayer = function (name) {

	if(this.findPlayer(name) !== undefined) {
		throw new Error("Player already inserted");
	}
 	this.players.push( new Player(name));
};

Game.prototype.currentPlayer = function() {

	return this.players[this.currentPlayerIndex];
};

Game.prototype.findPlayer = function (name) {

	var player = undefined;
	this.players.forEach(function (p) { if (p.name === name ) {player = p; }});
	return player;
};

   app.controller('homeController', ['$scope', '$http', function($scope, http){

   		$scope.pin = 0;

		$scope.game = new Game();
		$scope.game.stages = [0,1,2,3,4,5,6,7,8,9]
		
		$scope.baseUrl = 'http://localhost:53842/api/';

		$scope.isActivePlayer = function(player) {
			return player.name == this.game.currentPlayer().name;
		}


		$scope.saveGameScore = function() {
			var scop = $scope.game;
			if($scope.game.players && $scope.game.players.length > 0){
				angular.forEach($scope.game.players, function(player){
					var details = calculateDetails(player);

					if(player.round < 1){
						alert('Please play the game');
						return;
					}

					var obj = {
						Name : player.name,
						Score : details.count,
						ScoreDetails : JSON.stringify(details.data)
					};
					httpFun('POST', $scope.baseUrl + 'Bowling', obj).then(function(response, status, header, config){
						alert('Saved the records in our database');
					})
				})
			}
			
			
		};

		function httpFun(method, url, data){
			var httpRequest = {};
			httpRequest.url = url;
            httpRequest.method = method;
            httpRequest.headers = {
                'Content-Type': 'application/json;charset=utf-8',
            };

            httpRequest.data = data;
            return http(httpRequest);
		}

		function calculateDetails(player){
			var data = []
			var total = 0;
			for(var i = 0; i <= player.round; i++){
				total = total + player.rolls[i];
				var obj = {};
				obj['round'+( i+1)] = player.rolls[i];
				data.push(obj);
			}
			return {data : data, count : total};
		}


   }])
