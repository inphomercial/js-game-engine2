/**
 * Created by JetBrains PhpStorm.
 * User: inpho
 * Date: 12/9/11
 * Time: 1:50 PM
 * To change this template use File | Settings | File Templates.
 */


Player.prototype = new Tile();
Player.prototype.constructor=Tile;
function Player(tilesArray, ctx)
{
    // player vitals
    this.maxhp       = 100;
    this.hp          = this.maxhp;
    this.isAlive     = true;
    this.direction   = 1;

    // player stats
    this.steps       = 0;
    this.stonesMoved = 0;
    this.zKilled     = 0;

    // player inventory
    this.flower      = 0;
    this.mushroom    = 0;

    // player weapons
    this.sword       = true;

    // tiles array
    this.tilesArray  = tilesArray;
    // ctx
    this.ctx         = ctx;

    // place player on map randomly
    this.spawnPlayer(tilesArray);
}

Player.getFacingDirection = function()
{
    return this.direction;
};

Player.prototype = {

    // set player on a random spot on the board used at the very start
    spawnPlayer: function(tilesArray)
    {
         // randomly get a x and y location
         this.xloc = Math.floor(Math.random() * 20);
         this.yloc = Math.floor(Math.random() * 20);

         // grab that cell
         var playerCell = getCell(this.xloc, this.yloc, tilesArray);

         // change class of cell to player
         playerCell.addTileLayer("player");
    },


    digTile: function(direction)
    {
        var x = this.xloc;
        var y = this.yloc;

        // add player to next tile layer
        var newCell = getNextCell(x, y, this.tilesArray, direction);

        //check if can dig

        if(checkIfDiggable(newCell))
        {
            // remove tile
            newCell.removeTileLayer();

            // check if any tile pieces need to change
            newCell.checkSurroundings(x, y, this.tilesArray, direction);
            //newCell.checkToUpdateDirt(x, y, this.tilesArray, direction);
        }
    },

    pourWater: function(direction)
    {
        var x = this.xloc;
        var y = this.yloc;

        // get next cell
        var newCell = getNextCell(x, y, this.tilesArray, direction);

        //check if is dirt
        if(newCell.isTilePourable())
        {
            // remove tile
            newCell.addTileLayer("water");

            // check if any water pieces need to change

        }
    },

    // main move function
    movePlayer: function(direction, spaces)
    {
        var x = this.xloc;
        var y = this.yloc;

        var newCell = getNextCell(x, y, this.tilesArray, direction);

        // check for collisions here
        // --------------------------
        // ROCK
        var tileType = newCell.getTileTypeName();
        if(tileType == "rock")
        {
            // get the xy where the action is taking place (in front of the player)
            if(direction == 1 || direction == 3)
            {
                newy = modifyXY(y, direction, 1);
                newx = x;
            }
            if(direction == 2 || direction == 4)
            {
                newx = modifyXY(x, direction, 1);
                newy = y;
            }

            for(var i=0; i<game.rocks.length;i++)
            {
                if(game.rocks[i].xloc == newx && game.rocks[i].yloc == newy)
                {
                    //alert("touched rock");
                    rocks[i].moveRock(x, y, this.tilesArray, direction);
                }
            }
        }

        // non walkable space
        if(!newCell.walkable)
        {
            console.log("cannot walk here");
            return;
        }


        // move to player x/y to new cell
        this.updatePlayerLocation(x, y, direction);

        // pop current cell
        var thisCell = getCell(x, y, this.tilesArray);
        thisCell.removeTileLayer();

        // add player to next tile layer
        newCell.addTileLayer("player");
    },


    // updates players facing direction
    // Called from updatePlayerLocation
    updatePlayerDirection: function(newDirection)
    {
        this.direction = newDirection;
    },

    // updates players current location
    // Called from movePlayer
    updatePlayerLocation: function(x, y, direction)
    {
        if(direction == NORTH)
        {
            this.updatePlayerDirection(direction);
            this.yloc--;
        }
        if(direction == EAST)
        {
            this.updatePlayerDirection(direction);
            this.xloc++;
        }
        if(direction == SOUTH)
        {
            this.updatePlayerDirection(direction);
            this.yloc++;
        }
        if(direction == WEST)
        {
            this.updatePlayerDirection(direction);
            this.xloc--;
        }
    }

};












