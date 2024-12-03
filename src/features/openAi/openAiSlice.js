import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import openAiService from "./openAiService";

const initialState = {
  quizs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const generateQuizQuestionsForFreeLesson = createAsyncThunk(
  "openAi/generate-quiz-question-for-free-lesson",
  async (lessonId, thunkAPI) => {
    try {
      return await openAiService.generateQuizQuestionsForFreeLesson(lessonId);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const generateQuizQuestionsForPaidLesson = createAsyncThunk(
    "openAi/generate-quiz-question-for-paid-lesson",
    async (lessonId, thunkAPI) => {
      try {
        return await openAiService.generateQuizQuestionsForPaidLesson(lessonId);
      } catch (error) {
        const message = error.message || "Network Error";
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

export const resetState = createAction("Reset_all");

export const openAiSlice = createSlice({
  name: "quizs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateQuizQuestionsForFreeLesson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(generateQuizQuestionsForFreeLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.generatedQuiz = action.payload;
      })
      .addCase(generateQuizQuestionsForFreeLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(generateQuizQuestionsForPaidLesson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(generateQuizQuestionsForPaidLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.generatedQuiz = action.payload;
      })
      .addCase(generateQuizQuestionsForPaidLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});

export default openAiSlice.reducer;
