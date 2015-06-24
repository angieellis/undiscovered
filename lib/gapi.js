var googleapis = require('googleapis'),
    OAuth2Client = googleapis.OAuth2Client,
    client = process.env.CLIENT_ID,
    secret = process.env.CLIENT_SECRET,
    redirect = 'http://localhost:3000/auth/google/callback',
    calendar_auth_url = '',
    oauth2Client = new OAuth2Client(client, secret, redirect);

var url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: 'https://www.googleapis.com/auth/plus.me'
});

calendar_auth_url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar'
});

exports.url = calendar_auth_url;
