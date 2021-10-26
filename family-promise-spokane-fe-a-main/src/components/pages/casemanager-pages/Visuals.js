import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import '../Guests/guest.css';

const Visuals = ({ days, current, family }) => {
  console.log('im days.layout', days.layout);
  //eslint-disable-next-line
  const [figure, setFigure] = useState(null);

  return (
    <>
      <div>
        <Plot
          className="DataViz"
          data={days.data}
          layout={days.layout}
          frames={days.frames}
          config={days.config}
          onInitialized={figure => setFigure(figure)}
          onUpdate={figure => setFigure(figure)}
        />

        <Plot
          className="DataViz"
          data={current.data}
          layout={current.layout}
          frames={current.frames}
          config={current.config}
          onInitialized={figure => setFigure(figure)}
          onUpdate={figure => setFigure(figure)}
        />

        <Plot
          className="DataViz"
          data={family.data}
          layout={family.layout}
          frames={family.frames}
          config={family.config}
          onInitialized={figure => setFigure(figure)}
          onUpdate={figure => setFigure(figure)}
        />
      </div>
    </>
  );
};

export default Visuals;
