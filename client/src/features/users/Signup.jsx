// Third party
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

// Custom
import ErrorModule from "../shared/ErrorModule";
import { selectTheme } from "../../redux/themeSlice";
import {
  selectUsername,
  selectUserStatus,
  selectUserError,
  signup,
  clearError,
} from "../../redux/userSlice";

const Signup = () => {
  // From Router
  const navigate = useNavigate();

  // from Redux
  const currentTheme = useSelector(selectTheme);
  const user = useSelector(selectUsername);
  const userStatus = useSelector(selectUserStatus);
  const userError = useSelector(selectUserError);
  const dispatch = useDispatch();

  // Local state
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handler functions
  const onUserNameChanged = (event) => {
    setUserName(event.target.value);
  };

  const onEmailChanged = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChanged = (event) => {
    setPassword(event.target.value);
  };

  const onSignUpClicked = async () => {
    if (userName && email && password && userStatus === "idle") {
      try {
        await dispatch(signup({ userName, email, password })).unwrap();
        setUserName("");
        setEmail("");
        setPassword("");
        navigate("/myposts");
      } catch (error) {
        // For debugging only. error gets populated by createAsyncThunk abstraction
        console.log("from SIGNUP submit"); //test
        console.log(error); //test
      }
    }
  };

  const onErrorCleared = () => {
    dispatch(clearError());
    setUserName("");
    setEmail("");
    setPassword("");
  };

  if (userError) {
    return <ErrorModule error={userError} handleClick={onErrorCleared} />;
  }

  // Disables submit button if false
  const canSave = Boolean(userName) && Boolean(email) && Boolean(password);

  return (
    <Box
      component="section"
      style={{
        marginTop: "3rem",
        minHeight: "calc(100vh - 183px)",
        maxWidth: "500px",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "0 1.5rem",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" component="h2">
        Signup
      </Typography>
      <Box component="form">
        <Stack spacing={2}>
          <TextField
            name="userName"
            id="userName"
            label={currentTheme ? "User Name" : ""}
            placeholder="User Name"
            type="text"
            required
            value={userName}
            onChange={onUserNameChanged}
            sx={{
              marginTop: "0.5rem",
              border: currentTheme ? "none" : "1px solid gray",
            }}
          />
          <TextField
            name="email"
            id="email"
            label={currentTheme ? "Email" : ""}
            placeholder="Email"
            type="email"
            required
            value={email}
            onChange={onEmailChanged}
            sx={{
              marginTop: "0.5rem",
              border: currentTheme ? "none" : "1px solid gray",
            }}
          />
          <TextField
            name="password"
            id="password"
            label={currentTheme ? "Password" : ""}
            placeholder="Password"
            type="password"
            required
            value={password}
            onChange={onPasswordChanged}
            sx={{
              marginTop: "0.5rem",
              border: currentTheme ? "none" : "1px solid gray",
            }}
          />
          <Button
            disableRipple
            type="button"
            variant="contained"
            onClick={onSignUpClicked}
            disabled={!canSave}
            sx={{
              border: currentTheme ? "none" : "1px solid gray",
              "&:hover": {
                background: "#ec13c9",
              },
              "&:active": {
                background: "#ec13c9",
              },
            }}
          >
            Sign Up
            {userStatus === "loading" && (
              <CircularProgress
                size={24}
                sx={{
                  color: "primary",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Signup;
