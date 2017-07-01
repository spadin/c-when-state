import When from 'c-when';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({state});

const mergeProps = ({state}, _, {children, predicate}) => ({
  children,
  predicate: predicate(state),
});

export default connect(mapStateToProps, null, mergeProps)(When);
