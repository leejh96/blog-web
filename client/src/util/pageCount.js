const pageCount = (cnt) => {
  let remainder = cnt % 10 ? 1 : 0;
  let pageCnt = parseInt(cnt / 10, 10) + remainder;
  if (pageCnt === 0) {
    return 1;
  }
  return pageCnt;
};

export default pageCount;
