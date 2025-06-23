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