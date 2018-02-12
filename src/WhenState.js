import When from 'c-when';
import {connect} from 'react-redux';

const mapStateToProps = (state, {predicate}) => ({
  predicate: predicate(state),
});

export default connect(mapStateToProps)(When);
