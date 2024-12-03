import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import questionService from "./questionService";

const initialState = {
  questions: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const createQuestionForFreeLesson = createAsyncThunk(
  "question/create-question-for-free-lesson",
  async (question, thunkAPI) => {
    try {
      return await questionService.createQuestionForFreeLesson(question);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createQuestionForPaidLesson = createAsyncThunk(
  "question/create-question-for-paid-lesson",
  async (question, thunkAPI) => {
    try {
      return await questionService.createQuestionForPaidLesson(question);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateQuestionForFreeLesson = createAsyncThunk(
  "question/update-question-for-free-lesson",
  async (question, thunkAPI) => {
    try {
      return await questionService.updateQuestionForFreeLesson(question);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateQuestionForPaidLesson = createAsyncThunk(
  "question/update-question-for-paid-lesson",
  async (question, thunkAPI) => {
    try {
      return await questionService.updateQuestionForPaidLesson(question);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllQuestionByFreeLessonId = createAsyncThunk(
  "question/get-all-question-by-free-lesson-id",
  async (lessonId, thunkAPI) => {
    try {
      return await questionService.getAllQuestionByFreeLessonId(lessonId);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllQuestionByPaidLessonId = createAsyncThunk(
  "question/get-all-question-by-paid-lesson-id",
  async (lessonId, thunkAPI) => {
    try {
      return await questionService.getAllQuestionByPaidLessonId(lessonId);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getQuestionById = createAsyncThunk(
  "question/get-question-by-id",
  async (questionId, thunkAPI) => {
    try {
      return await questionService.getQuestionById(questionId);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteQuestion = createAsyncThunk(
  "question/delete-question",
  async (questionId, thunkAPI) => {
    try {
      return await questionService.deleteQuestion(questionId);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const resetState = createAction("Reset_all");

export const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createQuestionForFreeLesson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQuestionForFreeLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdQuestion = action.payload;
      })
      .addCase(createQuestionForFreeLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createQuestionForPaidLesson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQuestionForPaidLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdQuestion = action.payload;
      })
      .addCase(createQuestionForPaidLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(updateQuestionForFreeLesson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateQuestionForFreeLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedQuestion = action.payload;
      })
      .addCase(updateQuestionForFreeLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateQuestionForPaidLesson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateQuestionForPaidLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedQuestion = action.payload;
      })
      .addCase(updateQuestionForPaidLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(getAllQuestionByFreeLessonId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllQuestionByFreeLessonId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.questions = action.payload;
      })
      .addCase(getAllQuestionByFreeLessonId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAllQuestionByPaidLessonId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllQuestionByPaidLessonId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.questions = action.payload;
      })
      .addCase(getAllQuestionByPaidLessonId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getQuestionById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuestionById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.question = action.payload;
      })
      .addCase(getQuestionById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(deleteQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedQuestion = action.payload;
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});

export default questionSlice.reducer;
