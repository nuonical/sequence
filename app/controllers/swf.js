window.SwfController = {

    index: function () {
        steroids.view.navigationBar.show("Sequence");

    },

    game: function() {
        steroids.view.navigationBar.show("");


        var startButton = new steroids.buttons.NavigationBarButton();
        startButton.title = "Play/Reset";

        startButton.onTap = function() {
            // Build up the sequence to use
            self.totalSteps = $("#TotalSteps").val();
            $('.lostModal').addClass('hider');
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

            function onDeviceReady () {

                $('#replayBtn').click(function(){
                    $('.lostModal').addClass('hider');
                });

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

        document.addEventListener("deviceready",onShowDeviceReady,false);

        function onShowDeviceReady () {
            // Fetch a value from query parameters ?id=x
            var showId = steroids.view.params["id"];
            steroids.view.navigationBar.show('How To Play');
        }

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
