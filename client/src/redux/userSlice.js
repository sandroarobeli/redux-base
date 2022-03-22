import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signup = createAsyncThunk(
  "user/signup",
  // rejectWithValue ENABLES CUSTOM ERROR MESSAGING
  async (initialUser, { rejectWithValue }) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //'Authorization': 'Bearer ' + token
        },
        mode: "cors",
        body: JSON.stringify({
          userName: initialUser.userName,
          email: initialUser.email,
          password: initialUser.password,
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        // NON-NETWORK (NON 500 STATUS CODE) RELATED ERRORS
        return rejectWithValue(responseData.message);
      }

      return responseData.user;
    } catch (error) {
      // NETWORK RELATED ERRORS
      console.log("from thunk catch"); //test
      console.log(error.message); //test
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  // rejectWithValue ENABLES CUSTOM ERROR MESSAGING
  async (initialUser, { rejectWithValue }) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          email: initialUser.email,
          password: initialUser.password,
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        // NON-NETWORK (NON 500 STATUS CODE) RELATED ERRORS
        return rejectWithValue(responseData.message);
      }

      return responseData.user;
    } catch (error) {
      // NETWORK RELATED ERRORS
      console.log("from thunk catch"); //test
      console.log(error.message); //test
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      userName: "",
      email: "",
      userId: "",
      posts: [],
      token: "",
      tokenExpiration: null,
    },
    status: "idle",
    error: null,
  },
  reducers: {
    // Restores logged in status upon page reload
    autoLogin: (state, action) => {
      state.user.userName = action.payload.userName;
      state.user.email = action.payload.email;
      state.user.userId = action.payload.userId;
      state.user.posts = action.payload.posts;
      state.user.token = action.payload.token;
      // AutoLogin (Caused by page reload) KEEPS THE ORIGINAL TIME STAMP INTACT
      state.user.tokenExpiration = Number.parseInt(action.payload.expiration);
    },
    logout: (state, action) => {
      state.user.userName = "";
      state.user.email = "";
      state.user.userId = "";
      state.user.posts = [];
      state.user.token = "";
      state.user.tokenExpiration = null;
      state.status = "idle"; // so login button becomes clickable again
      localStorage.removeItem("userData");
    },
    // Sets state.status to 'idle' again so login button becomes clickable again
    clearError: (state, action) => {
      // state.error = "" RESTORE IF NEEDED
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signup.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("final payload"); // test
        console.log(action.payload); // test
        state.user.userName = action.payload.userName;
        state.user.email = action.payload.email;
        state.user.userId = action.payload.userId;
        state.user.posts = action.payload.posts;
        state.user.token = action.payload.token;
        // Original Signup STARTS THE FULL 1 HOUR
        state.user.tokenExpiration = new Date().getTime() + 1000 * 60 * 60;
        // Sets to 10 seconds for testing
        //state.user.tokenExpiration = new Date().getTime() + 1000 * 10
        localStorage.setItem(
          "userData",
          JSON.stringify({
            userName: action.payload.userName,
            userId: action.payload.userId,
            email: action.payload.email,
            posts: action.payload.posts,
            token: action.payload.token,
            expiration: state.user.tokenExpiration.toString(),
          })
        );
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        console.log("action.payload"); //test
        console.log(action.payload); // ALLOWS CUSTOM MESSAGING
        console.log("action.error"); //test
        console.log(action.error.message); // ALLOWS PRE SET STANDARD MESSAGING
        state.error = action.payload; // CUSTOM
        //state.error = action.error.message// STANDARD-PRESET
      })
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("final payload"); // test
        console.log(action.payload); // test
        state.user.userName = action.payload.userName;
        state.user.email = action.payload.email;
        state.user.userId = action.payload.userId;
        state.user.posts = action.payload.posts;
        state.user.token = action.payload.token;
        // Original Login (Not caused by page reload) STARTS THE FULL 1 HOUR
        state.user.tokenExpiration = new Date().getTime() + 1000 * 60 * 60;
        // Sets to 10 seconds for testing
        //state.user.tokenExpiration = new Date().getTime() + 1000 * 10
        localStorage.setItem(
          "userData",
          JSON.stringify({
            userName: action.payload.userName,
            userId: action.payload.userId,
            email: action.payload.email,
            posts: action.payload.posts,
            token: action.payload.token,
            expiration: state.user.tokenExpiration.toString(),
          })
        );
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        console.log("action.payload"); //test
        console.log(action.payload); //test  ALLOWS CUSTOM MESSAGING
        console.log("action.error"); //test
        console.log(action.error.message); // test ALLOWS PRE SET STANDARD MESSAGING
        state.error = action.payload; // CUSTOM
        //state.error = action.error.message// STANDARD-PRESET
      });
  },
});

// Exports reducer functions
export const { autoLogin, logout, clearError } = userSlice.actions;

// Exports individual selectors
export const selectUsername = (state) => state.user.user.userName;
export const selectUserId = (state) => state.user.user.userId;
export const selectUserPosts = (state) => state.user.user.posts;
export const selectToken = (state) => state.user.user.token;
export const selectTokenExpiration = (state) => state.user.user.tokenExpiration;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;
