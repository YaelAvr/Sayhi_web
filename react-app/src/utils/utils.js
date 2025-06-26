export function getUserIdFromToken() {
  const lsToken = localStorage.getItem("token");
  if (!lsToken) return null;

  try {
    const token = lsToken.split('.')[1];
    const data = JSON.parse(atob(token));
    return data.id; // מחזיר את ה־ID
  } catch (e) {
    console.error("Invalid token", e);
    return null;
  }
}

export const verifyToken = async ({setAuthStatus}) => {
      const token = localStorage.getItem("token");

      console.log("othenticating user with token:", token);
      

      // there is no token in localStorage
      if (!token) {
        setAuthStatus("unauthenticated");
        return;
      }

      // check if the token is valid
      try {
        const res = await fetch("/api/tokens/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          // the token is valid
          setAuthStatus("authenticated");
        } else {
          throw new Error("Token verification failed");
        }
      } catch (error) {
        //Token is invalid- removing from storage.
        localStorage.removeItem("token");
        setAuthStatus("unauthenticated");
      }
    };
