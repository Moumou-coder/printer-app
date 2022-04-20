import React, { useRef, useState } from "react";

const Printer = () => {
	const [ipAddress, setIpAddress] = useState("192.168.0.239");
	const [port, setPort] = useState("8008");
	const deviceID_printer = "local_printer";
	const [textToPrint, setTextToPrint] = useState("");
	const [connectionStatus, setConnectionStatus] = useState("");

	const STATUS_CONNECTED = "Connected";
	let ePosDev = new window.epson.ePOSDevice();
	let printer;

	function connect() {
		ePosDev.connect(ipAddress, port, callback_connect);
	}

	function callback_connect(data) {
		if (data == "OK" || data == "SSL_CONNECT_OK") {
			ePosDev.createDevice(
				"local_printer",
				ePosDev.DEVICE_TYPE_PRINTER,
				{ crypto: false, buffer: false },
				cbCreateDevice_printer
			);
		} else {
			alert("Connection failed:" + ipAddress + ":" + port + ", data = " + data);
		}
	}

	function cbCreateDevice_printer(devobj, retcode) {
		if (retcode == "OK") {
			printer = devobj;
			printer.onreceive = function (res) {
				alert(res.success);
			};
			printer.oncoveropen = function () {
				alert("coveropen");
			};
			setConnectionStatus(STATUS_CONNECTED);
		} else {
			alert(retcode);
		}
	}

	const print = (text) => {
		// if (!printer) {
		// 	alert("Not connected to printer");
		// 	return;
		// }
		printer.addTextAlign(printer.ALIGN_CENTER);
		printer.addText(text);
		printer.send();
		printer.addCut(printer.CUT_FEED);
		printer.send();
	};

	return (
		<>
			<input
				id="printerIPAddress"
				placeholder="Printer IP Address"
				value={ipAddress}
				onChange={(e) => setIpAddress(e.currentTarget.value)}
			/>
			<input
				id="printerPort"
				placeholder="Printer Port"
				value={port}
				onChange={(e) => setPort(e.currentTarget.value)}
			/>
			<button
				disabled={connectionStatus === STATUS_CONNECTED}
				onClick={() => connect()}
			>
				Connect
			</button>
			<span className="status-label">{connectionStatus}</span>
			<textarea
				id="textToPrint"
				rows="3"
				placeholder="Text to print"
				value={textToPrint}
				onChange={(e) => setTextToPrint(e.currentTarget.value)}
			/>
			<button
				disabled={connectionStatus !== STATUS_CONNECTED}
				onClick={() => print(textToPrint)}
			>
				Print
			</button>
		</>
	);
};

export default Printer;
