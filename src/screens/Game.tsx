import { ChessBoard } from "../components/ChessBoard";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../hooks/useSocket";
import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import AOS from "aos";
import "aos/dist/aos.css";

export const Init_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () => {
  const navigate = useNavigate();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started , setStarted] = useState(false)
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);

      switch (message.type) {
        case Init_GAME: {
          const newGame = new Chess();
          
          setBoard(newGame.board());
          setStarted(true)
          console.log("game initialized");
          break;
        }
        case MOVE: {
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log("Move made");
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
            {!started &&
            <Button
              onClick={() => {
                socket.send(JSON.stringify({ type: Init_GAME }));
              }}
            >
              Play
            </Button>}
            <div className="mt-10 text-sm text-gray-200 opacity-90 italic">
              Waiting for opponent...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
