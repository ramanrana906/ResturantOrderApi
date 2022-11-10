import { Route, Routes, Navigate } from "react-router-dom";
// import Main from "./component/Main";
import Signup from "./component/signup";
import Login from "./component/login";
import AddOrder from "./component/order";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<AddOrder />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
	);
}

export default App;