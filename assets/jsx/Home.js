import SearchEngine from './SearchEngine.js';
import Filter from './Filter.js';


const Router = ReactRouterDOM.Router;

class Home extends React.Component {
  
  render() {
    return (
    	<div id="wrap">
	        <img src="/images/chefs-logo-red.png" alt="" class="center" />

	        <SearchEngine />

	        <Filter />  
    	</div>
    );
  }

}

export default Home;