import { useState } from "react"

export default function Player({ initialname, symbol, isactive,onchnagename }) {
    const [playerName, setplayername] = useState(initialname);
    const [isEditing, setisEditing] = useState(false);
    function handlecEditclick() {
        setisEditing((editing) => !editing);
        if (isEditing) {
            onchnagename(symbol, playerName);
        }
    }
    function handleChange(event) {
        setplayername(event.target.value)
        
    }
    let editaleplayername = <span className="player-name">{playerName}</span>
    if (isEditing) {
        editaleplayername = <input type="text" required value={playerName} onChange={handleChange}/>;
    }

    return <li className={isactive ?'active':undefined}>
        <span className="player">{editaleplayername}
            <span className="player-symbol">{symbol}</span></span>
        <button onClick={handlecEditclick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
}