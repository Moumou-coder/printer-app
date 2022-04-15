import React, {useRef, useState} from 'react';

const Printer = () => {
    const [printerIPAddress, setPrinterIPAddress] = useState("192.168.0.239");
    const [printerPort, setPrinterPort] = useState("8008");
    const [textToPrint, setTextToPrint] = useState("");
    const [connectionStatus, setConnectionStatus] = useState("");

    const STATUS_CONNECTED = "Connected"

    const connect = () => {
        console.log("je vais me connecter ! ")
    }

    const print = () => {
        console.log("ceci va me permettre d'imprimer")
    }
    return (
        <>
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