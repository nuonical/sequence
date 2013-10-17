window.SwfController = {

    index: function () {
        steroids.view.navigationBar.show("Sequence");
      
    },
    
    game: function() {
        steroids.view.navigationBar.show("Game");
        
        
        steroids.on('ready', function() {
            console.log('steroids app path = ' + steroids.app.path); // on iOS ~= "applications/local/123456789"
        

            // Disable user scrolling
            document.addEventListener("touchmove", function(e) { e.preventDefault(); });
            
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
                    
                    
                    colors['green'] = new Media(fullSoundPath + 'green.wav',
                        function(){  },
                        function(e){ var str = JSON.stringify(e, undefined, 2); console.log(str);
                    });
                    
                    colors['yellow'] = new Media(fullSoundPath + 'yellow.wav',
                        function(){  },
                        function(e){ var str = JSON.stringify(e, undefined, 2); console.log(str);
                    });

                    colors['blue'] = new Media(fullSoundPath + 'blue.wav',
                        function(){  },
                        function(e){ var str = JSON.stringify(e, undefined, 2); console.log(str);
                    });

                    colors['red'] = new Media(fullSoundPath + 'red.wav',
                        function(){  },
                        function(e){ var str = JSON.stringify(e, undefined, 2); console.log(str);
                    });
                    
                    return colors;
                }
            
            
                function onDeviceReady () {
                                
                    var soundPath          = getSoundPath();
                    var steroidsPath       = getSteroidsAbsPath();
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