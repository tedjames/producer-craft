import {
  CREATE_COURSE,
  FETCH_COURSES,
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
} from '../actions/types';

const INITIAL_STATE = {
  error: '',
  success: '',
  // course management
  fetchingCourses: false,
  creatingCourse: false,
  updatingCourse: false,
  deletingCourse: false,
  // lesson management
  fetchingLessons: false,
  creatingLesson: false,
  updatingLesson: false,
  deletingLesson: false,
  // comment management
  fetchingComments: false,
  creatingComment: false,
  updatingComment: false,
  deletingComment: false,
  // file management
  fetchingFiles: false,
  creatingFile: false,
  updatingFile: false,
  deletingFile: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Public Endpoints - fetching lesson and course data
    case FETCH_COURSES:
      switch (action.payload) {
        case PENDING:
          return { ...state, fetchingCourses: true };
        case ERROR:
          return { ...state, error: '', fetchingCourses: false };
        default:
          return {
            ...state,
            success: 'Successfully fetched courses',
            courses: action.payload,
            fetchingCourses: false,
          };
      }
    case FETCH_LESSONS:
      switch (action.payload) {
        case PENDING:
          return { ...state, fetchingLessons: true };
        case ERROR:
          return { ...state, error: '', fetchingLessons: false };
        default:
          return {
            ...state,
            success: 'Successfully fetched lessons',
            lessons: action.payload,
            fetchingLessons: false,
          };
      }

    // Private Endpoints - writing/deleting course, lesson and file data
    case CREATE_COURSE:
      switch (action.payload) {
        case PENDING:
          return { ...state, creatingCourse: true };
        case ERROR:
          return { ...state, error: '', creatingCourse: false };
        default:
          return {
            ...state,
            success: 'Successfully created course',
            courses: action.payload,
            creatingCourse: false,
          };
      }
    case DELETE_COURSE:
      switch (action.payload) {
        case PENDING:
          return { ...state, deletingCourse: true };
        case ERROR:
          return { ...state, error: '', deletingCourse: false };
        default:
          return {
            ...state,
            success: 'Successfully deleted course',
            courses: action.payload,
            deletingCourse: false,
          };
      }
    case UPDATE_COURSE:
      switch (action.payload) {
        case PENDING:
          return { ...state, updatingCourse: true };
        case ERROR:
          return { ...state, error: '', updatingCourse: false };
        default:
          return {
            ...state,
            success: 'Successfully updated course',
            updatingCourse: false,
          };
      }
    default:
      return state;
  }
};
