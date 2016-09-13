import '../css/main.scss';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PieChart from './piechart/piechart';

class Application extends Component {
  render() {

    // get this by API
    var data1 = [
      {value: 20, label: "kakao", color: "#02B3E7"},
      {value: 5, label: "nutella", color: "#CFD3D6"},
      {value: 25,label: "glasur", color: "#736D79"},
      {value: 40, label: "pynt", color: "#FFEC62"}
    ];

    var data2 = [
      {value: 10, label: "a", color: "#02B3E7"},
      {value: 35, label: "b", color: "#CFD3D6"},
      {value: 55, label: "c", color: "#FFEC62"}
    ];

    return (
      <div className="container">
        <PieChart data={data1} />
        <PieChart data={data2} />
      </div>
    )
  }
}

ReactDOM.render(<Application/>, document.getElementById('application'));
