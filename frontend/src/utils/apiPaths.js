export const BASE_URL = "http://localhost:5000";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    GET_PROFILE: "/api/auth/me",

    // Corrected:
    UPDATE_PROFILE: "/api/users/profile",
    DELETE_RESUME: "/api/users/resume",
  },

  ANALYTICS: {
    OVERVIEW: "/api/analytics/overview",
  },

  JOBS: {
    GET_ALL_JOBS: "/api/jobs",
    POST_JOB: "/api/jobs",

    GET_JOB_BY_ID: (id) => `/api/jobs/${id}`,

    // Corrected:
    GET_JOBS_EMPLOYER: "/api/jobs/employer",

    UPDATE_JOB: (id) => `/api/jobs/${id}`,
    DELETE_JOB: (id) => `/api/jobs/${id}`,
    TOGGLE_CLOSE: (id) => `/api/jobs/${id}/toggle-close`,
  },

  SAVED_JOBS: {
    // Corrected
    SAVE_JOB: (id) => `/api/saved-jobs/${id}`,
    UNSAVE_JOB: (id) => `/api/saved-jobs/${id}`,
    GET_SAVED_JOBS: `/api/saved-jobs`,
  },

  APPLICATIONS: {
    APPLY_TO_JOB: (id) => `/api/applications/${id}`,
    GET_ALL_APPLICATIONS: `/api/applications/my`,
    GET_APPLICANTS_FOR_JOB: (jobId) =>
      `/api/applications/job/${jobId}`,
    GET_SINGLE_APPLICATION: (id) => `/api/applications/${id}`,
    UPDATE_STATUS: (id) => `/api/applications/${id}/status`,
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image",
  },
};
export default API_PATHS;
