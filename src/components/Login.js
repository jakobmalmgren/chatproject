import { auth } from "../firebase";
import firebase from "firebase/app";
import { RiGoogleLine } from "react-icons/ri";
import { SiFacebook } from "react-icons/si";
import styled from "styled-components";

const Login = () => {
  return (
    <Container>
      <LoginCard>
        <h2>Welcome, you want to chat?</h2>
        <LoginBtnGoogle
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
          }
        >
          <RiGoogleLine style={{ marginRight: "5px" }}> </RiGoogleLine> Sign in
          with Google
        </LoginBtnGoogle>
        <br />
        <br />
        <LoginBtnFacebook
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
          }
        >
          <SiFacebook style={{ marginRight: "5px" }}> </SiFacebook>
          Sign in with Facebook
        </LoginBtnFacebook>
      </LoginCard>
    </Container>
  );
};

const Container = styled.div`
  background-color: rgb(0, 39, 102);
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
`;
const LoginCard = styled.div`
  position: relative;
  font-family: "Grandiflora One", serif;
  top: calc(50vh - 144px);
  left: calc(50vw - 210px);
  padding-top: 36px;
  padding-bottom: 66px;
  width: 420px;
  text-align: center;
  background-color: white;
  border-radius: 22px;
`;
const LoginBtnGoogle = styled.div`
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
  display: inline-block;
  background-color: #4285f4;
  color: white;
`;
const LoginBtnFacebook = styled.div`
  cursor: pointer;
  color: white;
  padding: 12px;
  border-radius: 8px;
  display: inline-block;
  background-color: #3b5998;
`;

export default Login;
