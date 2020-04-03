import React, { useEffect, useState } from 'react';

import DeckGL, { OrbitView } from 'deck.gl';
import { LASLoader } from '@loaders.gl/las';
import { load } from '@loaders.gl/core';

import { renderLayers } from './Layers.js';

const INITIAL_VIEW_STATE = {
	fovy: 50,
	height: 1176,
	orbitAxis: 'Z',
	position: [ 0, 0, 0 ],
	rotationOrbit: 6.466275659824047,
	rotationX: -89.999,
	target: [ -64541.11565260632, -146767.10235869358, 15.396177578410983 ],
	transitionDuration: 0,
	width: 1364,
	zoom: 5.5068371397691935
};

function App() {
	const [ viewport, setViewport ] = useState(INITIAL_VIEW_STATE);
	const [ lasdata, setLasdata ] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const reslut = await load('./data/30D7318011101-3.laz', LASLoader);


			const { vertexCount } = reslut.header;
			setLasdata({
				pointsCount: vertexCount,
				points: reslut.attributes.POSITION.value,
				colors: reslut.attributes.COLOR_0.value
			});

		};

		fetchData();
	}, []);

	const onViewStateChange = (v) => {
		setViewport(v.viewState);
	};

	return (
		<div className="App">
			<span>{console.log(viewport)}</span>
			<DeckGL
				views={new OrbitView()}
				viewState={viewport}
				controller={true}
				layers={renderLayers({
					data: lasdata
				})}
				parameters={{
					clearColor: [ 0.07, 0.14, 0.19, 1 ]
				}}
				onViewStateChange={onViewStateChange}
			/>
		</div>
	);
}

export default App;
