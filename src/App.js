import "./App.css";
import Printer from "./Printer";
import Thermal from "./Thermal";

function App() {
	return (
		<div className="App">
			<h1>Connect to TM-U22 printer</h1>
			<hr />
			<header className="App-header">
				<Thermal />
			</header>
		</div>
	);
}

export default App;
