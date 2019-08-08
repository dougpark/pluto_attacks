/**************************************************************************************
* CheckOrientation State
* @author Doug Park
* @version v1.0
* @desc On mobile force landscape orientation
* @date 2018-08-25
**************************************************************************************/
"use strict";    

BasicGame.CheckOrientation = function (game) {

};

BasicGame.CheckOrientation.prototype = {

	create: function () {
	},

	update: function () {
        if (BasicGame.orientated) {
            this.state.start('Preloader');
        }
	}

};
