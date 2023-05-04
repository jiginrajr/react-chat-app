import { useRef, useState } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Cookies from "universal-cookie";
import Chat from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./config/firebaseConfig";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(null);
    setRoom(null);
  }

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
      <div><button onClick={signUserOut}>Sign Out</button></div>
    </main>
  );
}

export default App;
