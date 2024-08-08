const extractLink = (String) => {
  const myRex = /<img[^>]+src='([^'>]+)/g;
  const res = myRex.exec(String);
  return res?.[1];
};
export default extractLink;
