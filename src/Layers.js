import  { COORDINATE_SYSTEM, PointCloudLayer } from 'deck.gl';

export function renderLayers(props) {
	const data = props.data;
	if (!data || !data.points) return [];

	const pointlayer = data.points
		? new PointCloudLayer({
				id: 'laz-point-cloud-layer',
				coordinateSystem: COORDINATE_SYSTEM.IDENTITY,
				numInstances: data.pointsCount,
				instancePositions: data.points,
				instanceColors: data.colors,
				getNormal: [ 1, 1, 1 ],
				opacity: 1,
				pointSize: 2
			})
		: [];

	return [ pointlayer ];
}
