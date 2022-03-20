export const userIsLogged = async () => {
  let localStr = await localStorage.getItem("user");
  let user = JSON.parse(localStr);
  if (user && user.email && user._id && user.username) return true;
  else return false;
}

export const logout = () => {
  localStorage.removeItem("user");
}