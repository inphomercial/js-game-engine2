/**
 * Created by JetBrains PhpStorm.
 * User: inpho
 * Date: 12/9/11
 * Time: 4:06 PM
 * To change this template use File | Settings | File Templates.
 */



function Game()
{
    var map;
    var tilesArray;
    var player;
    var ctx;
    var keys;
    var rocks;
}

Game.prototype = {

    init: function(map, tilesArray, player, rocks, ctx)
    {
        this.map = map;
        this.tilesArray = tilesArray;
        this.player = player;
        this.rocks = rocks;
        this.ctx = ctx;

        // is this just to test the hole already?
        var c = getCell(8, 8, this.tilesArray);
        c.removeTileLayer();

          // is this just to test the hole already?
        var c = getCell(3, 4, this.tilesArray);
        c.addTileLayer('flower');

        var c = getCell(2, 5, this.tilesArray);
        c.removeTileLayer();
    },

    update: function(e)
    {
        // w
        if(e.keyCode == 87)
        {
            this.player.movePlayer(NORTH, 1);
        }

        // a
        if(e.keyCode == 65)
        {
            this.player.movePlayer(WEST, 1);
        }

        // s
        if(e.keyCode == 83)
        {
            this.player.movePlayer(SOUTH, 1);
        }

        // d
        if(e.keyCode == 68)
        {
            this.player.movePlayer(EAST, 1);
        }

        // space
        if(e.keyCode == 32)
        {
            this.player.digTile(this.player.direction);
        }

        // p
        if(e.keyCode == 80)
        {
            this.player.pourWater(this.player.direction);
        }

    },

    // redraws the entire map view
    draw: function()
    {
        this.map.buildMap(this.ctx, this.tilesArray);
    }


};

