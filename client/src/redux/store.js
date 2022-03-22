// Third party
import { configureStore } from "@reduxjs/toolkit";

// Custom
import userReducer from "./userSlice";
import postsReducer from "./postsSlice";
import themeReducer from "./themeSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    posts: postsReducer,
  },
});

export default store;
