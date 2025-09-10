import { type Color, type PieceSymbol, type Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

export const ChessBoard = ({ chess, board, socket, setBoard }: {
  setBoard: any;
  chess: any;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
}) => {
  const [from, setFrom] = useState<Square | null>(null);

  return (
    <div className="inline-block rounded-lg overflow-hidden shadow-2xl cursor-pointer">
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((square, j) => {
            return (
              <div
                key={j}
                onClick={() => {
                  const squareRepresentation =
                    (String.fromCharCode(97 + (j % 8)) + (8 - i)) as Square;

                  if (!from) {
                    setFrom(squareRepresentation);
                  } else {
                    // Try move locally
                    const move = {
                      from,
                      to: squareRepresentation,
                    };

                    const result = chess.move(move);

                    if (result) {
                      // ✅ valid move → update board & send to server
                      setBoard(chess.board());
                      socket.send(
                        JSON.stringify({
                          type: MOVE,
                          payload: move,
                        })
                      );
                      console.log("Move made:", move);
                    } else {
                      console.warn("Invalid move:", move);
                    }

                    setFrom(null);
                  }
                }}
                className={`flex items-center justify-center 
                  w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16
                  ${(i + j) % 2 === 0 ? "bg-[#769656]" : "bg-[#eeeed2]"}
                `}
              >
                {square ? (
                  <img
                    className="w-6 sm:w-8 md:w-10 lg:w-12"
                    src={`/${square.color === "b"
                      ? square.type
                      : square.type.toUpperCase()}-copy.png`}
                    alt={square.type}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
