import axios from "axios";

export const redirectToInstagram = (req, res) => {
  const scopes = [
    "instagram_business_basic",
    "instagram_business_manage_messages",
    "instagram_business_manage_comments",
    "instagram_business_content_publish",
    "instagram_business_manage_insights"
  ].join("%2C"); // URL-encoded comma

  const url = `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=${process.env.INSTAGRAM_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=${scopes}`;

  res.redirect(url);
};


export const handleRedirect = async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send("Missing code parameter");
  }

  try {
    const tokenRes = await axios.post(
      "https://api.instagram.com/oauth/access_token",
      new URLSearchParams({
        client_id: process.env.INSTAGRAM_CLIENT_ID,
        client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
        grant_type: "authorization_code",
        redirect_uri: process.env.REDIRECT_URI,
        code: code,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, user_id } = tokenRes.data;

    // Send the access token and user_id back to the frontend
    res.redirect(`http://localhost:5173/profile?access_token=${access_token}&user_id=${user_id}`);
    // res.redirect(`http://localhost:5173/profile?access_token=${access_token}`);
  } catch (err) {
    console.error(
      "❌ Error exchanging code for token:",
      err.response?.data || err.message
    );
    res.status(500).send("Error getting access token");
  }
};
