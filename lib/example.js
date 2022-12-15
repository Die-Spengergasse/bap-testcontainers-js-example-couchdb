import fetch from "node-fetch";

export default (url) => {
  const version = async () => {
    const r = await fetch(url);
    const j = await r.json();
    return j.version;
  };

  return { version };
};
