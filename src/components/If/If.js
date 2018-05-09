import PropTypes from 'prop-types';

const If = ({ condition, render, children }) => (
  condition // eslint-disable-line no-nested-ternary
    ? render ? render() : children
    : null
);

If.propTypes = {
  condition: PropTypes.bool.isRequired,
  render: PropTypes.func,
  children: PropTypes.node,
};

export default If;
