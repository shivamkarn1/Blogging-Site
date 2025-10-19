export const isTokenValid = () => {
  const token = localStorage.getItem("token");
  const tokenExpiry = localStorage.getItem("tokenExpiry");

  if (!token || !tokenExpiry) {
    return false;
  }

  const now = new Date().getTime();
  const expiryTime = parseInt(tokenExpiry);

  return now < expiryTime;
};

export const clearAuthData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiry");
};

export const getAuthToken = () => {
  if (isTokenValid()) {
    return localStorage.getItem("token");
  }
  clearAuthData();
  return null;
};
