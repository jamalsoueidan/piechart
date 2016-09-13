import React, {Component} from 'react';
import SVG from 'svgjs';

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {data: props.data}
    this.elementId = props.data[0].label + Math.floor((Math.random() * 1000) + 1); // just random ids for svg element
  }

  componentDidMount() {
    var data = this.state.data;

    // calculate the angles
    var degrees = data.reduce( (previousValue, currentValue) => previousValue + currentValue.value, 0);

    // calculate each sector and set all values
    data = data.map(o => {
      o.procent = PieChart.procent(o.value, degrees);
      return o;
    })

    // sort sectors by procent
    data = data.sort( (a, b) => b.procent-a.procent );

    // draw pie chart
    var draw = SVG(this.elementId).viewbox({x: 0, y: 0, width: 400, height: 400});
    var startAngle = 0; var endAngle = 0; var arc_flag = 0;
    console.log(startAngle);
    data.forEach(o => {
      arc_flag = 0;
      startAngle = endAngle;
      endAngle = startAngle + o.procent;
      if (o.procent>180) { arc_flag = 1; }
      var arc = draw.path("M200,200  L" + PieChart.x(startAngle) + "," + PieChart.y(startAngle)+ "  A180,180 0 " + arc_flag + ",1 " + PieChart.x(endAngle) + "," + PieChart.y(endAngle) + " z");
      arc.fill(o.color);
    });
  }

  render() {
    return (
      <div id={this.elementId} className="piechart" />
    )
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
