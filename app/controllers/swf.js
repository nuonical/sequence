window.SwfController = {

    index: function () {
        steroids.view.navigationBar.show("Sequence");
      
    },
    
    game: function() {
        steroids.view.navigationBar.show("Game");
        
        
        steroids.on('ready', function() {
            
            console.log('steroids app path = ' + steroids.app.path); // on iOS ~= "applications/local/123456789"
        
            document.addEventListener("touchmove", function(e) { 
                // Disable user scrolling
                e.preventDefault(); 
                
                // Play notes if currently over an element


            });
            
            document.addEventListener("deviceready",onDeviceReady,false);
            
                // Helper console log method
                function logJson(e) {
                    var str = JSON.stringify(e, undefined, 2);
                    console.log(str);
                }
            
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
                
                
                function getInternetSoundsPath() {
                    return window.location.origin + "/sounds/sequence/";
                }
                
                
                function assignColorsToSounds(fullSoundPath) {
                    var colors = [
                        'green', 
                        'yellow',
                        'blue',  
                        'red'   
                    ];
                    
                    for(var x = 0; x < colors.length; x++ ) {
                        // This should work if all colors are .wav files : 
                        //colors[x] = createNewSoundObject(fullSoundPath + colors[x] + '.wav');
                    }
                    
                    var soundsPath = getSoundPath();
                    colors['green'] = createNewSoundObject(soundsPath + 'green.wav', 'green');
                    
                    colors['yellow'] = createNewSoundObject(soundsPath + 'yellow.wav', 'yellow');

                    colors['blue'] = createNewSoundObject(soundsPath + 'blue.wav', 'blue');

                    colors['red'] = createNewSoundObject(soundsPath + 'red.wav', 'red');
                    
                    return colors;
                }

                // Returns a Media Object with error messaging
                // Can use .play() and other Meda functions
                // *param 'relSoundPath' is the relative path to the sound file to play.
                function createNewSoundObject(relSoundPath, assetName) {

                    // Preload the audio asset for later use
                    PGLowLatencyAudio.preloadAudio(assetName, relSoundPath, 1);
                    /*
                        return new Media("file://" + steroids.app.absolutePath + relSoundPath,
                            // Success
                            function() {  
                                //console.log("playing sound from path : " + absSoundPath);
                            },
                            // Error
                            function(e) { 
                                alert(relSoundPath);
                                var str = JSON.stringify(e, undefined,  2); 
                                console.log(str);
                            }
                        );
                    */
                }

                function onDeviceReady () {
                                
                    
                    var steroidsPath       = getSteroidsAbsPath();
                    var soundPath          = getSoundPath();
                    var fullSoundPath      = steroidsPath + soundPath;
                    var testPath           = getSteroidsAppPath() + soundPath;
                    
                    // Using window.location.origin
                    var internetSoundsPath = getInternetSoundsPath();
                    
                    //var colors = assignColorsToSounds(fullSoundPath);
                    var colors = assignColorsToSounds(internetSoundsPath);

                    //TEST = createNewSoundObject("file://" + steroids.app.absolutePath + '/sounds/sequence/green.wav');
                    
                    $(document).on('touchstart', '.sequence-container .button', function() {
                        
                        // Play the preloaded sound
                        var sound = $(this).attr('id');
                        PGLowLatencyAudio.play(sound);

                        //colors[sound].play();
                        

                        $(this).addClass("active");
                                            
                    });

                    // Add touchmove listener, check coords
                    $(document).on('touchmove', '.sequence-container .button', function(e) {
                        // Don't play if already playing
                        if($(this).hasClass('active')) {
                            return;
                        }

                        // Check if moved over an item that isn't already playing
                        var touch = e.originalEvent.touches[0];
                        var $el = $(document.elementFromPoint(touch.clientX, touch.clientY));

                        if(!$el.hassClass("active")) {
                            $el.addClass("active");    
                            var sound = $(this).attr('id');
                            PGLowLatencyAudio.play(sound);
                        }
                    });
                    
                    // I think we may need to bind coordinates to stop playing here as well
                    $(document).on('touchend', '.sequence-container .button', function() {
                        var sound = $(this).attr('id');
                        //colors[sound].stop();
                        PGLowLatencyAudio.stop(sound);

                        $(this).removeClass('active');
                    });
            
                }
        }); // End steroids ready

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