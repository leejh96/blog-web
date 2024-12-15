const checkPassword = (password) => {
  const blank = /\s/;
  const regex =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
  if (!blank.test(password)) {
    if (regex.test(password)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export default checkPassword;
