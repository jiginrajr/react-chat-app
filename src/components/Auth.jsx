import React from "react";
import { auth, provider } from "../config/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Auth = (props) => {
  const { setIsAuth } = props;
  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("result", result);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(result.user.refreshToken);
    } catch (err) {
      console.error("sign in error", err);
    }
  };
  return (
    <section>
      <h5>Sign In With Google to continue</h5>
      <button onClick={handleSignInWithGoogle}>Sign In With Google</button>
    </section>
  );
};

export default Auth;
