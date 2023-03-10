export const GetRepos = async (userName) => {
  return await fetch(`https://api.github.com/users/${userName}/repos`)
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
};
