import axios from 'axios';

export const redirectToInstagram = (req, res) => {
  const url = `https://www.instagram.com/oauth/authorize?client_id=${process.env.INSTAGRAM_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=instagram_basic,instagram_manage_comments,instagram_manage_insights,instagram_content_publish&response_type=code`;
  res.redirect(url);
};

export const handleRedirect = async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('Missing code parameter');
  }

  try {
    const tokenRes = await axios.post(
      'https://api.instagram.com/oauth/access_token',
      new URLSearchParams({
        client_id: process.env.INSTAGRAM_CLIENT_ID,
        client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: process.env.REDIRECT_URI,
        code: code,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token, user_id } = tokenRes.data;
    res.json({ access_token, user_id });
  } catch (err) {
    console.error('❌ Error exchanging code for token:', err.response?.data || err.message);
    res.status(500).send('Error getting access token');
  }
};
