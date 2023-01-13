import React, { useMemo, useCallback } from "react";

import * as Realms from "realm-web";
import "./App.css";
const app = new Realms.App({ id: "application-0-pcidj" });



const ApiAuth = ({
  email,
  setEmail,
  password,
  setPassword,
  setUser,
  setData,
}) => {
  const registerUser = async () => {
    await app.emailPasswordAuth.registerUser({ email, password });
    const newUserEmail = email;

    console.log(newUserEmail);

    console.log("User registered Successfully");
  };
  const googleAuth = useCallback(async () => {
    const credentials = Realms.Credentials.emailPassword(email, password);
    const apiUser = await app.logIn(credentials);

    setUser(apiUser);
    console.log(app.currentUser.id);

    console.log("Login Successfull");
  }, [email, password, setUser]);
  return (
    <div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <button type="button" onClick={googleAuth}>
        Signin{" "}
      </button>
      <button type="button" onClick={registerUser}>
        Register
      </button>
    </div>
  );
};

const App = () => {
  const [user, setUser] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  console.log(user);
  const logOut = useCallback(async () => {
    await app.currentUser.logOut();
    console.log("Log out Successfull");
    setUser(null);
  }, []);

  const renderContext = useMemo(() => {
    if (user) {
      return (
        <div className="logout">
          <p>You have logged in Successfully</p>
          <button onClick={logOut}>Logout</button>
        </div>
      );
    } else {
      return (
        <ApiAuth
          setUser={setUser}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          data={data}
          setData={setData}
        />
      );
    }
  }, [user, logOut, email, setEmail, password, setPassword, data, setData]);
  return <div className="container">{renderContext}</div>;
};

export default App;

//user?():(
