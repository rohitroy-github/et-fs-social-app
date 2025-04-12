const LoginButton = () => {
  const loginUrl = `https://www.instagram.com/oauth/authorize?client_id=${
    import.meta.env.VITE_INSTAGRAM_CLIENT_ID
  }&redirect_uri=${
    import.meta.env.VITE_REDIRECT_URI
  }&scope=instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish&response_type=code`;

  return (
    <a
      href={loginUrl}
      className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
    >
      Login with Instagram
    </a>
  );
};

export default LoginButton;
