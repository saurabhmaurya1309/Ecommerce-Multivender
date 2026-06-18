export const isTokenExpired = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log("Token payload:", payload);
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};
