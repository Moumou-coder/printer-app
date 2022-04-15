import "./App.css";
import Printer from "./Printer";

function App() {
	return (
		<div className="App">
			<h1>Connect to TM-U22 printer</h1>
			<hr />
			<header className="App-header">
				<Printer />
			</header>
		</div>
	);
}

export default App;
