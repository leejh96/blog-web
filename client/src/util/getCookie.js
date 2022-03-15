const getCookie = (cookie) => {
  const key = cookie.split("=")[0];
  let value = cookie.split("=")[1];

  if (value === "true") {
    value = true;
  } else {
    value = false;
  }

  return { key, value };
};

export default getCookie;
