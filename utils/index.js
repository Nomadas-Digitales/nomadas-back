const upperCaseFn = (str) => str.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());

const catcher =
  (fn) =>
  async ({ ...args }) => {
    try {
      await fn({ ...args });
    } catch (error) {
      console.info('Error at query: ', error.message);
      return false;
    }
  };

module.exports = {
  upperCaseFn,
  catcher,
};
