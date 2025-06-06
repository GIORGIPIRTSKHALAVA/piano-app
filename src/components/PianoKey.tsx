import { useState, useEffect } from 'react';
import { usePianoStore } from "@/app/store/usestore";

interface PianoKeyProps {
  note: string;
  isSharp?: boolean;
}

const PianoKey = ({ note, isSharp = false }: PianoKeyProps) => {
  const setCurrentNote = usePianoStore((state) => state.setCurrentNote);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = async () => {
    try {
      setIsPlaying(true);
      const audio = new Audio(`/sounds/${note}.mp3`);
      
      // Add error handling for audio
      audio.addEventListener('error', (e) => {
        console.error(`Failed to load audio for note ${note}:`, e);
        setIsPlaying(false);
      });

      audio.addEventListener('ended', () => {
        setIsPlaying(false);
      });

      await audio.play();
      setCurrentNote(note);
      
      // Auto-stop playing state after a short delay if audio doesn't trigger 'ended'
      setTimeout(() => setIsPlaying(false), 300);
    } catch (error) {
      console.error(`Error playing sound for note ${note}:`, error);
      setIsPlaying(false);
    }
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Map keyboard keys to piano notes (you can customize this mapping)
      const keyMap: { [key: string]: string } = {
        'a': 'C4', 'w': 'C#4', 's': 'D4', 'e': 'D#4', 'd': 'E4',
        'f': 'F4', 't': 'F#4', 'g': 'G4', 'y': 'G#4', 'h': 'A4',
        'u': 'A#4', 'j': 'B4', 'k': 'C5'
      };

      if (keyMap[event.key.toLowerCase()] === note) {
        playSound();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [note]);

  return (
    <button
      onClick={playSound}
      className={`piano-key ${isPlaying ? 'playing' : ''}`}
      style={{
        width: isSharp ? '40px' : '60px',
        height: isSharp ? '120px' : '200px',
        background: isSharp 
          ? 'linear-gradient(to bottom, #2a2a2a 0%, #1a1a1a 100%)' 
          : 'linear-gradient(to bottom, #ffffff 0%, #f5f5f5 100%)',
        color: isSharp ? '#ffffff' : '#333333',
        border: isSharp ? '1px solid #000' : '1px solid #ccc',
        borderRadius: isSharp ? '0 0 8px 8px' : '0 0 12px 12px',
        marginLeft: isSharp ? '-20px' : '0',
        marginRight: '1px',
        position: isSharp ? 'absolute' : 'relative',
        zIndex: isSharp ? 1 : 0,
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: '600',
        fontFamily: "'Inter', Arial, sans-serif",
        textAlign: 'center',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: '10px',
        boxShadow: isSharp 
          ? '0 4px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)' 
          : '0 4px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
        transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
        userSelect: 'none',
        outline: 'none',
        transformOrigin: 'bottom',
        willChange: 'transform'
      }}
      onMouseEnter={(e) => {
        if (isSharp) {
          e.currentTarget.style.background = 'linear-gradient(to bottom, #404040 0%, #2a2a2a 100%)';
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)';
        } else {
          e.currentTarget.style.background = 'linear-gradient(to bottom, #f8f8f8 0%, #e8e8e8 100%)';
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.9)';
        }
      }}
      onMouseLeave={(e) => {
        if (isSharp) {
          e.currentTarget.style.background = 'linear-gradient(to bottom, #2a2a2a 0%, #1a1a1a 100%)';
          e.currentTarget.style.transform = 'translateY(0px) scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)';
        } else {
          e.currentTarget.style.background = 'linear-gradient(to bottom, #ffffff 0%, #f5f5f5 100%)';
          e.currentTarget.style.transform = 'translateY(0px) scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)';
        }
      }}
      onMouseDown={(e) => {
        if (isSharp) {
          e.currentTarget.style.background = 'linear-gradient(to bottom, #1a1a1a 0%, #0a0a0a 100%)';
          e.currentTarget.style.transform = 'translateY(4px) scale(0.98)';
          e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.5), inset 0 2px 4px rgba(0,0,0,0.3)';
        } else {
          e.currentTarget.style.background = 'linear-gradient(to bottom, #e8e8e8 0%, #d8d8d8 100%)';
          e.currentTarget.style.transform = 'translateY(4px) scale(0.98)';
          e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.2), inset 0 2px 4px rgba(0,0,0,0.1)';
        }
      }}
      onMouseUp={(e) => {
        if (isSharp) {
          e.currentTarget.style.background = 'linear-gradient(to bottom, #404040 0%, #2a2a2a 100%)';
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)';
        } else {
          e.currentTarget.style.background = 'linear-gradient(to bottom, #f8f8f8 0%, #e8e8e8 100%)';
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.9)';
        }
      }}
      aria-label={`Piano key ${note}`}
      title={`Play ${note} (or press corresponding keyboard key)`}
    >
      {note}
    </button>
  );
};

export default PianoKey;