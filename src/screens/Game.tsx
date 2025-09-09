import { ChessBoard } from "../components/ChessBoard"
import { Button } from "../components/Button"
import { useNavigate } from "react-router-dom"
import { useSocket } from "../hooks/useSocket";
import { useEffect, useState } from "react";
import { Chess } from "chess.js";

// move together here is the code repetation
export const Init_GAME = "init_game";
export const MOVE = "move"
export const GAME_OVER = "game_over"


export const Game = () => {
    const navigate = useNavigate();

    const [chess,setChess] = useState(new Chess())
    const [board, setBoard] = useState(chess.board())

    const socket = useSocket();

    useEffect(() => {
        if (!socket) {
            return
        }
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);

            switch (message.type) {
                case Init_GAME:
                    setChess(new Chess())
                    setBoard(chess.board());
                    console.log("game initialized")
                    break;
                case MOVE:
                    const move = message.payload;
                    chess.move(move)
                    setBoard(chess.board());
                    console.log("Move made");
                    break
                case GAME_OVER:
                    console.log("Game Over thingi")
                    break
            }
        }
    }, [socket])
    if (!socket) return <div>Connecting......</div>
    return (
        <div className="justify-center flex">
            <div className="pt-8 max-w-screen-lg w-full">
                <div className="grid grid-cols-6 gap-4 w-full bg-red-400">
                    <div className="col-span-4 bg-red-200 w-full">
                        <ChessBoard board={board} />
                    </div>
                    <div className="col-span-2 bg-green-200 w-full">

                        <Button onClick={() => {
                            socket.send(JSON.stringify({
                                type: Init_GAME
                            }))
                        }}>paly</Button>

                    </div>
                </div>
            </div>
        </div>
    )
}
