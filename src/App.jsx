import "./App.css";
import WeatherNow from "./WeatherNow";
import LightRays from "./LightRays";

function App() {
  return (
    <div className="App">
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#fff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "black", // semi-transparent
            backdropFilter: "blur(2px)", // optional: adds blur
            zIndex: 2,
          }}
        >
          <WeatherNow />
        </div>
      </div>
    </div>
  );
}

export default App;
