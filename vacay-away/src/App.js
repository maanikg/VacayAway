import logo from './logo.svg';
import './App.css';

function App() {
  const user = {
    name: 'Vacation Person',
    location: {
      city: 'San Francisco',
      country: 'USA'
    }
  }


  return (
    <div className="App">
      {/* <div className="wrapper">
        <div className="first">first</div>
        <div className="second">second</div>
        <div className="third">third</div>
      </div> */}
      <header>
        <p>Created by {user.name}</p>
        <p>Location: {user.location.city}, {user.location.country}</p>
        {/* <React.Button> </React.Button> */}
        {/* <Button> </Button> */}
        {/* <button>Hi</button> */}
      </header>
      <header className="App-body">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          {/* <button>Hi</button> */}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <footer>
        <p>Created by {user.name}</p>
        <p>Location: {user.location.city}, {user.location.country}</p>
      </footer>
    </div>
  );
}

export default App;
