import React from 'react';
import { Container } from 'react-bootstrap';
import { projectGithubURL } from '../resources/resources.js';

const Footer = () => {
	return (
		<Container className='footer d-flex justify-content-center p-3 w-100'>
			<Container className='d-flex justify-content-between p-4 w-100 bg-dark text-light rounded'>
				<p className='m-0'>Created by Sameer N.</p>
				<a
					className='m-0 cursor-clickable not-link'
					href={projectGithubURL}
					target='_blank'
					rel='noopener noreferrer'
				>
					Project GitHub
				</a>
			</Container>
		</Container>
	);
};

export default Footer;
