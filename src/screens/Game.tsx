import { ChessBoard } from "../components/ChessBoard";
import { Button } from "../components/Button";
import { useSocket } from "../hooks/useSocket";
import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import AOS from "aos";
import "aos/dist/aos.css";

export const Init_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () => {
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState(false);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);

      switch (message.type) {
        case Init_GAME: {
          const newGame = new Chess();
          setChess(newGame);
          setBoard(newGame.board());
          setStarted(true);
          console.log("Game initialized");
          break;
        }
        case MOVE: {
          const move = message.payload;
          const newChess = new Chess(chess.fen()); // clone current chess state
          const result = newChess.move(move);
          if (result) {
            setChess(newChess);
            setBoard(newChess.board());
            console.log("Move made");
          } else {
            console.log("Invalid move");
          }
          break;
        }
        case GAME_OVER:
          console.log("Game Over");
          break;
      }
    };
  }, [socket, chess]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  if (!socket)
    return (
      <div className="text-white text-xl flex justify-center items-center min-h-screen">
        Connecting......
      </div>
    );

  return (
    <div className="justify-center flex min-h-screen bg-gradient-to-r from-[#2C3E50] via-[#1C2B3A] to-[#0A121D] text-white">
      <div className="pt-10 max-w-screen-xl w-full px-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 w-full">
          {/* Chessboard Section */}
          <div
            className="md:col-span-4 w-full flex justify-center items-center bg-black/30 rounded-2xl shadow-2xl p-6 backdrop-blur-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-shadow"
            data-aos="zoom-in"
          >
            <ChessBoard chess={chess} setBoard={setBoard} board={board} socket={socket} />
          </div>

          {/* Sidebar Section */}
          <div
            className="md:col-span-2 w-full bg-gradient-to-br from-[#232526] via-[#414345] to-[#232526] rounded-2xl shadow-xl p-8 flex flex-col items-center justify-between text-center"
            data-aos="fade-left"
          >
            <h2 className="text-3xl font-extrabold mb-8 drop-shadow-lg tracking-wide">
              Welcome to the room
            </h2>
            <ul className="space-y-3 text-gray-200 text-lg">
              <li className="flex items-center gap-2 hover:scale-110 transition-transform duration-200 ease-in-out select-none">
                <span className="text-green-400">✔</span> Always starts from white
              </li>
              <li className="flex items-center gap-2 hover:scale-110 transition-transform duration-200 ease-in-out select-none">
                <span className="text-green-400">✔</span> Cannot move wrong position
              </li>
              <li className="flex items-center gap-2 hover:scale-110 transition-transform duration-200 ease-in-out select-none">
                <span className="text-green-400">✔</span> Cannot move opponent’s piece
              </li>
              <li className="flex items-center gap-2 hover:scale-110 transition-transform duration-200 ease-in-out select-none">
                <span className="text-green-400">✔</span> Shows messages for invalid moves, check, and checkmate
              </li>
            </ul>
            {!started && (
              <Button
                onClick={() => {
                  socket.send(JSON.stringify({ type: Init_GAME }));
                }}
              >
                Play
              </Button>
            )}
            <div className="mt-10 text-sm text-gray-200 opacity-90 italic">
              Waiting for opponent...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
