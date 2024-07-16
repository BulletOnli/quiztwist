import { google } from "googleapis";

const get0AuthClient = (accessToken: string) => {
  const oauth = new google.auth.OAuth2();

  oauth.on("tokens", (tokens) => {
    console.log(tokens);
    if (tokens.refresh_token) {
      oauth.setCredentials({
        refresh_token: tokens.refresh_token,
        access_token: accessToken,
      });
    }
  });

  oauth.setCredentials({
    access_token: accessToken,
  });

  return oauth;
};

export default get0AuthClient;
