/**
 * Created by JetBrains PhpStorm.
 * User: inpho
 * Date: 12/9/11
 * Time: 1:48 PM
 * To change this template use File | Settings | File Templates.
 */


function Tile()
{
    var xloc;
    var yloc;
    var img;
    var width;
    var height;
    var tileDepth;
    var walkable;
    var pourable;
    var touchingTiles;
}

Tile.prototype = {

    // constructs the tileArray, used only once
    makeTileArray: function()
    {
      for(var x=0; x<MAPWIDTH; x++)
      {
          var col = [];

          for(var y=0; y<MAPHEIGHT; y++)
          {
              col.push(new Tile());
              col[y].buildTile("grass");
              col[y].getTileImage();
          }

          tilesArray.push(col);
      }

      return tilesArray;
    },

    // builds a tile with a normal depth to grass
    buildTile: function(type)
    {
        this.tileDepth = new Array();

        if(type == "dirt")
        {
            this.tileDepth.push("dirt");
        }
        if(type == "water")
        {
            this.tileDepth.push("dirt");
            this.tileDepth.push("water");
        }
        if(type == "grass")
        {
            this.tileDepth.push("dirt");
            this.tileDepth.push("grass");
        }
        if(type == "rock")
        {
            this.tileDepth.push("dirt");
            this.tileDepth.push("grass");
            this.tileDepth.push("rock");
        }
        if(type == "flower")
        {
            this.tileDepth.push("dirt");
            this.tileDepth.push("grass");
            this.tileDepth.push("flower");
        }
        if(type == "player")
        {
            this.tileDepth.push("dirt");
            this.tileDepth.push("grass");
            this.tileDepth.push("player");
        }
    },

    isTileWalkable: function()
    {
        if(this.walkable)
        {
            return true;
        }
        else
        {
            return false;
        }
    },


    isTilePourable: function()
    {
        if(this.pourable)
        {
            return true;
        }
        else
        {
            return false;
        }
    },

    setTilePourable: function()
    {
        var lastTileNumber;
        var lastTileType;

        // gets the highest tile type name
        lastTileType = this.getTileTypeName();

        if(lastTileType == "dirt")
        {
            this.pourable = true;
        }
        else
        {
            this.pourable = false;
        }
    },

    setTileWalkable: function()
    {
        var lastTileNumber;
        var lastTileType;

        // gets the highest tile type name
        lastTileType = this.getTileTypeName();

        if(lastTileType == "rock")
        {
            this.walkable = false;
        }
        else if(lastTileType == "dirt")
        {
            this.walkable = false;
        }
        else if(lastTileType == "water")
        {
            this.walkable = false;
        }
        else
        {
            this.walkable = true;
        }
    },

    setTileImage: function(cell, image)
    {
        if(image == "dirt_up")
        {
            this.img.src = "images/dirt/dirt_up.png";
        }
        if(image == "dirt_down")
        {
            this.img.src = "images/dirt/dirt_down.png";
        }
        if(image == "dirt_left")
        {
            this.img.src = "images/dirt/dirt_left.png";
        }
        if(image == "dirt_right")
        {
            this.img.src = "images/dirt/dirt_right.png";
        }
        if(image == "dirt_up_down")
        {
            this.img.src = "images/dirt/dirt_up_down.png";
        }
        if(image == "dirt_left_right")
        {
            this.img.src = "images/dirt/dirt_left_right.png";
        }
    },

    checkSurroundings: function(x, y, tilesArray, direction)
    {
        this.xloc = x;
        this.yloc = y;

        this.touchingTiles = new Array();

        // get the xy where the action is taking place (in front of the player)
        if(direction == 1 || direction == 3)
        {
            this.yloc = modifyXY(y, direction, 1);
            this.xloc = x;
        }
        if(direction == 2 || direction == 4)
        {
            this.xloc = modifyXY(x, direction, 1);
            this.yloc = y;
        }

        // create an array of the cells surrounding action cell (excludes action cell)
        var cells = getSurroundingCells(this.xloc, this.yloc, tilesArray);

        var lastTileNumber;
        var lastTileType;

        // loop through surrounding cells
        // saving the cell tyle to the touchingTiles array
        for(var i=0; i<cells.length; i++)
        {
            lastTileNumber = cells[i].tileDepth.length-1;
            lastTileType = cells[i].tileDepth[lastTileNumber];

            this.touchingTiles.push(lastTileType);
        }

        // call function to update all tile images
        this.updateSurroundingsImages(cells);
    },

    getTileTypeName: function()
    {
        lastTileNumber = this.tileDepth.length-1;
        tiletype = this.tileDepth[lastTileNumber];

        return tiletype;
    },

    updateSurroundingsImages: function(cells)
    {
        var touchTopLeft     = 0;
        var touchTopMid      = 1;
        var touchTopRight    = 2;
        var touchLeft        = 3;
        var touchRight       = 4;
        var touchBottomLeft  = 5;
        var touchBottomMid   = 6;
        var touchBottomRight = 7;

        var cellTopLeft     = 0;
        var cellTopMid      = 1;
        var cellTopRight    = 2;
        var cellLeft        = 3;
        var cellMid         = 4;
        var cellRight       = 5;
        var cellBottomLeft  = 6;
        var cellBottomMid   = 7;
        var cellBottomRight = 8;

        // works
        if(this.touchingTiles[touchTopMid] == "dirt" && this.touchingTiles[touchBottomMid] != "dirt" && this.touchingTiles[touchLeft] != "dirt" && this.touchingTiles[touchRight] != "dirt")
        {
            alert("top = dirt, bot & left & right != dirt");
            this.setTileImage(this, "dirt_up");
            cells[cellTopMid].setTileImage(cells[cellTopMid], "dirt_down");
        }

        if(this.touchingTiles[touchBottomMid] == "dirt" && this.touchingTiles[touchTopMid] != "dirt" && this.touchingTiles[touchLeft] != "dirt" && this.touchingTiles[touchRight] != "dirt")
        {
            alert("bot = dirt, top & left & right != dirt");
            this.setTileImage(this, "dirt_down");
            cells[cellBottomLeft].setTileImage(cells[cellBottomLeft], "dirt_up");
        }

        if(this.touchingTiles[touchLeft] == "dirt" && this.touchingTiles[touchRight] != "dirt")
        {
            this.setTileImage(this, "dirt_left.png");
            cells[cellLeft].setTileImage(cells[cellLeft], "dirt_right");
        }

        // o | ! | o
        // x | X | x
        // o | ! | o
        if(this.touchingTiles[touchLeft] == "dirt" && this.touchingTiles[touchRight] == "dirt" && this.touchingTiles[touchTopMid] != "dirt" && this.touchingTiles[touchBottomMid] != "dirt")
        {
            alert("left = dirt, right = dirt");
            this.setTileImage(this, "dirt_left_right");
            cells[cellLeft].setTileImage(cells[cellLeft], "dirt_right");
            cells[cellRight].setTileImage(cells[cellTopRight], "dirt_left");
        }
    },

    // called from addTileLayer & removeTileLayer
    getTileImage: function()
    {
        this.img    = new Image();
        this.width  = 32;
        this.height = 32;

        var lastTileNumber;
        var lastTileType;

        lastTileNumber = this.tileDepth.length-1;
        lastTileType = this.tileDepth[lastTileNumber];

        // sets if the tile is walkable
        this.setTileWalkable();

        // sets if the tile is pourable
        this.setTilePourable();


        if(lastTileType == "dirt")
        {
            // just for testing
            this.img.src = "images/dirt/dirt_single.png";

            // call function to determine what dirt piece to show
        }
        if(lastTileType == "water")
        {
            // just for testing
            this.img.src = "images/water/water_single.png";

            // call function to determine what water piece to show
        }
        if(lastTileType == "grass")
        {
            this.img.src = "images/grass.png";
        }

        if(lastTileType == "flower")
        {
            this.img.src = "images/flower.png";
        }


        if(lastTileType == "player")
        {
            this.img.src = "images/player/playerNORTH.png";

            /*
            // return player image
            if(this.getFacingDirection() == NORTH)
            {
            this.img.src = "images/player/playerNORTH.png";
            }
            if(player.getFacingDirection() == WEST)
            {
                this.img.src = "images/player/playerWEST.png";
            }
            if(player.getFacingDirection() == SOUTH)
            {
                this.img.src = "images/player/playerSOUTH.png";
            }
            if(player.getFacingDirection() == EAST)
            {
                this.img.src = "images/player/playerEAST.png";
            }
            */
        }


        if(lastTileType == "rock")
        {
            this.img.src = "images/rock.png";
        }

    },

    // call this to remove a tile layer
    removeTileLayer: function()
    {
        this.popTileLayer();
        this.getTileImage();
    },


    // call this to add a tile layer
    addTileLayer: function(layer)
    {
        if(layer == "flower")
        {
            this.tileDepth.push("flower");
        }
        if(layer == "water")
        {
            this.tileDepth.push("water");
        }
        if(layer == "player")
        {
            this.tileDepth.push("player");
        }
        if(layer == "rock")
        {
            this.tileDepth.push("rock");
        }


        this.getTileImage();
    },

    // called from addTileLayer & removeTileLayer
    popTileLayer: function()
    {
        this.tileDepth.pop();
    }

};



















/*
Tile.prototype.checkToUpdateDirt = function(x, y, tilesArray, direction)
{
    var newY;
    var newX;

    // get the new xy
    if(direction == 1 || direction == 3)
    {
        newY = modifyXY(y, direction, 1);
        newX = x;
    }
    if(direction == 2 || direction == 4)
    {
        newX = modifyXY(x, direction, 1);
        newY = y;
    }

    var cells = getSurroundingCells(newX, newY, tilesArray);

    var lastTileNumber;
    var lastTileType;

    var topTile;
    var bottomTile;
    var westTile;
    var eastTile;

    topTile    = cells[1].tileDepth.length-1;
    bottomTile = cells[7].tileDepth.length-1;
    westTile   = cells[3].tileDepth.length-1;
    eastTile   = cells[5].tileDepth.length-1;

    // NORTH
    if(direction == 1)
    {
        lastTileNumber = cells[1].tileDepth.length-1;
        lastTileType = cells[1].tileDepth[lastTileNumber];

        if(lastTileType == "dirt")
        {
            this.setTileImage(this, "dirt_up");
            cells[1].setTileImage(cells[1], "dirt_down");
        }
    }
    // SOUTH
    if(direction == 3)
    {
        lastTileNumber = cells[6].tileDepth.length-1;
        lastTileType = cells[6].tileDepth[lastTileNumber];

        if(lastTileType == "dirt")
        {
            this.setTileImage(this, "dirt_down");
            cells[6].setTileImage(cells[6], "dirt_up");
        }
    }
    // EAST
    if(direction == 2)
    {
        lastTileNumber = cells[5].tileDepth.length-1;
        lastTileType = cells[5].tileDepth[lastTileNumber];

        if(lastTileType == "dirt")
        {
            this.setTileImage(this, "dirt_right");
            cells[5].setTileImage(cells[5], "dirt_left");
        }

    }
    // WEST
    if(direction == 4)
    {
        lastTileNumber = cells[3].tileDepth.length-1;
        lastTileType = cells[3].tileDepth[lastTileNumber];

        if(lastTileType == "dirt")
        {
            this.setTileImage(this, "dirt_left");
            cells[3].setTileImage(cells[3], "dirt_right");
        }

    }
};
*/







