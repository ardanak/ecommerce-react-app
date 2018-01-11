import { connect } from 'react-redux';
import HomeView from '../components/HomeView';

const mapStateToProps = (state) => ({
  featuredProducts: state.products.featured,
  fetching: state.products.fetchingFeaturedProducts
});

export default connect(mapStateToProps)(HomeView);
