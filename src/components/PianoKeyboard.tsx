//import PianoKey from './PianoKey';
import PianoKey from "./PianoKey";

const keys = [
  { note: 'C4' }, { note: 'C#4', isSharp: true }, { note: 'D4' },
  { note: 'D#4', isSharp: true }, { note: 'E4' }, { note: 'F4' },
  { note: 'F#4', isSharp: true }, { note: 'G4' }, { note: 'G#4', isSharp: true },
  { note: 'A4' }, { note: 'A#4', isSharp: true }, { note: 'B4' }, { note: 'C5' }
];

const PianoKeyboard = () => (
  <div style={{ display: 'flex', position: 'relative' }}>
    {keys.map((key) => (
      <PianoKey key={key.note} note={key.note} isSharp={key.isSharp} />
    ))}
  </div>
);

export default PianoKeyboard;
