import axios from "axios";

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

export const fetchPostComments = async (req, res) => {
  const { access_token, media_id } = req.query;

  if (!access_token || !media_id) {
    return res.status(400).json({ error: "Missing access_token or media_id" });
  }

  try {
    const response = await axios.get(
      `https://graph.instagram.com/v22.0/${media_id}/comments`,
      {
        params: {
          fields: "id,text,timestamp,like_count,from",
          access_token,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching comments:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

export const handleCommentReply = async (req, res) => {
  const { access_token, comment_id, message } = req.body;

  if (!access_token || !comment_id || !message) {
    return res.status(400).json({ error: "Missing access_token, comment_id or message" });
  }

  try {
    const response = await axios.post(
      `https://graph.instagram.com/${comment_id}/replies`,
      null,
      {
        params: {
          message,
          access_token,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error sending reply:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to send reply" });
  }
};

