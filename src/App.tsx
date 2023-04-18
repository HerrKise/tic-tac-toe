import Field from "./components/Field";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useState } from "react";

export enum Turn {
    Player = "Player",
    CPU = "CPU"
}

export enum Mark {
    X = "x",
    O = "o"
}

function App() {
    const [playerValue, setPlayerValue] = useState<Mark>();
    const [cpuValue, setCpuValue] = useState<Mark>();
    const [currentTurn, setCurrentTurn] = useState<Turn | null>(null);
    const [winner, setWinner] = useState<Turn | null>();
    const [playerScore, setPlayerScore] = useState<number>(0);
    const [cpuScore, setCpuScore] = useState<number>(0);
    const [tiesScore, setTiesScore] = useState<number>(0);

    interface Props {
        setMark: (value: string) => void;
    }

    const setMark = (value: Mark) => {
        if (value === Mark.X) {
            setPlayerValue(Mark.X);
            setCpuValue(Mark.O);
        } else {
            setPlayerValue(Mark.O);
            setCpuValue(Mark.X);
        }
    };

    const updateTurn = (value: Turn | null) => {
        setCurrentTurn(value);
    };

    const updatePlayerScore = () => {
        setPlayerScore((score) => (score += 1));
    };
    const updateCpuScore = () => {
        setCpuScore((score) => (score += 1));
    };
    const updateTiesScore = () => {
        setTiesScore((score) => (score += 1));
    };
    return (
        <div className="text-black w-[100%] h-[100vh] bg-[#092f30] flex items-center justify-center flex-col">
            <div className="w-[332px]">
                <Header
                    setMark={setMark}
                    currentTurn={currentTurn}
                    updateTurn={updateTurn}
                />
                <Field
                    playerValue={playerValue}
                    cpuValue={cpuValue}
                    currentTurn={currentTurn}
                    updateTurn={updateTurn}
                    updatePlayerScore={updatePlayerScore}
                    updateCpuScore={updateCpuScore}
                    updateTiesScore={updateTiesScore}
                />
                <Footer
                    playerScore={playerScore}
                    cpuScore={cpuScore}
                    tiesScore={tiesScore}
                />
            </div>
        </div>
    );
}

export default App;
