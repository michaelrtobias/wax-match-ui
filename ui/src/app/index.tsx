import { Amplify, Auth, Hub } from "aws-amplify";
import { FC, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Navbar } from "../common/navbar";
import Cookies from "js-cookie";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

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
      }
      try {
        const { UserAttributes: user } = await Auth.currentAuthenticatedUser();
        setUserData(user);
        setIsLoggedIn(true);
        setIsAuthFinished(true);
      } catch (error) {
        setIsAuthFinished(true);
        setIsLoggedIn(false);
        console.error(error);
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
      <QueryClientProvider client={queryClient}>
        <Navbar isLoggedIn={isLoggedIn} userData={userData} />
        <Box id="detail">
          <Outlet />
        </Box>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default App;
