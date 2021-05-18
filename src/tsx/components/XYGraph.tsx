import React from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries,
  Crosshair
} from 'react-vis';

type Props = { initialData: any };
type States = { data: any, crosshairValues: [] , updatePlot: boolean };

class XYGraph extends React.Component<Props , States> {

  constructor( props:any ) {
    
    super(props);
    this.state = { data: props.initialData, crosshairValues: [] , updatePlot: false };

    document.addEventListener('updatePlots', ()=> this.setState({updatePlot: !this.state.updatePlot}), false);

  }

  _onMouseLeave = () => {
    this.setState({crosshairValues: []});
  };
  
  _onNearestX = (value, {index}) => {
    this.setState({crosshairValues: this.state.data.map(d => d[index])});
  };

  render() {
    
    const lineSeriesProps = {
      color: '#0D676C',
      colorRange: ['#59E4EC', '#0D676C'],
      opacityType: 'literal',
      strokeWidth: 1,
      data: this.state.data[0][0],
      onNearestX: this._onNearestX
    };

    const lineSeriesProps1 = {
      color: '#DB7425',
      colorRange: ['#59E4EC', '#0D676C'],
      opacityType: 'literal',
      strokeWidth: 1,
      data: this.state.data[0][1],
      onNearestX: this._onNearestX
    };

    const lineSeriesProps2 = {
      color: '#9C27CF',
      colorRange: ['#59E4EC', '#0D676C'],
      opacityType: 'literal',
      strokeWidth: 1,
      data: this.state.data[0][2],
      onNearestX: this._onNearestX
    };

	return(
      <XYPlot onMouseLeave={this._onMouseLeave} width={1024} height={300}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis title="Sample[n]"/>
        <YAxis title="Amplitude"/>
        <LineSeries {...lineSeriesProps} />
        <LineSeries {...lineSeriesProps1} />
        <LineSeries {...lineSeriesProps2} />
      </XYPlot>);

  }

}

export default XYGraph;

//<Crosshair values={this.state.crosshairValues}/> FUTURE IN XYPLOT