const getCookie = (data) => {
  let cookies = data.replace(/(\s*)/g, "");
  cookies = cookies.split(";");

  const splitCookies = cookies.map((cookie) => {
    return {
      key: cookie.split("=")[0],
      value: cookie.split("=")[1],
    };
  });

  return splitCookies;
};

export default getCookie;
