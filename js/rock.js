/**
 * Created by JetBrains PhpStorm.
 * User: inpho
 * Date: 12/16/11
 * Time: 11:22 AM
 * To change this template use File | Settings | File Templates.
 */


Rock.prototype = new Tile();
Rock.prototype.constructor=Tile;
function Rock(tilesArray, ctx)
{
    // player vitals
    this.maxhp       = 5;
    this.hp          = this.maxhp;
    this.isAlive     = true;

    // tiles array
    this.tilesArray  = tilesArray;
    // ctx
    this.ctx         = ctx;

    // place rock on map randomly
    this.spawnRock(this.tilesArray);
}


Rock.prototype = {

    // set rock on a random spot on the board
    spawnRock: function(tilesArray)
    {
         // randomly get a x and y location
         this.xloc = Math.floor(Math.random() * MAPWIDTH);
         this.yloc = Math.floor(Math.random() * MAPHEIGHT);

         // grab that cell
         var rockCell = getCell(this.xloc, this.yloc, tilesArray);

         // change class of cell to player
         rockCell.addTileLayer("rock");
    },

    moveRock: function(x, y, tilesArray, direction)
    {
        // get cell where rock currently is
        var whereRockCurrentlyIs = getNextCell(x, y, tilesArray, direction);

        // move rock to new cell
        // pop rock from this tile
        whereRockCurrentlyIs.removeTileLayer();

        // get next cell again, push new cell w/ rock
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

        // get cell to where the rock is going to be moving
        var whereRockIsMoving = getNextCell(newx, newy, tilesArray, direction);

        // update rock objects' location
        this.updateRockLocation(newx, newy, direction);

        whereRockIsMoving.addTileLayer("rock");

    },

    updateRockLocation: function(x, y, direction)
    {
        if(direction == NORTH)
        {
            this.yloc--;
        }
        if(direction == EAST)
        {
            this.xloc++;
        }
        if(direction == SOUTH)
        {
            this.yloc++;
        }
        if(direction == WEST)
        {
            this.xloc--;
        }
    }


};