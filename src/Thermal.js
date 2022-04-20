import React, { useState } from "react";

const Thermal = () => {
	//states
	const [printerIPAddress, setPrinterIPAddress] = useState("192.168.1.24");
	const [printerPort, setPrinterPort] = useState("8008");
	// const [textToPrint, setTextToPrint] = useState("");
	const [connectionStatus, setConnectionStatus] = useState("No connected");
	//variables
	const STATUS_CONNECTED = "Connected";

	// eslint-disable-next-line no-undef
	let ePosDev = new window.epson.ePOSDevice();
	const [printer, setPrinter] = useState(null);

	function toConnect() {
		ePosDev.connect(printerIPAddress, printerPort, callback_connect);
	}

	function callback_connect(resultConnect) {
		const deviceId = "local_printer";
		const options = { crypto: false, buffer: false };
		if (resultConnect === "OK" || resultConnect === "SSL_CONNECT_OK") {
			//Retrieves the Display object
			ePosDev.createDevice(
				deviceId,
				ePosDev.DEVICE_TYPE_PRINTER,
				options,
				callback_createDevice
			);
		} else {
			//Displays error messages
			alert(
				"Connection failed:" +
					printerIPAddress +
					":" +
					printerPort +
					", result error = " +
					resultConnect
			);
		}
	}

	function callback_createDevice(deviceObj, errorCode) {
		if (deviceObj === null) {
			//Displays an error message if the system fails to retrieve the Printer object
			console.log("error code => ", errorCode);
			return;
		}
		setConnectionStatus(STATUS_CONNECTED);
		setPrinter(deviceObj);
		//Registers the print complete event
		printer.timeout = 60000;
		printer.onreceive = function (res) {
			console.log("response : " + res.success);
		};
		printer.oncoveropen = function () {
			console.log("coveropen");
		};
		print();
	}

	function print() {
		if (!printer) {
			alert("no printer available");
			return;
		}

		console.log("my printer : " + printer);
		printer.addText("Hello moumou");
		printer.addFeedLine(5);
		printer.addCut(printer.CUT_FEED);

		printer.send();
	}

	function toDisconnect() {
		//Discards the Printer object
		ePosDev.deleteDevice(printer, callback_deleteDevice);
		function callback_deleteDevice(errorCode) {
			//Terminates connection with device
			ePosDev.disconnect();
		}
		console.log("printer disconnected ");
	}

	return (
		<div id="thermalPrinter">
			<input
				id="printerIPAddress"
				placeholder="Printer IP Address"
				value={printerIPAddress}
				onChange={(e) => setPrinterIPAddress(e.currentTarget.value)}
			/>
			<input
				id="printerPort"
				placeholder="Printer Port"
				value={printerPort}
				onChange={(e) => setPrinterPort(e.currentTarget.value)}
			/>
			<button onClick={() => toConnect()}>Connect</button>
			<hr />
			<h3 style={{ color: "black" }}>{connectionStatus}</h3>

			<button onClick={() => toDisconnect()}>disconnect</button>
			<button onClick={() => print()}>print information</button>
		</div>
	);
};

export default Thermal;
