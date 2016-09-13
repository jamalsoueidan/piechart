import React, {Component} from 'react';
import SVG from 'svgjs';

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {data: props.data}
    this.elementId = props.data[0].label + Math.floor((Math.random() * 1000) + 1); // just random id for svg element
  }

  // draw pie chart
  drawSVG(data) {
    let draw = SVG(this.elementId).viewbox({x: 0, y: 0, width: 400, height: 400});
    data.forEach(o => {
      draw.path("M200,200  L" + o.lineTo.x + "," + o.lineTo.y + "  A180,180 0 " + (o.procent > 180 ? "1" : "0") + ",1 " + o.ellipticalArcs.x + "," + o.ellipticalArcs.y + " z")
          .fill(o.color);
    });
  }

  componentDidMount() {
    this.drawSVG(PieChart.makeCalculation(this.state.data));
  }

  render() {
    return (
      <div id={this.elementId} className="piechart" />
    )
  }

  static makeCalculation(data) {
    // calculate the angles
    const degrees = data.reduce( (previousValue, currentValue) => previousValue + currentValue.value, 0);

    // calculate each sector and set all values
    let startAngle = 0; let endAngle = 0; let procent;
    data = data.map(o => {
      procent = PieChart.procent(o.value, degrees)
      startAngle = endAngle;
      endAngle = startAngle + procent;
      o.procent = procent;
      o.lineTo = { x: PieChart.x(startAngle), y: PieChart.y(startAngle) }
      o.ellipticalArcs = {x: PieChart.x(endAngle), y:PieChart.y(endAngle) }
      return o;
    })

    return data;
  }

  static x(angle) {
    return Math.ceil(200 + 180 * Math.cos(Math.PI * angle/180));
  }

  static y(angle) {
    return Math.ceil(200 + 180 * Math.sin(Math.PI * angle/180));
  }

  static procent(value, degree) {
    return Math.ceil(360 * value/degree)
  }
}

export default PieChart;
