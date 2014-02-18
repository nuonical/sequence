window.SwfController = {

    index: function () {
        steroids.view.navigationBar.show("Sequence");
      
    },
    
    game: function() {
        steroids.view.navigationBar.show("");
        
        
        var startButton = new steroids.buttons.NavigationBarButton();
        startButton.title = "Play";
        
        startButton.onTap = function() {   
            // Build up the sequence to use
            self.totalSteps = $("#TotalSteps").val();
            mcp.initGameSequence();
            
            mcp.startGame();    
        }; 

        steroids.view.navigationBar.setButtons({
            right: [startButton]
        });
                
        
        //steroids.on('ready', function() {
            
            document.addEventListener("touchmove", function(e) { 
                // Disable user scrolling
                e.preventDefault(); 
                
                // Play notes if currently over an element
            });
            
            document.addEventListener("deviceready",onDeviceReady,false);
            
                // Should return /www root
                function getSteroidsAbsPath() {
                    return "file://" + steroids.app.absolutePath;            
                }
                                
                function getSteroidsAppPath() {
                    return steroids.app.path;            
                }
                                
                function getSoundPath() {
                    return '/sounds/sequence/';
                }
                 
                
                // Return ios sounds path               
                function getIosSoundsPath() {
                    return window.location.origin + "/sounds/sequence/";
                }
                
                // Return android sounds path
                function getAndroidSoundsPath() {
                    return "file://" + steroids.app.absolutePath + '/sounds/sequence/';
                }
                
                // Device checking to grab correct file locations
                function getSoundsPathByDevice() {
                    var iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
                    if(iOS) {
                        return getIosSoundsPath();
                    } else {
                        return getAndroidSoundsPath();
                    }
                }
                     
                // Setup buttons with colors / sounds
                /*
                function assignColorsToSounds(fullSoundPath) {
					BUTTONS = $(".button");
                    colors = [
                        'green', 
                        'yellow',
                        'blue',  
                        'red'   
                    ];                                       
                    
                    var soundsPath = getSoundsPathByDevice();
                    
                    colors['green'] = createNewSoundObject(soundsPath + 'green.wav', 'green');
                    
                    colors['yellow'] = createNewSoundObject(soundsPath + 'yellow.wav', 'yellow');

                    colors['blue'] = createNewSoundObject(soundsPath + 'blue.wav', 'blue');

                    colors['red'] = createNewSoundObject(soundsPath + 'red.wav', 'red');
                    
                    return colors;
                }
                */
               
                // Returns a Media Object with error messaging
                // Can use .play() and other Meda functions
                // *param 'relSoundPath' is the relative path to the sound file to play.
                /*
                function createNewSoundObject(relSoundPath, assetName) {

                    // Preload the audio asset for later use
                    return new Media(relSoundPath,
                        // Success
                        function() {  
							$("#yellow").text("success");  
							$("#" + assetName).removeClass("active");
                            $(document).trigger("touchstart");                            
                        },
                        // Error
                        function(e) { 
                            //alert(relSoundPath);
                            var str = JSON.stringify(e, undefined,  2);                             
                        }
                    );                    
                }
                */
				
				function playBoxHovers(e) {
				
					var touchedIds = [];
					var touches = e.originalEvent.touches;
										
					for(var x = 0; x < touches.length; x++) {
						var touch = e.originalEvent.touches[x];
						var $el = $(document.elementFromPoint(touch.clientX, touch.clientY));
						
						$("#green").text(touch.clientX);
						
						touchedIds[x] = $el.attr("id");
					}
					
					BUTTONS.each(function() {
						var id = $(this).attr("id");
						var isHovered = touchedIds.indexOf(id) != -1;
						
						$("#red").text(touchedIds[0] + " " + isHovered);
						
						if(isHovered) {
							//alert(isHovered);
							$("#blue").text($(this).hasClass("active"));
							
							if(!$(this).hasClass("active")) {
								$(this).addClass("active");
								colors[id].play();								
							}
							
						}
						else {
							// $("#blue").text(id + " " + this).hasClass("active"));
							$(this).removeClass("active");
							colors[id].stop();
						}										
					});								
				}

                function onDeviceReady () {                            
                    
                    mcp = new mcp_class();
                    console.log('created the mcp class object');
                    
                    mcp.initGameEvents();
                    console.log('initialized game events');
                    
                    mcp.initGameSequence();
                    console.log('initialized game sequence');
                    
                    var colors = mcp.assignColorsToSounds();                
                    console.log('assigned colors to sounds');
                    
        
                    /*
                    $(document).on('touchstart', '.sequence-container .button', function(e) {
                        playBoxHovers(e);                                                                  
                    });

                    // Add touchmove listener, check coords
                    $(document).on('touchmove', '.sequence-container .button', function(e) {
                        playBoxHovers(e);                        
                    });
                    
                    // I think we may need to bind coordinates to stop playing here as well
                    $(document).on('touchend', '.sequence-container .button', function(e) {
                        playBoxHovers(e);
                    });     
                    */      
                }
        //}); // End steroids ready

        $(document).ready(function(){
            
                        
        });
    },
    
    show: function () {
    
         // Fetch a value from query parameters ?id=x
         var showId = steroids.view.params["id"];
         steroids.view.navigationBar.show("swf #" + showId);
         
         // Just to demonstrate the control flow of the application, hook your own code here
         document.addEventListener("DOMContentLoaded", function() {
           document.getElementById("show-id").textContent = showId;
         });
    
    }

};


// Handle tap events on views

document.addEventListener("DOMContentLoaded", function() {

    $(".opensLayer").hammer().on("tap", function() {
        // Create a new WebView that...
        webView = new steroids.views.WebView({ location: this.getAttribute("data-location") });
   
        // ...is pushed to the navigation stack, opening on top of the current WebView.
        steroids.layers.push({ view: webView });
     });

});