export type DebtorToken = {
  debtorName: string;
  token: string;
  createdDate: string;
  expireDate: string;
};

export type AuthUser = {
  _id: string;
  password: string;
  email: string;
  __v: number;
  debtorsTokens: DebtorToken[];
};

export type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  isHydrated: boolean;
};
