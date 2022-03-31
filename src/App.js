import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './components/HomeScreen';

function App() {
	return (
		<div className='App'>
			<Router>
				<Header />
				<Routes>
					<Route path={'/'} element={<HomeScreen />} exact />
				</Routes>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
