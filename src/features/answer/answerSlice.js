import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import answerService from "./answerService";

const initialState = {
  answers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getAllAnswerByQuestionId = createAsyncThunk(
  "answer/get-all-answer-by-question-id",
  async (questionId, thunkAPI) => {
    try {
      return await answerService.getAllAnswerByQuestionId(questionId);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createAnswer = createAsyncThunk(
  "answer/create-answer",
  async (answer, thunkAPI) => {
    try {
      return await answerService.createAnswer(answer);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateAnswer = createAsyncThunk(
  "answer/update-answer",
  async (answer, thunkAPI) => {
    try {
      return await answerService.updateAnswer(answer);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteAnswer = createAsyncThunk(
  "answer/delete-answer",
  async (answerId, thunkAPI) => {
    try {
      return await answerService.deleteAnswer(answerId);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const resetState = createAction("Reset_all");

export const answerSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAnswerByQuestionId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAnswerByQuestionId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.answers = action.payload;
      })
      .addCase(getAllAnswerByQuestionId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createAnswer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAnswer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdAnswer = action.payload;
      })
      .addCase(createAnswer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAnswer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAnswer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedAnswer = action.payload;
      })
      .addCase(updateAnswer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAnswer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAnswer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedAnswer = action.payload;
      })
      .addCase(deleteAnswer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});

export default answerSlice.reducer;
