export default ({
  loading,
  error,
  children,
}) => {
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return children;
};
