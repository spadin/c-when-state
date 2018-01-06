import When from 'c-when';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({state});

const mergeProps = ({state}, _, {children, predicate, render}) => ({
  children,
  render,
  predicate: predicate(state),
});

export default connect(mapStateToProps, null, mergeProps)(When);
