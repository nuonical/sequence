mcp_class = function () {
    this.sequence = [];    // Will hold each sequence the player must match
    this.totalSteps = 5; //  Default Max steps before winning
    this.currentStep = 1; // Keep track of step player is on
    this.UserInput = [];
    this.gameInSession = false;

};

mcp_class.prototype.initGameEvents = function () {    
  
  this.initControls();
  
};

mcp_class.prototype.initControls = function () {
    var self = this;
    
    $(document).on('touchstart touchmove touchend', '.sequence-container > div', function(e) {
        self.playBoxHovers(e);
    });
    
    $(document).on('touchstart', '.sequence-container > div', function(e) {
        e.preventDefault();
      
        // allow users to play sounds when not in game
        if(self.gameInSession){
        
            // If computer is showing the sequence to play, don't do anything
            if(self.computerIsShowing) {
                return;
            }
            
            var clickId = parseInt($(this).attr("data-id"));
            
            self.UserInput.push(clickId); 
            
            // if user input doesn't match sequence, alert / end game   
            var index = self.UserInput.length -1;
            if(self.UserInput[index] != self.sequence[index]) {
              
                // End Game
                self.UserInput = [];
                //alert("You lose!");
                $('.lostModal').removeClass('hider');
                self.gameInSession = false;
                return false;
            }
            
            // Check if the user has beaten the game
            if(self.UserInput.length == self.sequence.length) {
                alert("Congratulations! You Won!!!");
                self.UserInput = [];
                self.gameInSession = false;
                return;
            }
            
            // If we hit the last step, continue on to the next one       
            if(self.UserInput.length -1 == self.currentStep - 1) {
                self.currentStep++;
                self.UserInput = [];
              
                return self.playSequence(self.currentStep);
            }
        }      
    });  
};

mcp_class.prototype.playSequence = function (iStep) {

    var self = this;
    iStep = Number(iStep);
    var i = Number(0);
    var delay = 500;
    
    // Play up to where the user is
    self.computerIsShowing = true;
    self.counter = 0;

    // Self invoking function calls iteslf every x seconds
    (function seqLoop (i) {         

        setTimeout(function () {  
            // Make the box active
            $('.button[data-id="' + self.sequence[self.counter] + '"]').addClass("active");
            
            // play the sound
            self.colors[$('.button[data-id="' + self.sequence[self.counter] + '"]').attr('id')].play();
            
            // Stop so we don't overlap sounds, Deactivate the box in x ms
            setTimeout(function () {
                self.colors[$('.button[data-id="' + self.sequence[self.counter] + '"]').attr('id')].stop();
                $el.removeClass("active");
                self.counter++;
            }, delay);
            
            // show the count of how many turns they've taken
            var $el = $('.button[data-id="' + self.sequence[self.counter] + '"]');
                        
            // Continue playing sequence
            if (--i) {
                seqLoop(i); 
            }
            // Done with loop, change to user input state
            else {
                self.computerIsShowing = false;
            }
            
        }, delay);
        
    })(iStep);   
            
    // the computer is finished playing back the sequence
    self.computerIsShowing = false;   
         
};

mcp_class.prototype.getUserInput = function () {

    var self = this;
     
    // reset user input
    self.UserInput = [];
              
};

mcp_class.prototype.startGame = function () {

    // Reset variables on fresh game
    var self = this;
    self.currentStep = 1;
    self.gameInSession = true;
    
    // Play current sequence
    self.playSequence(self.currentStep);
    
    // This determines if we go to the next sequence or not
    self.getUserInput();
          
};

// Generates a new sequence of numbers the player must follow
mcp_class.prototype.initGameSequence = function () {

    var self = this;
    
    // total number of blocks - will be used to generate a random block for each sequence
    var iBlocks = $(".sequence-container > div").length;
    
    for(var x = 0; x < self.totalSteps; x++) {
        var seqNumber = Math.floor((Math.random()* (iBlocks)) + 1);
        this.sequence.push(seqNumber);
    }
    
};

// Setup buttons with colors / sounds
mcp_class.prototype.assignColorsToSounds = function (fullSoundPath) {

    BUTTONS = $(".button");
    this.colors = [
        'green', 
        'yellow',
        'blue',  
        'red'   
    ];                                       
    
    // pass in true for test
    var test = false;
    var soundsPath = this.pathHelpers.getSoundsPathByDevice(test);
    
    if(test){
        // Test sounds
        this.colors['green'] = this.createNewSoundObject(soundsPath + 'whahappened.wav', 'green');
        this.colors['yellow'] = this.createNewSoundObject(soundsPath + 'whipout.wav', 'yellow');
        this.colors['blue'] = this.createNewSoundObject(soundsPath + 'whitewomen.wav', 'blue');
        this.colors['red'] = this.createNewSoundObject(soundsPath + 'abides.wav', 'red');
    } else {
        this.colors['green'] = this.createNewSoundObject(soundsPath + 'green.wav', 'green');
        this.colors['yellow'] = this.createNewSoundObject(soundsPath + 'yellow.wav', 'yellow');
        this.colors['blue'] = this.createNewSoundObject(soundsPath + 'blue.wav', 'blue');
        this.colors['red'] = this.createNewSoundObject(soundsPath + 'red.wav', 'red');
    }

}

// Returns a Media Object with error messaging
// Can use .play() and other Meda functions
// *param 'relSoundPath' is the relative path to the sound file to play.
mcp_class.prototype.createNewSoundObject = function (relSoundPath, assetName) {

    // Preload the audio asset for later use
    return new Media(relSoundPath,
        // Success
        function() {   
    		$("#" + assetName).removeClass("active");
            $(document).trigger("touchstart");                            
        },
        // Error
        function(e) { 
            var str = JSON.stringify(e, undefined,  2);                             
        }
    );         
               
}

// Logic to play sounds based on user input
mcp_class.prototype.playBoxHovers = function (e) {

    var self = this;
    	
    var touchedIds = [];
    var touches = e.originalEvent.touches;
    					
    for(var x = 0; x < touches.length; x++) {
    	var touch = e.originalEvent.touches[x];
    	var $el = $(document.elementFromPoint(touch.clientX, touch.clientY));
    	
    	touchedIds[x] = $el.attr("id");
    }
    
    BUTTONS.each(function() {
    	var id = $(this).attr("id");
    	var isHovered = touchedIds.indexOf(id) != -1;
    	
    	// play the sound for this button
    	if(isHovered) {
    		if(!$(this).hasClass("active")) {
    			$(this).addClass("active");
    			self.colors[id].play();								
    		}
    	}
    	// stop playing the sound
    	else {
    		$(this).removeClass("active");
    		self.colors[id].stop();
    	}										
    });								
}

mcp_class.prototype.pathHelpers = {

    // Should return /www root
    getSteroidsAbsPath: function () {
        return "file://" + steroids.app.absolutePath;            
    },
                    
    getSteroidsAppPath: function () {
        return steroids.app.path;            
    },
                    
    getSoundPath: function () {
        return '/sounds/sequence/';
    },
     
    // test paths
    // Return ios test sounds path               
    getIosTestSoundsPath: function () {
        return window.location.origin + "/sounds/";
    },
    
    // Return android test sounds path
    getAndroidTestSoundsPath: function () {
        return "file://" + steroids.app.absolutePath + '/sounds/';
    },
     
    // Return ios sounds path               
    getIosSoundsPath: function () {
        return window.location.origin + "/sounds/sequence/";
    },
    
    // Return android sounds path
    getAndroidSoundsPath: function () {
        return "file://" + steroids.app.absolutePath + '/sounds/sequence/';
    },
    
    // Device checking to grab correct file locations
    getSoundsPathByDevice: function (test) {
        var iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
        if(iOS) {
            if(test){
                return this.getIosTestSoundsPath();
            }
            return this.getIosSoundsPath();
        } else {
            if(test){
                return this.getAndroidTestSoundsPath();
            }
            return this.getAndroidSoundsPath();
        }
    }
};