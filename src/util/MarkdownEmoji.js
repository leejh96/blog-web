import emoji from "emoji-dictionary"; //이모티콘을 불러옴

const emojiSupport = (text) => {
  return text.replace(/:\w+:/gi, (name) => {
    if (emoji.getUnicode(name)) {
      return emoji.getUnicode(name);
    } else {
      return "";
    }
  });
};

export default emojiSupport;
