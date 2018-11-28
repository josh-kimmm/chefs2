
class NavBar extends React.Component {

  render() {

    return (
      <header class="container-fluid">
        <div class="row">
          <nav class="col-sm-12 text-right">
            <a href="/" className="text-left"><p>HOME</p></a>
            <a href="/"><p>COMMUNITY</p></a>
            <a href="/"><p style={{color: '#A2AD7E'}}>MY PROFILE</p></a>
            <a href="/signup">SIGNUP </a>
            <a href="/login">LOGIN </a>
          </nav>
        </div>
      </header>
    );
  }
}

export default NavBar;