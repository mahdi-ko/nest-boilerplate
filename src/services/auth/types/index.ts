export type FacebookDebugTokenResponse = {
  data: {
    app_id: number;
    application: string;
    expires_at: number;
    is_valid: boolean;
    issued_at: number;
    metadata: {
      sso: string;
    };
    scopes: string[];
    user_id: number;
  };
};
