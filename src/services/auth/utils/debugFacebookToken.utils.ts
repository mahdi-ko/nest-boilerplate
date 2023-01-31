import { FacebookDebugTokenResponse } from '../types';

export const debugFacebookToken = async (
  token: string,
): Promise<FacebookDebugTokenResponse> => {
  const debugToken = await fetch(
    `https://graph.facebook.com/debug_token?input_token=${token}&access_token=${process.env.FACEBOOK_APP_ID}|${process.env.FACEBOOK_APP_SECRET}`,
  );
  return debugToken.json();
};
