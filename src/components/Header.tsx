import { Turn } from "../App";
import { Mark } from "../App";

interface Props {
    setMark: (value: Mark) => void;
    updateTurn: (value: Turn | null) => void;
    currentTurn: Turn | null;
}

const Header = ({ setMark, updateTurn, currentTurn }: Props) => {
    const handleStart = () => {
        if (currentTurn !== null) return;
        Math.random() > 0.5 ? updateTurn(Turn.Player) : updateTurn(Turn.CPU);
    };

    return (
        <header className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-row gap-5">
                <button onClick={() => setMark(Mark.X)}>X</button>
                <button onClick={() => setMark(Mark.O)}>O</button>
            </div>
            <button onClick={handleStart} disabled={currentTurn !== null}>
                {currentTurn === null ? "Start" : currentTurn}
            </button>
            <button>Refresh</button>
        </header>
    );
};

export default Header;
