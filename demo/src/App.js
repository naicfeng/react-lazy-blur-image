import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProgressiveImage from 'react-lazy-progressive-image';

function App() {
	var foo = [];

	for (var i = 1; i <= 1000; i++) {
		foo.push(i);
	}

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				{foo.map((f, index) => {
					return (
						<ProgressiveImage
							uri={`https://picsum.photos/seed/${index}/200/300/`}
							thumbnail={`https://picsum.photos/seed/${index}/200/300`}
							render={(src, style) => (
								<div
									style={{
										marginTop: 15,
										borderRadius: 10,
									}}
								>
									<img
										className="shadow"
										src={src}
										style={{
											...style,
											width: 300,
											height: 200,
											objectFit: 'cover',
											borderRadius: 10,
										}}
									/>
								</div>
							)}
						/>
					);
				})}
			</header>
		</div>
	);
}

export default App;
