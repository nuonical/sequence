window.SwfController = {

    index: function () {
        steroids.view.navigationBar.show("Sequence");
      
    },
    
    game: function() {
        steroids.view.navigationBar.show("Game");
        
        $(document).ready(function(){
            
            // Disable user scrolling
            document.addEventListener("touchmove", function(e) { e.preventDefault(); });
            
            // Prime audio system for instant playback
            steroids.audio.prime();
            
                
            $(document).on('touchstart', '.sequence-container .button', function() {
                var soundPath = 'sounds/sequence/' + $(this).attr('data-sound');
                steroids.audio.play(soundPath);
                $(this).addClass("active");
            });
            
            $(document).on('touchend', '.sequence-container .button', function() {
                $(this).removeClass('active');
            });

            
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