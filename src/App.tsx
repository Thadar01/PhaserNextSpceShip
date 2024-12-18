import { useRef} from 'react';
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame';
import Link from 'next/link';

function App()
{

   
    const phaserRef = useRef<IRefPhaserGame | null>(null);


  

   

   

    return (
        <div id="app">
            <PhaserGame ref={phaserRef}  />
        </div>
    )
}

export default App
