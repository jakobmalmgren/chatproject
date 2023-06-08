import { auth } from "../firebase";
import firebase from "firebase/app";
import { RiGoogleLine } from "react-icons/ri";
import { SiFacebook } from "react-icons/si";

const Login = () => {
  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Welcome, want to chat?</h2>
        <div
          className="login-button google"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
          }
        >
          <RiGoogleLine /> Sign in with Google
        </div>
        <br />
        <br />
        <div
          className="login-button facebook"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
          }
        >
          <SiFacebook />
          Sign in with Facebook
        </div>
      </div>
    </div>
  );
};

export default Login;
