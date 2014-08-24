<html>
  <head>

    <script type="text/javascript" src="js/functions.js"></script>
    <script type="text/javascript" src="js/Entity.js"></script>
    <script type="text/javascript" src="js/Tile.js"></script>
    <script type="text/javascript" src="js/Rock.js"></script>
    <script type="text/javascript" src="js/Player.js"></script>
    <script type="text/javascript" src="js/TileMap.js"></script>
    <script type="text/javascript" src="js/Game.js"></script>

    <title>Log Analytics</title>

          <script type="text/javascript">

          // directionals
          var NORTH = 1;
          var EAST  = 2;
          var SOUTH = 3;
          var WEST  = 4;

          // consts
          var NUM_OF_ROCKS = 4;

          var MAPWIDTH  = 20;
          var MAPHEIGHT = 20;

          // map obj
          var map = new TileMap();

          // tile obj
          var tile = new Tile();

          // empty tiles array
          var tilesArray = [];

          // Full Tiles Array
          tilesArray = tile.makeTileArray();

          // rocks array
          var rocks = [];

          // Game Object
          var game = new Game();

          // for key presses
          window.addEventListener('keydown', keyDown, true);

          // key down functions
          function keyDown(e)
          {
              if(e)
              {
                  // MAIN GAME LOOP
                  game.update(e);
                  game.draw();
              }
          }

          function main()
          {
              var canvas = document.getElementById('map');
              if(canvas.getContext)
              {
                ctx = canvas.getContext('2d');
              }

              // Player Object
              var player = new Player(tilesArray, ctx);

              // populate rocks array with rock objects.
              for(var i=0; i<NUM_OF_ROCKS; i++)
              {
                  rocks.push(new Rock(tilesArray, ctx));
              }

              // MAIN GAME CONTROLLER
              game.init(map, tilesArray, player, rocks, ctx);

              // START OF GAME -not called again after the first time.
              game.draw();
              game.draw();

          }
          </script>

      <style type="text/css">
        body
        {
            background-color: black;
        }
        #wrapper
        {
            width: 50%;
            margin: auto;
        }

        canvas
        {
            border: 1px solid black;

        }
      </style>

  </head>

  <body onload="main();">
    <div id="wrapper">
         <canvas id="map" width="700" height="700">nope</canvas>
    </div>
  </body>



</html>