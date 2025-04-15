import axios from "axios";

export const handleLoginToInstagram = (req, res) => {
  const scopes = [
    "instagram_business_basic",
    "instagram_business_manage_messages",
    "instagram_business_manage_comments",
    "instagram_business_content_publish",
    "instagram_business_manage_insights",
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

    // Fetching @username for generation
    const profileRes = await axios.get(`https://graph.instagram.com/v17.0/me`, {
      params: {
        fields: "username",
        access_token: access_token,
      },
    });

    const { username } = profileRes.data;

    // Redirect with access token, user_id, and username in URL
    res.redirect(
      `http://localhost:5173/${username}/profile?access_token=${access_token}&user_id=${user_id}&user_name=${username}`
    );
  } catch (err) {
    console.error(
      "❌ Error exchanging code for token or fetching profile:",
      err.response?.data || err.message
    );
    res.status(500).send("Error during Instagram OAuth process");
  }
};


export const fetchUserProfileInformation = async (req, res) => {
  const { access_token } = req.query;

  if (!access_token) {
    return res.status(400).json({ error: "Missing access_token" });
  }

  try {
    const response = await axios.get(
      `https://graph.instagram.com/v22.0/me`,
      {
        params: {
          fields:
            "id,account_type,profile_picture_url,followers_count,follows_count,media_count,biography,name",
          access_token,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Failed to fetch Instagram profile:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch profile data" });
  }
};

export const fetchUserPosts = async (req, res) => {
  const { access_token, user_id } = req.query;

  if (!access_token || !user_id) {
    return res.status(400).json({ error: "Missing access_token or user_id" });
  }

  try {
    // Step 1: Get basic media list
    const mediaRes = await axios.get(
      `https://graph.instagram.com/v22.0/${user_id}/media`,
      {
        params: {
          access_token,
        },
      }
    );

    const mediaList = mediaRes.data.data;

    // Step 2: Fetch details of each media
    const mediaDetails = await Promise.all(
      mediaList.map(async (media) => {
        const baseRes = await axios.get(
          `https://graph.instagram.com/${media.id}`,
          {
            params: {
              fields: "id,media_type,media_url,timestamp",
              access_token,
            },
          }
        );
        const baseMedia = baseRes.data;

        // If it's a carousel, get children details
        if (baseMedia.media_type === "CAROUSEL_ALBUM") {
          const childrenRes = await axios.get(
            `https://graph.instagram.com/${media.id}/children`,
            {
              params: {
                access_token,
              },
            }
          );

          const childrenDetails = await Promise.all(
            childrenRes.data.data.map(async (child) => {
              const childRes = await axios.get(
                `https://graph.instagram.com/${child.id}`,
                {
                  params: {
                    fields: "id,media_type,media_url,timestamp",
                    access_token,
                  },
                }
              );
              return childRes.data;
            })
          );

          return {
            ...baseMedia,
            children: childrenDetails,
          };
        }

        return baseMedia;
      })
    );

    res.status(200).json(mediaDetails);
  } catch (error) {
    console.error("Failed to fetch user media:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch media" });
  }
};

