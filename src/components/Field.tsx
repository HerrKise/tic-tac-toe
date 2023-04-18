import { useState, useEffect } from "react";
import { Mark, Turn } from "../App";

interface Props {
    playerValue: Mark | undefined;
    cpuValue: Mark | undefined;
    updateTurn: (value: Turn | null) => void;
    updatePlayerScore: () => void;
    updateCpuScore: () => void;
    updateTiesScore: () => void;
    currentTurn: Turn | null;
}

interface Socket {
    value: string;
}

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const Field = ({
    playerValue,
    cpuValue,
    currentTurn,
    updateTurn,
    updatePlayerScore,
    updateCpuScore,
    updateTiesScore
}: Props) => {
    const [sockets, setSockets] = useState<Socket[]>([
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" }
    ]);

    const template = [
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" }
    ];

    useEffect(() => {
        if (currentTurn === Turn.CPU && cpuValue) {
            setTimeout(() => {
                randomMark();
            }, 2000);
        }
    }, [currentTurn]);

    useEffect(() => {
        let res;
        if (currentTurn === Turn.CPU && cpuValue) {
            res = checkWinner(cpuValue);
        } else if (currentTurn === Turn.Player && playerValue) {
            res = checkWinner(playerValue);
        }
        if (res === false) {
            currentTurn === Turn.Player
                ? updateTurn(Turn.CPU)
                : updateTurn(Turn.Player);
            return;
        }
        if (res === "tie") {
            updateTiesScore();
            updateTurn(null);
            setSockets(template);
            return;
        }
        if (res === true) {
            currentTurn === Turn.Player
                ? updatePlayerScore()
                : updateCpuScore();
            updateTurn(null);
            setSockets(template);
            return;
        } /* 
        if (currentTurn === Turn.CPU && playerValue) {
            checkWinner(playerValue);
        } else if (currentTurn === Turn.Player && cpuValue) {
            checkWinner(cpuValue);
        } */
    }, [sockets]);

    useEffect(() => {
        console.log(currentTurn);
    }, [currentTurn]);

    const setSocketValue = (mark: string, index: number) => {
        setSockets((prev) =>
            prev.map((s, i) => {
                if (i === index) {
                    s.value = mark;
                }
                return s;
            })
        );
    };

    const checkWinner = (mark: Mark) => {
        const currentOccupiedSlots = sockets
            .map((s, i) => (s.value === mark ? i : null))
            .filter((s) => s !== null);

        const isWinner = winningCombinations.some((combination) => {
            let result = 0;
            for (let i = 0; i < combination.length; i++) {
                if (currentOccupiedSlots.includes(combination[i])) {
                    result += 1;
                }
            }
            if (result === 3) {
                return true;
            } else return false;
        });
        if (!isWinner && sockets.filter((s) => s.value === "").length === 0) {
            return "tie";
        }
        if (isWinner) {
            return true;
        } else return false;
    };

    const getNearest = (num: number, array: number[]) => {
        let nearest = array[0];
        for (let i = 1; i < array.length; i++) {
            if (Math.abs(array[i] - num) < Math.abs(nearest - num)) {
                nearest = array[i];
            }
        }
        return nearest;
    };

    const randomMark = () => {
        const freeSockets = sockets
            .map((s, i) => (s.value === "" ? i : null))
            .filter((s): s is number => s !== null);
        if (freeSockets.length === 1 && cpuValue) {
            setSocketValue(cpuValue, freeSockets[0]);
        } else if (freeSockets.length > 1 && cpuValue) {
            const random =
                Math.random() *
                    (freeSockets[freeSockets.length - 1] - freeSockets[0]) +
                freeSockets[0];
            const randomSocketIndex = getNearest(random, freeSockets);
            setSocketValue(cpuValue, randomSocketIndex);
        }
    };
    return (
        <main className="grid grid-cols-3 gap-4 grid-rows-3">
            {sockets.map((socket, i) => (
                <button
                    onClick={() => {
                        if (playerValue) {
                            setSocketValue(playerValue, i);
                        }
                    }}
                    disabled={currentTurn === Turn.CPU || currentTurn === null}
                    key={i}
                    className="w-[100px] h-[100px] bg-[#3a5553] shadow-[0_10px_rgba(1,25,25)] rounded-[15px] mt-[10px] flex items-center justify-center"
                >
                    {socket.value}
                </button>
            ))}
        </main>
    );
};

export default Field;
