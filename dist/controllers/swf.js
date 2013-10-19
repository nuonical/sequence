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
                    colors['green'] = createNewSoundObject(soundsPath + 'green.wav');
                    
                    colors['yellow'] = createNewSoundObject(soundsPath + 'yellow.wav');

                    colors['blue'] = createNewSoundObject(soundsPath + 'blue.wav');

                    colors['red'] = createNewSoundObject(soundsPath + 'red.wav');
                    
                    return colors;
                }

                // Returns a Media Object with error messaging
                // Can use .play() and other Meda functions
                // *param 'relSoundPath' is the relative path to the sound file to play.
                function createNewSoundObject(relSoundPath) {
                    return new Media("file://" + steroids.app.absolutePath + relSoundPath,
                        // Success
                        function() {  
                            //console.log("playing sound from path : " + absSoundPath);
                        },
                        // Error
                        function(e) { 
                            alert(absSoundPath)
                            var str = JSON.stringify(e, undefined,  2); 
                            console.log(str);
                        }
                    );
                }
            
            
                function onDeviceReady () {
                                
                    
                    var steroidsPath       = getSteroidsAbsPath();
                    var soundPath          = getSoundPath();
                    var fullSoundPath      = steroidsPath + soundPath;
                    var testPath           = getSteroidsAppPath() + soundPath;
                    
                    // Using window.location.origin
                    var internetSoundsPath = getInternetSoundsPath();
                    
                    //console.log(JSON.stringify(window.location, undefined, 2));
                    
                    //var colors = assignColorsToSounds(fullSoundPath);
                    var colors = assignColorsToSounds(internetSoundsPath);
                    
                    /* 
                    test = new Media(internetSoundsPath + 'green.wav',
                        function(){ console.log('success'); },
                        function(e){ var str = JSON.stringify(e, undefined, 2); console.log(str);
                    });
                    
                    test.play();
                    */

                    TEST = createNewSoundObject("file://" + steroids.app.absolutePath + '/sounds/sequence/green.wav');
                    
                    $(document).on('touchstart', '.sequence-container .button', function() {
                        
                        var sound = $(this).attr('id');
                        colors[sound].play();

                        $(this).addClass("active");                        
                    });
                    
                    $(document).on('touchend', '.sequence-container .button', function() {
                        var sound = $(this).attr('id');
                        colors[sound].stop();
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