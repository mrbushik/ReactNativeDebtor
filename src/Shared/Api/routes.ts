export const apiRoutes = {
  auth: {
    login: "/login",
    refresh: "/refresh",
  },
  overview: {
    get: "/overview",
  },
  debt: {
    get: "/current-debt",
    add: "/add-debt",
  },
  history: {
    get: "/user-debts",
  },
} as const;
