const getWindowSize = () => {
  if (typeof window !== 'undefined') {
    const { innerWidth, innerHeight } = window;

    return { innerWidth, innerHeight };
  }

  return null;
};

export default getWindowSize;
