//auth
export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const LOGOUT_START = "LOGOUT_START";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";
export const TOKEN_VALID = "TOKEN_VALID";
export const TOKEN_INVALID = "TOKEN_INVALID";

//user
export const FETCH_USER_START = "FETCH_USER_START";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

export const EDIT_USER_START = "EDIT_USER_START";
export const EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS";
export const EDIT_USER_FAILURE = "EDIT_USER_FAILURE";

//profile
export const EDIT_PROFILE = "EDIT_PROFILE";
export const EDIT_PROFILE_SUCCESS = "EDIT_PROFILE_SUCCESS";
export const EDIT_PROFILE_FAILURE = "EDIT_PROFILE_FAILURE";

export const FETCH_PROFILE = "FETCH_PROFILE";
export const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS";
export const FETCH_PROFILE_FAILURE = "FETCH_PROFILE_FAILURE";

export const UPLOAD_CV_START = "UPLOAD_CV_START";
export const UPLOAD_CV_SUCCESS = "UPLOAD_CV_SUCCESS";
export const UPLOAD_CV_FAILURE = "UPLOAD_CV_FAILURE";

/* profiles pagination*/
export const GET_SOME_PROFILES_START = "GET_SOME_PROFILES_START";
export const GET_SOME_PROFILES_SUCCESS = "GET_SOME_PROFILES_SUCCESS";
export const GET_SOME_PROFILES_FAILURE = "GET_SOME_PROFILES_FAILURE";

//jobs
export const CREATE_JOB_START = "CREATE_JOB_START";
export const CREATE_JOB_SUCCESS = "CREATE_JOB_SUCCESS";
export const CREATE_JOB_FAILURE = "CREATE_JOB_FAILURE";

export const FETCH_JOBS_START = "FETCH_JOBS_START";
export const FETCH_JOBS_SUCCESS = "FETCH_JOBS_SUCCESS";
export const FETCH_JOBS_FAILURE = "FETCH_JOBS_FAILURE";

export const FETCH_USER_JOBS_START = "FETCH_USER_JOBS_START";
export const FETCH_USER_JOBS_SUCCESS = "FETCH_USER_JOBS_SUCCESS";
export const FETCH_USER_JOBS_FAILURE = "FETCH_USER_JOBS_FAILURE";

export const FETCH_JOB_APPLICANTS_START = "FETCH_JOB_APPLICANTS_START";
export const FETCH_JOB_APPLICANTS_SUCCESS = "FETCH_JOB_APPLICANTS_SUCCESS";
export const FETCH_JOB_APPLICANTS_FAILURE = "FETCH_JOB_APPLICANTS_FAILURE";

export const DELETE_JOB_START = "DELETE_JOB_START";
export const DELETE_JOB_SUCCESS = "DELETE_JOB_SUCCESS";
export const DELETE_JOB_FAILURE = "DELETE_JOB_FAILURE";

export const EDIT_JOB_START = "EDIT_JOB_START";
export const EDIT_JOB_SUCCESS = "EDIT_JOB_SUCCESS";
export const EDIT_JOB_FAILURE = "EDIT_JOB_FAILURE";

export const GET_JOB_START = "GET_JOB_START";
export const GET_JOB_SUCCESS = "GET_JOB_SUCCESS";
export const GET_JOB_FAILURE = "GET_JOB_FAILURE";

//quiz
export const ADD_QUESTION_START = "ADD_QUESTION_START";
export const ADD_QUESTION_SUCCESS = "ADD_QUESTION_SUCCESS";
export const ADD_QUESTION_FAILURE = "ADD_QUESTION_FAILURE";

export const EDIT_QUESTION_START = "EDIT_QUESTION_START";
export const EDIT_QUESTION_SUCCESS = "EDIT_QUESTION_SUCCESS";
export const EDIT_QUESTION_FAILURE = "EDIT_QUESTION_FAILURE";

export const DELETE_QUESTION_START = "DELETE_QUESTION_START";
export const DELETE_QUESTION_SUCCESS = "DELETE_QUESTION_SUCCESS";
export const DELETE_QUESTION_FAILURE = "DELETE_QUESTION_FAILURE";

//applicant
export const EDIT_APPLICANT_STATUS_START = "EDIT_APPLICANT_STATUS_START";
export const EDIT_APPLICANT_STATUS_SUCCESS = "EDIT_APPLICANT_STATUS_SUCCESS";
export const EDIT_APPLICANT_STATUS_FAILURE = "EDIT_APPLICANT_STATUS_FAILURE";

export const APPLY_FOR_JOB_START = "APPLY_FOR_JOB_START";
export const APPLY_FOR_JOB_SUCCESS = "APPLY_FOR_JOB_SUCCESS";
export const APPLY_FOR_JOB_FAILURE = "APPLY_FOR_JOB_FAILURE";

export const CANCEL_JOB_APPLICATION_START = "CANCEL_JOB_APPLICATION_START";
export const CANCEL_JOB_APPLICATION_SUCCESS = "CANCEL_JOB_APPLICATION_SUCCESS";
export const CANCEL_JOB_APPLICATION_FAILURE = "CANCEL_JOB_APPLICATION_FAILURE";

export const GET_APPLICANTS_START = "GET_APPLICANTS_START";
export const GET_APPLICANTS_SUCCESS = "GET_APPLICANTS_SUCCESS";
export const GET_APPLICANTS_FAILURE = "GET_APPLICANTS_FAILURE";

export const GET_APPLIED_JOBS_START = "GET_APPLIED_JOBS_START";
export const GET_APPLIED_JOBS_SUCCESS = "GET_APPLIED_JOBS_SUCCESS";
export const GET_APPLIED_JOBS_FAILURE = "GET_APPLICANTS_FAILURE";

//BLOG

export const UPLOAD_POST_START = "UPLOAD_POST_START";
export const UPLOAD_POST_SUCCESS = "UPLOAD_POST_SUCCESS";
export const UPLOAD_POST_FAILURE = "UPLOAD_POST_FAILURE";

export const EDIT_POST_START = "EDIT_POST_START";
export const EDIT_POST_SUCCESS = "EDIT_POST_SUCCESS";
export const EDIT_POST_FAILURE = "EDIT_POST_FAILURE";

export const DELETE_POST_START = "DELETE_POST_START";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_FAILURE = "DELETE_POST_FAILURE";

export const FETCH_POSTS_START = "FETCH_POSTS_START";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE";

export const LOAD_MORE_POSTS_START = "LOAD_MORE_POSTS_START";
export const LOAD_MORE_POSTS_SUCCESS = "LOAD_MORE_POSTS_SUCCESS";
export const LOAD_MORE_POSTS_FAILURE = "LOAD_MORE_POSTS_FAILURE";

/* 
Router.post("/",uploadEvent)
Router.put("/:id",editEvent)
Router.delete("/:id",deleteEvent)
Router.get("/",getEvents)
Router.get("/more/:skip/",getMoreEvents)
Router.post("/going",going)
*/

//EVENTS

export const UPLOAD_EVENT_START = "UPLOAD_EVENT_START";
export const UPLOAD_EVENT_SUCCESS = "UPLOAD_EVENT_SUCCESS";
export const UPLOAD_EVENT_FAILURE = "UPLOAD_EVENT_FAILURE";

export const EDIT_EVENT_START = "EDIT_EVENT_START";
export const EDIT_EVENT_SUCCESS = "EDIT_EVENT_SUCCESS";
export const EDIT_EVENT_FAILURE = "EDIT_EVENT_FAILURE";

export const DELETE_EVENT_START = "DELETE_EVENT_START";
export const DELETE_EVENT_SUCCESS = "DELETE_EVENT_SUCCESS";
export const DELETE_EVENT_FAILURE = "DELETE_EVENT_FAILURE";

export const FETCH_EVENTS_START = "FETCH_EVENTS_START";
export const FETCH_EVENTS_SUCCESS = "FETCH_EVENTS_SUCCESS";
export const FETCH_EVENTS_FAILURE = "FETCH_EVENTS_FAILURE";

export const LOAD_MORE_EVENTS_START = "LOAD_MORE_EVENTS_START";
export const LOAD_MORE_EVENTS_SUCCESS = "LOAD_MORE_EVENTS_SUCCESS";
export const LOAD_MORE_EVENTS_FAILURE = "LOAD_MORE_EVENTS_FAILURE";

export const SET_GOING_START = "SET_GOING_START";
export const SET_GOING_SUCCESS = "SET_GOING_SUCCESS";
export const SET_GOING_FAILURE = "SET_GOING_FAILURE";

/* chat */
export const GET_CONVERSATION_START = "GET_CONVERSATION_START";
export const GET_CONVERSATION_SUCCESS = "GET_CONVERSATION_SUCCESS";
export const GET_CONVERSATION_FAILURE = "GET_CONVERSATION_FAILURE";

export const FETCH_CONVERSATIONS_START = "FETCH_CONVERSATIONS_START";
export const FETCH_CONVERSATIONS_SUCCESS = "FETCH_CONVERSATIONS_SUCCESS";
export const FETCH_CONVERSATIONS_FAILURE = "FETCH_CONVERSATIONS_FAILURE";

export const CREATE_CONVERSATION_START = "CREATE_CONVERSATION_START";
export const CREATE_CONVERSATION_SUCCESS = "CREATE_CONVERSATION_SUCCESS";
export const CREATE_CONVERSATION_FAILURE = "CREATE_CONVERSATION_FAILURE";

export const ADD_NEW_MESSAGE = "ADD_NEW_MESSAGE";
export const CHECK_AND_ADD_NEW_CONVERSATION = "CHECK_AND_ADD_NEW_CONVERSATION";
/* COMPANY */

export const OPEN_CONTACT_START = "OPEN_CONTACT_START";
export const OPEN_CONTACT_SUCCESS = "OPEN_CONTACT_SUCCESS";
export const OPEN_CONTACT_FAILURE = "OPEN_CONTACT_FAILURE";

/* ADMIN */
export const CHANGE_COMPANY_PLAN_START = "CHANGE_COMPANY_PLAN_START";
export const CHANGE_COMPANY_PLAN_SUCCESS = "CHANGE_COMPANY_PLAN_SUCCESS";
export const CHANGE_COMPANY_PLAN_FAILURE = "CHANGE_COMPANY_PLAN_FAILURE";

export const ADMIN_LOGIN_START = "ADMIN_LOGIN_START";
export const ADMIN_LOGIN_SUCCESS = "ADMIN_LOGIN_SUCCESS";
export const ADMIN_LOGIN_FAILURE = "ADMIN_LOGIN_FAILURE";

export const ADMIN_GET_ANALYSIS_START = "ADMIN_GET_ANALYSIS_START";
export const ADMIN_GET_ANALYSIS_SUCCESS = "ADMIN_GET_ANALYSIS_SUCCESS";
export const ADMIN_GET_ANALYSIS_FAILURE = "ADMIN_GET_ANALYSIS_FAILURE";

export const ADMIN_GET_ANALYSIS_WEBSITE_START =
  "ADMIN_GET_ANALYSIS_WEBSITE_START";
export const ADMIN_GET_ANALYSIS_WEBSITE_SUCCESS =
  "ADMIN_GET_ANALYSIS_WEBSITE_SUCCESS";
export const ADMIN_GET_ANALYSIS_WEBSITE_FAILURE =
  "ADMIN_GET_ANALYSIS_WEBSITE_FAILURE";

export const FETCH_COMPANIES_START = "FETCH_COMPANIES_START";
export const FETCH_COMPANIES_SUCCESS = "FETCH_COMPANIES_SUCCESS";
export const FETCH_COMPANIES_FAILURE = "FETCH_COMPANIES_FAILURE";

export const SET_INTERVIEW_CODE = "SET_INTERVIEW_CODE";
export const REMOVE_INTERVIEW_CODE = "REMOVE_INTERVIEW_CODE";

/* notifications */
export const GET_UNREAD_NOTIFICATIONS_START = "GET_UNREAD_NOTIFICATIONS_START";
export const GET_UNREAD_NOTIFICATIONS_SUCCESS =
  "GET_UNREAD_NOTIFICATIONS_SUCCESS";
export const GET_UNREAD_NOTIFICATIONS_FAILURE =
  "GET_UNREAD_NOTIFICATIONS_FAILURE";
