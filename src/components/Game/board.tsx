import React from "react";
import { BoardProps } from "boardgame.io/react";
import { GameState, CellStates, MapCoord, GameCell } from "./types";
import { indexToCoord } from "./logic";

// Map Rendering parameters
const map_width = 700;
const map_height = 400;
const cell_width = 200;
const cell_height = 75;
const padding = 5;

function getCellContents(
  states: CellStates[], 
  players: number[]): {
    states: string, 
    players: string
  } {
  var state_str: string = '';
  states.forEach((s, i) => {
    state_str += `${s}` + (i === states.length-1 ? '' : ', '); 
  })
  var player_str: string = '';
  players.forEach((p, i) => {
    player_str += `${p}` + (i === players.length-1 ? '' : ',');
  })
  return {
    states: state_str,
    players: player_str
  };
}

function createDisplay(G: GameState): JSX.Element {
  function createDisplayCell(game_cell: GameCell): JSX.Element {
    const coord = indexToCoord(game_cell.id) as MapCoord;
    // Tile the map cells:
    //   0
    //  1 2
    // 3 4 5
    //  6 7
    //   8
    const num_row_cells = 3 - Math.abs(coord.x - 2);
    const leftmost_edge = (map_width - num_row_cells * (cell_width + padding)) / 2;
    const statesAndPlayers = getCellContents(game_cell.states, game_cell.players);
    return <div style={{
                  border: '1px solid black',
                  lineHeight: 0,
                  textIndent: 5,
                  width: cell_width + 'px',
                  height: cell_height + 'px',
                  position: 'absolute',
                  left: (leftmost_edge + coord.y * (cell_width + padding)) + 'px',
                  top: (padding + coord.x * (cell_height + padding)) + 'px',
                }}
                key={game_cell.id}>
              <p>Cell: {game_cell.id}</p>
              <p>States: {statesAndPlayers.states}</p>
              <p>Player: {statesAndPlayers.players}</p>
            </div>;
  };
  return <div style={{
                width: map_width + 'px',
                height: map_height + 'px',
                position: 'relative',
              }}>
            { G.cells.map(createDisplayCell) }
          </div>;
}

const MyBoard = ({G, ctx, moves, isActive}: BoardProps<GameState>) => {
  return (
    <div>
      <div className="row flex-center">
        <div className="col no-padding">
          { createDisplay(G) }
        </div>
      </div>
    </div>
  );
};

export default MyBoard;
