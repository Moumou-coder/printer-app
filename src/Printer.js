import React, { useRef, useState } from "react";

const Printer = () => {
	const [ipAddress, setIpAddress] = useState("192.168.1.24");
	const [port, setPort] = useState("8008");
	// const [textToPrint, setTextToPrint] = useState("please work hello my world");
	const [connectionStatus, setConnectionStatus] = useState("");

	//constantes
	const STATUS_CONNECTED = "Connected";
	const deviceID_printer = "local_printer";
	const options = { crypto: false, buffer: false };
	const printer = useRef();
	const ePosDev = new window.epson.ePOSDevice();
	const userId = "XML204";

	function connect() {
		ePosDev.connect(ipAddress, port, callback_connect);
	}

	function callback_connect(data) {
		if (data == "OK" || data == "SSL_CONNECT_OK") {
			ePosDev.createDevice(
				deviceID_printer,
				ePosDev.DEVICE_TYPE_PRINTER,
				options,
				cbCreateDevice_printer
			);
		} else {
			alert("Connection failed:" + ipAddress + ":" + port + ", data = " + data);
		}
	}

	function cbCreateDevice_printer(devobj, retcode) {
		if (retcode == "OK") {
			printer.current = devobj;
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
		let device = printer.current;
		if (!device) {
			alert("Not connected to printer");
			return;
		}
		device.addText(userId);
		device.addFeedLine(0);
		device.addCut(device.CUT_FEED);
		device.send();
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
			{/* <textarea
				id="textToPrint"
				rows="3"
				placeholder="Text to print"
				value={textToPrint}
				onChange={(e) => setTextToPrint(e.currentTarget.value)}
			/> */}
			<button
				disabled={connectionStatus !== STATUS_CONNECTED}
				onClick={() => print()}
			>
				Print
			</button>
		</>
	);
};

export default Printer;
