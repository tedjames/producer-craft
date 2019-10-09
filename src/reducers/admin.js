import {
  CREATE_COURSE,
  FETCH_COURSES,
  FETCH_COURSE,
  UPDATE_COURSE,
  DELETE_COURSE,
  CREATE_FILE,
  FETCH_FILES,
  UPDATE_FILE,
  DELETE_FILE,
  CREATE_COMMENT,
  FETCH_COMMENTS,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  CREATE_LESSON,
  FETCH_LESSONS,
  UPDATE_LESSON,
  DELETE_LESSON,
  ERROR,
  PENDING,
  CLEAR_LESSONS,
} from '../actions/types';

const INITIAL_STATE = {
  // course management
  courses: false,
  fetchingCourses: false,
  creatingCourse: false,
  updatingCourse: false,
  deletingCourse: false,
  // lesson management
  lessons: false,
  fetchingLessons: false,
  creatingLesson: false,
  updatingLesson: false,
  deletingLesson: false,
  // comment management
  comments: [],
  fetchingComments: false,
  creatingComment: false,
  updatingComment: false,
  deletingComment: false,
  // file management
  files: [],
  fetchingFiles: false,
  creatingFile: false,
  updatingFile: false,
  deletingFile: false,
  // account management
  account: {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
  },
  fetchingAccount: false,
  updatingAccount: false,
  deletingAccount: false,
  // default payment method
  defaultCard: {
    number: '',
    expiration: '',
  },
  fetchingCard: false,
  creatingCard: false,
  updatingCard: false,
  deletingCard: false,
  // purchase history
  purchaseHistory: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //
    /* Public Endpoints - fetching lesson and course data */
    case FETCH_COURSES:
      switch (action.payload) {
        case PENDING:
          return { ...state, fetchingCourses: true };
        case ERROR:
          return { ...state, fetchingCourses: false };
        default:
          return {
            ...state,
            courses: action.payload,
            fetchingCourses: false,
          };
      }
    case FETCH_LESSONS:
      switch (action.payload) {
        case PENDING:
          return { ...state, fetchingLessons: true };
        case ERROR:
          return { ...state, fetchingLessons: false };
        default:
          return {
            ...state,
            lessons: action.payload,
            fetchingLessons: false,
          };
      }
    case CLEAR_LESSONS:
      return { ...state, lessons: false };
    case FETCH_FILES:
      switch (action.payload) {
        case PENDING:
          return { ...state, fetchingFiles: true };
        case ERROR:
          return { ...state, fetchingFiles: false };
        default:
          return {
            ...state,
            files: action.payload,
            fetchingFiles: false,
          };
      }
    case FETCH_COMMENTS:
      switch (action.payload) {
        case PENDING:
          return { ...state, fetchingComments: true };
        case ERROR:
          return { ...state, fetchingComments: false };
        default:
          return {
            ...state,
            comments: action.payload,
            fetchingComments: false,
          };
      }

    /* Private Endpoints - writing/deleting course, lesson and file data */
    //
    // Course Management
    case CREATE_COURSE:
      switch (action.payload) {
        case PENDING:
          return { ...state, creatingCourse: true };
        case ERROR:
          return { ...state, creatingCourse: false };
        default:
          return {
            ...state,
            creatingCourse: false,
          };
      }
    case UPDATE_COURSE:
      switch (action.payload) {
        case PENDING:
          return { ...state, updatingCourse: true };
        case ERROR:
          return { ...state, updatingCourse: false };
        default:
          return {
            ...state,
            updatingCourse: false,
          };
      }
    case DELETE_COURSE:
      switch (action.payload) {
        case PENDING:
          return { ...state, deletingCourse: true };
        case ERROR:
          return { ...state, deletingCourse: false };
        default:
          return {
            ...state,
            deletingCourse: false,
          };
      }
    // Lesson Management
    case CREATE_LESSON:
      switch (action.payload) {
        case PENDING:
          return { ...state, creatingLesson: true };
        case ERROR:
          return { ...state, creatingLesson: false };
        default:
          return {
            ...state,
            creatingLesson: false,
          };
      }
    case UPDATE_LESSON:
      switch (action.payload) {
        case PENDING:
          return { ...state, updatingLesson: true };
        case ERROR:
          return { ...state, updatingLesson: false };
        default:
          return {
            ...state,
            updatingLesson: false,
          };
      }
    case DELETE_LESSON:
      switch (action.payload) {
        case PENDING:
          return { ...state, deletingLesson: true };
        case ERROR:
          return { ...state, deletingLesson: false };
        default:
          return {
            ...state,
            deletingLesson: false,
          };
      }

    // Comment Management
    case CREATE_COMMENT:
      switch (action.payload) {
        case PENDING:
          return { ...state, creatingComment: true };
        case ERROR:
          return { ...state, creatingComment: false };
        default:
          return {
            ...state,
            creatingComment: false,
          };
      }
    case UPDATE_COMMENT:
      switch (action.payload) {
        case PENDING:
          return { ...state, updatingComment: true };
        case ERROR:
          return { ...state, updatingComment: false };
        default:
          return {
            ...state,
            updatingComment: false,
          };
      }
    case DELETE_COMMENT:
      switch (action.payload) {
        case PENDING:
          return { ...state, deletingComment: true };
        case ERROR:
          return { ...state, deletingComment: false };
        default:
          return {
            ...state,
            deletingComment: false,
          };
      }

    // File Management
    case CREATE_FILE:
      switch (action.payload) {
        case PENDING:
          return { ...state, creatingFile: true };
        case ERROR:
          return { ...state, creatingFile: false };
        default:
          return {
            ...state,
            creatingFile: false,
          };
      }
    case UPDATE_FILE:
      switch (action.payload) {
        case PENDING:
          return { ...state, updatingFile: true };
        case ERROR:
          return { ...state, updatingFile: false };
        default:
          return {
            ...state,
            updatingFile: false,
          };
      }
    case DELETE_FILE:
      switch (action.payload) {
        case PENDING:
          return { ...state, deletingFile: true };
        case ERROR:
          return { ...state, deletingFile: false };
        default:
          return {
            ...state,
            deletingFile: false,
          };
      }
    default:
      return state;
  }
};
