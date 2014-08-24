/**
 * Created by JetBrains PhpStorm.
 * User: inpho
 * Date: 12/9/11
 * Time: 1:58 PM
 * To change this template use File | Settings | File Templates.
 */

// class to build the tile map
function TileMap(ctx, tiles)
{
    var hspace;
    var vspace;
}

TileMap.prototype.buildMap = function(ctx, tilesArray)
{
    this.hspace = 32;
    this.vspace = 32;

    for(var y=0; y<tilesArray.length; y++)
    {
        var x = 0;
        //console.log(this.vspace);
        ctx.drawImage(tilesArray[x][y].img, 0, 0, tilesArray[x][y].width, tilesArray[x][y].height, this.hspace, this.vspace, tilesArray[x][y].width, tilesArray[x][y].height);

        for(var x=0; x<tilesArray.length; x++)
        {
             //console.log(this.hspace);
             ctx.drawImage(tilesArray[x][y].img, 0, 0, tilesArray[x][y].width, tilesArray[x][y].height, this.hspace, this.vspace, tilesArray[x][y].width, tilesArray[x][y].height);
             this.hspace = this.hspace + tilesArray[x][y].width;
        }

        x++;
        this.hspace = 32;
        this.vspace = this.vspace + 32;
    }
};

