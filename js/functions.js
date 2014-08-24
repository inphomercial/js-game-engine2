/**
 * Created by JetBrains PhpStorm.
 * User: inpho
 * Date: 12/9/11
 * Time: 9:08 AM
 * To change this template use File | Settings | File Templates.
 */

function getSurroundingCells(x, y, tilesArray)
{
    var cells = new Array();

    cells.push(getCell(x-1, y-1, tilesArray)); // top left
    cells.push(getCell(x, y-1, tilesArray));   // top middle
    cells.push(getCell(x+1, y-1, tilesArray)); // top right
    cells.push(getCell(x-1, y, tilesArray));   // mid left
    cells.push(getCell(x+1, y, tilesArray));   // mid right
    cells.push(getCell(x-1, y+1, tilesArray)); // bot left
    cells.push(getCell(x, y+1, tilesArray));   // bot mid
    cells.push(getCell(x+1, y+1, tilesArray)); // bot right

    return cells;
}

// modifys the x or y depending on the direction and distance
function modifyXY(xy, direction, distance)
{

    if(direction == 1 || direction == 4)
    {
        xy = xy - distance;
    }
    if(direction == 2 || direction == 3 )
    {
        xy = xy + distance;
    }

    return xy;
}


// gets the tile object
function getCell(x, y, tilesArray)
{
    var cell = tilesArray[x][y];

    return cell;
}

function getNextCell(x, y, tilesArray, direction)
{
    var cell;

    if(direction == NORTH)
    {
        cell = getCell(x, y-1, tilesArray);
        return cell;
    }
    if(direction == EAST)
    {
        cell = getCell(x+1, y, tilesArray);
        return cell;
    }
    if(direction == SOUTH)
    {
        cell = getCell(x, y+1, tilesArray);
        return cell;
    }
    if(direction == WEST)
    {
        cell = getCell(x-1, y, tilesArray);
        return cell;
    }
}

function checkIfDiggable(cell)
{
    var diggable;
    diggable = false;

    if(cell.tileDepth.length>1)
    {
        diggable = true;
    }

    return diggable;
}

