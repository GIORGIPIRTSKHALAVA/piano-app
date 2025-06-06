'use client'
import PianoKey from '../components/PianoKey';
//import { usePianoStore } from '../store/useStore';
import { usePianoStore } from './store/usestore';

export default function HomePage() {
  const currentNote = usePianoStore((state) => state.currentNote);
  const notes = ['C','A', 'C','D','F','H',"I",'j','C','Q']; 
  return (
    <div style={{ padding: 20 }}>
      <h1>Piano App</h1>
      <p>Current Note: {currentNote || 'None'}</p>
      <div style={{ display: 'flex' }}>
        {notes.map((note) => (
          <PianoKey key={note} note={note} />
        ))}
      </div>
    </div>
  );
}
