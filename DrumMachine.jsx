const { useState, useEffect } = React;

const DRUM_PADS = [
  { key: "Q", sound: "Heater 1", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
  { key: "W", sound: "Heater 2", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
  { key: "E", sound: "Heater 3", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
  { key: "A", sound: "Heater 4", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },
  { key: "S", sound: "Clap", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
  { key: "D", sound: "Open-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
  { key: "Z", sound: "Kick-n'-Hat", url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
  { key: "X", sound: "Kick", url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
  { key: "C", sound: "Closed-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" },
];

function DrumMachine() {
  const [display, setDisplay] = useState("");

  function playSound(key) {
    const pad = DRUM_PADS.find(p => p.key === key.toUpperCase());
    if (!pad) return;
    const audio = document.getElementById(pad.key);
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      setDisplay(pad.sound);
    }
  }

  useEffect(() => {
    function handleKeyDown(e) {
      playSound(e.key);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div id="drum-machine" style={{ width: "400px", margin: "40px auto", padding: "20px", borderRadius: "10px", background: "#282c34", color: "white", textAlign: "center", userSelect: "none" }}>
      <div id="display" style={{ height: "50px", marginBottom: "20px", backgroundColor: "#444", borderRadius: "6px", lineHeight: "50px", fontWeight: "bold", fontSize: "1.2rem" }}>
        {display || "Play a sound"}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" }}>
        {DRUM_PADS.map(({ key, sound, url }) => (
          <div key={key} className="drum-pad" id={sound} onClick={() => playSound(key)} style={{ backgroundColor: "#3c3f58", padding: "20px", borderRadius: "8px", cursor: "pointer", fontSize: "1.5rem", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", userSelect: "none", boxShadow: "0 4px 8px rgba(0,0,0,0.3)" }}>
            {key}
            <audio id={key} className="clip" src={url} preload="auto"></audio>
          </div>
        ))}
      </div>
    </div>
  );
}
