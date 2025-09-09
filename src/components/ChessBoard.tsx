import type { Color, PieceSymbol, Square } from "chess.js";

export const ChessBoard = ({ board }: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][]
}) => {
  return (
    <div className="inline-block rounded-lg overflow-hidden shadow-2xl cursor-pointer">
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((square, j) => (
            <div
              key={j}
              className={`flex items-center justify-center 
                w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16
                ${(i + j) % 2 === 0 ? "bg-[#769656]" : "bg-[#eeeed2]"}
              `}
            >
              {square ? (
                <span
                  className={`text-xl sm:text-2xl md:text-3xl font-bold 
                    ${square.color === "w" ? "text-white" : "text-black"}`}
                >
                  {square.type.toUpperCase()}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
