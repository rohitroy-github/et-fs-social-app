import axios from 'axios';

export const getProfile = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(400).send("No access token provided");
  }

  try {
    // Use Instagram's Graph API to fetch user profile
    const profileRes = await axios.get('https://graph.instagram.com/me', {
      params: {
        fields: 'id,username,name,profile_picture_url',
        access_token: token,
      },
    });

    const profile = profileRes.data;
    res.json(profile); // Send profile data to frontend
  } catch (err) {
    console.error('Error fetching profile from Instagram:', err.response?.data || err.message);
    res.status(500).send('Failed to fetch Instagram profile');
  }
};
