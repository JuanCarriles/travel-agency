import { useEffect, useState } from 'react';

interface GroupMeButtonProps {
    groupUrl: string; // GroupMe group URL or chat link
}

const GroupMeButton = ({ groupUrl }: GroupMeButtonProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show button after a small delay for smooth entrance
        const timer = setTimeout(() => setIsVisible(true), 600);
        return () => clearTimeout(timer);
    }, []);

    const handleClick = () => {
        window.open(groupUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <button
            onClick={handleClick}
            className={`fixed bottom-24 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#00AFF0] hover:bg-[#0099D6] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
            aria-label="Join us on GroupMe"
            title="Join us on GroupMe"
        >
            <img
                src="/public/images/groupme-icon.png"
                alt="GroupMe"
                className="w-8 h-8"
            />

            {/* Pulse animation ring */}
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#00AFF0] opacity-75 animate-ping"></span>
        </button>
    );
};

export default GroupMeButton;
