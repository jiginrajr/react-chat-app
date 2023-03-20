import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Auth from "./components/Auth";
import Cookies from "universal-cookie";
import Chat from "./components/Chat";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);

  if (!isAuth) {
    return (
      <main>
        <Auth setIsAuth={setIsAuth} />
      </main>
    );
  }

  return (
    <main>
      {room ? (
        <section><Chat room={room}/></section>
      ) : (
        <section>
          <label htmlFor="roomId">Enter Room name</label>
          <input type="text" id="roomId" ref={roomInputRef}/>
          <button onClick={() => setRoom(roomInputRef.current.value)}>Enter chat</button>
        </section>
      )}
    </main>
  );
}

export default App;
