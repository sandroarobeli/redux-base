import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetches all existing posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch("http://127.0.0.1:5000/api/post");
  const responseData = await response.json();
  return responseData.posts;
});

// Adds new post
export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  // rejectWithValue ENABLES CUSTOM ERROR MESSAGING
  async (initialPost, { rejectWithValue }) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/post", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + initialPost.token,
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          title: initialPost.title,
          content: initialPost.content,
          user: initialPost.user,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        // NON-NETWORK (NON 500 STATUS CODE) RELATED ERRORS
        return rejectWithValue(responseData.message);
      }

      return responseData.post;
    } catch (error) {
      // NETWORK RELATED ERRORS
      console.log("from thunk catch"); //test
      console.log(error.message); //test
      return rejectWithValue(error.message);
    }
  }
);

// Edits existing post
export const editPost = createAsyncThunk(
  "posts/editPost",
  // rejectWithValue ENABLES CUSTOM ERROR MESSAGING
  async (initialPost, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/post/${initialPost.postId}`, {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + initialPost.token,
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          title: initialPost.title,
          content: initialPost.content,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        // NON-NETWORK (NON 500 STATUS CODE) RELATED ERRORS
        return rejectWithValue(responseData.message);
      }

      return responseData.post;
    } catch (error) {
      // NETWORK RELATED ERRORS
      console.log("from thunk catch"); //test
      console.log(error.message); //test
      return rejectWithValue(error.message);
    }
  }
);

// Deletes existing post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  // rejectWithValue ENABLES CUSTOM ERROR MESSAGING
  async (initialPost, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/post/${initialPost.postId}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + initialPost.token,
        },
      });

      const responseData = await response.json();
      if (!response.ok) {
        // NON-NETWORK (NON 500 STATUS CODE) RELATED ERRORS
        return rejectWithValue(responseData.message);
      }

      return responseData.post;
    } catch (error) {
      // NETWORK RELATED ERRORS
      console.log("from thunk catch"); //test
      console.log(error.message); //test
      return rejectWithValue(error.message);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // Sets state.status to 'idle' again so useEffect becomes active again
    clearError: (state, action) => {
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add fetched posts to the array
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        console.log("action.payload"); //test
        console.log(action.payload); // ALLOWS CUSTOM MESSAGING
        console.log("action.error"); //test
        console.log(action.error.message); // ALLOWS PRE SET STANDARD MESSAGING
        //state.error = action.payload // CUSTOM
        state.error = action.error.message; // STANDARD-PRESET
      })
      .addCase(addNewPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts.push(action.payload);
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.status = "failed";
        console.log("action.payload"); //test
        console.log(action.payload); // ALLOWS CUSTOM MESSAGING
        console.log("action.error"); //test
        console.log(action.error.message); // ALLOWS PRE SET STANDARD MESSAGING
        state.error = action.payload; // CUSTOM
        //state.error = action.error.message// STANDARD-PRESET
      })
      .addCase(editPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { _id, title, content } = action.payload;
        const existingPost = state.posts.find((post) => post._id === _id);
        existingPost.title = title;
        existingPost.content = content;
        console.log(action.payload); // test
      })
      .addCase(editPost.rejected, (state, action) => {
        state.status = "failed";
        console.log("action.payload"); //test
        console.log(action.payload); // ALLOWS CUSTOM MESSAGING
        state.error = action.payload;
      })
      .addCase(deletePost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { _id } = action.payload;
        state.posts = state.posts.filter((post) => post._id !== _id);
        console.log(action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Exports reducer functions
export const { clearError } = postsSlice.actions;

// Exports individual selectors
export const selectAllPosts = (state) => state.posts.posts;
export const selectPostError = (state) => state.posts.error;
export const selectPostStatus = (state) => state.posts.status;

export default postsSlice.reducer;
