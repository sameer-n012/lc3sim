import React from 'react';
import { Container, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const Header = () => {
	const navigate = useNavigate();

	const gotoHome = () => {
		navigate('/');
	};

	return (
		<Container className='d-flex justify-content-center p-3 w-100'>
			<Container className='d-flex p-4 w-100 bg-dark text-light rounded'>
				<Image
					onClick={() => gotoHome()}
					className='img-fluid locked-scale-image ms-3  me-5 h-100 cursor-clickable'
					src={process.env.PUBLIC_URL + 'favicon-light.png'}
				/>
				<h1 className='m-0 cursor-clickable' onClick={() => gotoHome()}>
					LC-3 Web Simulator
				</h1>
			</Container>
		</Container>
	);
};

export default Header;
