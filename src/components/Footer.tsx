interface Props {
    playerScore: number;
    cpuScore: number;
    tiesScore: number;
}

const Footer = ({ playerScore, cpuScore, tiesScore }: Props) => {
    return (
        <footer className="flex flex-row justify-between w-[332px] mt-6 font-black">
            <div className="w-[100px] rounded-[15px] h-[50px] bg-[#2ed5d0] flex flex-col items-center">
                X (YOU)
                <p>{playerScore}</p>
            </div>
            <div className="w-[100px] rounded-[15px] h-[50px] bg-[#949b9b] flex flex-col items-center">
                TIES
                <p>{tiesScore}</p>
            </div>
            <div className="w-[100px] rounded-[15px] h-[50px] bg-[#f8f41d] flex flex-col items-center">
                O (CPU)
                <p>{cpuScore}</p>
            </div>
        </footer>
    );
};

export default Footer;
