import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";

// Not: StrictMode bilinçli olarak kapalı — motor imperatif interval/promise
// akışları kullanıyor; dev modunda çift mount kafa karıştırmasın.
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
