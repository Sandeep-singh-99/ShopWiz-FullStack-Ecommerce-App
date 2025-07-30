import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL =  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const AddComment = createAsyncThunk('comment/addComment', async ({ id, data}, thunkApi) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/comment/add-comment`, {productId:id, comment: data.comment}, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
    }
})

export const GetComments = createAsyncThunk('comment/getComments', async (productId, thunkApi) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/comment/view-comment/${productId}`, 
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
    }
});

const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        comments: { data: [] }, 
        isError: false,
        data: null,
        isLoading: false
    },
    reducers: {
        clearComment: (state) => {
            state.comments = { data: [] };
        },
        addCommentOptimistic: (state, action) => {
            state.comments.data.unshift(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(AddComment.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });

        builder.addCase(AddComment.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });

        builder.addCase(AddComment.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(GetComments.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });

        builder.addCase(GetComments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.comments = action.payload; 
        });

        builder.addCase(GetComments.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
    }
});

export const { clearComment, addCommentOptimistic } = commentSlice.actions;
export default commentSlice.reducer;


