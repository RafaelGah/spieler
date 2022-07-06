import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route, Link, useNavigate, useParams} from "react-router-dom";
import {Form} from "react-bootstrap";

function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/" className="navlink">Players</Link>
                <Link to="/addPlayer" className="navlink">add Player</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Players/>}/>
                <Route path="/addPlayer" element={<AddPlayer/>}/>
                <Route path="/updatePlayer/:itemId" element={<UpdatePlayer/>}/>
            </Routes>
        </BrowserRouter>
    )
}

function Players({navigation}) {
    function loadPlayers() {
        fetch("http://localhost:8080/player")
            .then((response) => response.json())
            .then((data) => setPlayers(data))
    }

    const [players, setPlayers] = useState([]);
    const [url, setUrl] = useState("")
    useEffect(() => {
        loadPlayers()
    }, [])
    useEffect(() => {
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(() => loadPlayers())
    }, [url])
    let navigate = useNavigate();

    return (
        <>
            <div>Spieler</div>
            <div>Total Team Worth: </div>
            <ul className="thumbnails">
                {players.map(players =>
                    <li className="span4">
                        <div className="thumbnail">
                            <img src={players.url} height={200} width={300}/>
                            <h3>{players.name + " " + players.surname}</h3>
                            <p>{"Nummer:" + " " + players.number}</p>
                            <button onClick={()=>navigate("/updatePlayer/"+players.id)}>Update Player</button>
                            <button onClick={() => {
                                setUrl("http://localhost:8080/player/" + players.id)
                            }}>Delete
                            </button>
                        </div>
                    </li>
                )}
            </ul>
        </>
    );
}

function AddPlayer() {
    const [player, setPlayer] = useState({
        name: "",
        surname: "",
        number: 0,
        birthdate: Date,
        nationality: "",
        height: 0,
        worth: 0,
        club: "",
        url: ""
    });
    const [name, setName] = useState("name");
    const [surname, setSurname] = useState("surname");
    const [number, setNumber] = useState(15);
    const [birthdate, setBirthdate] = useState("2002-12-12");
    const [nationality, setNationality] = useState("switzerland");
    const [height, setHeight] = useState(187);
    const [worth, setWorth] = useState(187000000);
    const [club, setClub] = useState("fc liverpool");
    const [url, setUrl] = useState("https://yt3.ggpht.com/G-xQ-34A-GcfZm9ByvMnFEf1TjOatTKrJ3g0XaL1kXqCbin-7hTXhQBDe3VYtcAhx59iKG9C5jA=s900-c-k-c0x00ffffff-no-rj");
    useEffect(() => {
        console.log(JSON.stringify(player))
        fetch("http://localhost:8080/player", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(player)
        })
            .then((response) => response.json())
            .then((data) => console.log())
    }, [player])
    return (
        <>
            <h1>Spieler hinzufügen</h1>
            <p>Name</p>
            <input type={"text"} value={name} onChange={(e) => setName(e.target.value)}/>
            <p>Vorname</p>
            <input type={"text"} value={surname} onChange={(e) => setSurname(e.target.value)}/>
            <p>Nummer</p>
            <input type={"number"} value={number} onChange={(e) => setNumber(e.target.value)}/>
            <p>Geburtsdatum</p>
            <input type={"date"} value={birthdate} onChange={(e) => setBirthdate(e.target.value)}/>
            <p>Nationalität</p>
            <input type={"text"} value={nationality} onChange={(e) => setNationality(e.target.value)}/>
            <p>Grösse</p>
            <input type={"number"} value={height} onChange={(e) => setHeight(e.target.value)}/>
            <p>Wert</p>
            <input type={"number"} value={worth} onChange={(e) => setWorth(e.target.value)}/>
            <p>Club</p>
            <input type={"text"} value={club} onChange={(e) => setClub(e.target.value)}/>
            <p>Bildadresse</p>
            <input type={"text"} value={url} onChange={(e) => setUrl(e.target.value)}/>
            <button
                onClick={() =>
                    setPlayer({name, surname, number, birthdate, nationality, height, worth, club, url})
                }

            >Add Player
            </button>
        </>
    );
}

function UpdatePlayer() {
    const [player, setPlayer] = useState({
        name: "",
        surname: "",
        number: 0,
        birthdate: Date,
        nationality: "",
        height: 0,
        worth: 0,
        club: "",
        url: ""
    });

    let { itemId } = useParams();
    useEffect(()=>{
    fetch('http://localhost:8080/player/' + itemId)
        .then((response) => response.json())
        .then((data) => {
            setName(data.name)
            setSurname(data.surname)
            setNumber(data.number)
            setBirthdate(data.birthdate)
            setNationality(data.nationality)
            setHeight(data.height)
            setWorth(data.worth)
            setClub(data.club)
            setUrl(data.url)
        })},[itemId]
    )

    useEffect(() => {
        console.log(JSON.stringify(player))
        fetch("http://localhost:8080/player/"+itemId, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(player)
        })
            .then((response) => response.json())
            .then((data) => console.log())
    }, [player])
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [number, setNumber] = useState();
    const [birthdate, setBirthdate] = useState();
    const [nationality, setNationality] = useState();
    const [height, setHeight] = useState();
    const [worth, setWorth] = useState();
    const [club, setClub] = useState();
    const [url, setUrl] = useState();
    return (
        <>
            <h1>Spieler hinzufügen</h1>
            <p>Name</p>
            <input type={"text"} value={name} onChange={(e) => setName(e.target.value)}/>
            <p>Vorname</p>
            <input type={"text"} value={surname} onChange={(e) => setSurname(e.target.value)}/>
            <p>Nummer</p>
            <input type={"number"} value={number} onChange={(e) => setNumber(e.target.value)}/>
            <p>Geburtsdatum</p>
            <input type={"date"} value={birthdate} onChange={(e) => setBirthdate(e.target.value)}/>
            <p>Nationalität</p>
            <input type={"text"} value={nationality} onChange={(e) => setNationality(e.target.value)}/>
            <p>Grösse</p>
            <input type={"number"} value={height} onChange={(e) => setHeight(e.target.value)}/>
            <p>Wert</p>
            <input type={"number"} value={worth} onChange={(e) => setWorth(e.target.value)}/>
            <p>Club</p>
            <input type={"text"} value={club} onChange={(e) => setClub(e.target.value)}/>
            <p>Bildadresse</p>
            <input type={"text"} value={url} onChange={(e) => setUrl(e.target.value)}/>
            <button
                onClick={() =>
                    setPlayer({name, surname, number, birthdate, nationality, height, worth, club, url})
                }

            >Update Player
            </button>
        </>
    );
}


export default App;
