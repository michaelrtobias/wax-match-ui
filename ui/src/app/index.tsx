import { Amplify, Auth, Hub } from "aws-amplify";
import { FC, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Navbar } from "../common/navbar";
import Cookies from "js-cookie";

const App: FC = () => {
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAuthFinished, setIsAuthFinished] = useState<boolean>(false);

  useEffect(() => {
    const getCurrentUserDetails = async () => {
      const isCookie: boolean =
        Cookies.get("amplify-signin-with-hostedUI") === "true";
      if (isCookie) {
        setIsLoggedIn(true);
        console.log("Is Logged In after cookie check: ", isLoggedIn);
      }
      try {
        const { UserAttributes: user } = await Auth.currentAuthenticatedUser();
        console.log("passed attributes call");
        setUserData(user);
        setIsLoggedIn(true);
        setIsAuthFinished(true);
        console.log("userdata", userData);
        console.log("auth finished", isAuthFinished);
        console.log("Is Logged In: ", isLoggedIn);
      } catch (error) {
        console.log("auth error");
        setIsAuthFinished(true);
        setIsLoggedIn(false);
        console.log(error);
      }
    };
    getCurrentUserDetails();
  }, [isAuthFinished, isLoggedIn, userData]);

  useEffect(() => {
    const awsauth = {
      domain: "auth.waxmatcher.com",
      scope: ["aws.cognito.signin.user.admin", "email", "openid", "phone"],
      redirectSignIn: "http://localhost:5173/discogs/auth",
      redirectSignOut: "http://localhost:5173/home",
      responseType: "code",
    };
    Amplify.configure({
      Auth: {
        region: "us-east-1",
        userPoolId: "us-east-1_fH7Kh3tU2",
        userPoolWebClientId: "64l5a8aqgh1kadj1bgef6merca",
        cookieStorage: {
          domain: "localhost",
          path: "/",
          expires: 365,
          secure: false,
        },
        mandatorySignIn: false,
        redirectSignIn: "http://localhost:5173/discogs/auth",
        redirectSignOut: "http://localhost:5173/home",
      },
    });
    Auth.configure({ oauth: awsauth });
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          setUserData(data);
          setIsLoggedIn(true);
          break;
        case "signOut":
          setUserData({});
          setIsLoggedIn(false);
          break;
        default:
          break;
      }
    });
  }, []);
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} userData={userData} />
      <Box id="detail">
        <Outlet />
      </Box>
    </>
  );
};

export default App;
