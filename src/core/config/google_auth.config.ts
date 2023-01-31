import { OAuth2Client } from 'google-auth-library';

//TODO add to env
export class GoogleAuthConfig {
  public client: OAuth2Client;

  constructor() {
    this.client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
    );
  }
}
