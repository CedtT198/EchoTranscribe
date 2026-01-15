import { useEffect, useRef, useState } from "react";

const BAR_COUNT = 4;
const MIN_HEIGHT = 10;
const MAX_HEIGHT = 50;

export default function VoiceWave() {
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const [levels, setLevels] = useState<number[]>(
    new Array(BAR_COUNT).fill(MIN_HEIGHT)
  );

  useEffect(() => {
    let audioContext: AudioContext;
    let animationId: number;

    async function initMic() {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContext = new AudioContext();

      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      source.connect(analyser);

      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;

      const animate = () => {
        analyser.getByteFrequencyData(dataArray);

        const volume =
          dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

        if (volume < 5) {
          setLevels(new Array(BAR_COUNT).fill(MIN_HEIGHT));
        } else {
          setLevels(
            new Array(BAR_COUNT).fill(0).map(() =>
              Math.min(
                MAX_HEIGHT,
                MIN_HEIGHT + Math.random() * volume
              )
            )
          );
        }

        animationId = requestAnimationFrame(animate);
      };

      animate();
    }

    initMic();

    return () => {
      cancelAnimationFrame(animationId);
      audioContext?.close();
    };
  }, []);

  return (
    <div style={styles.container}>
      {levels.map((h, i) => (
        <div
          key={i}
          style={{
            ...styles.bar,
            height: h,
          }}
        />
      ))}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    height: 50,
  },
  bar: {
    width: 10,
    backgroundColor: "#1b68ff",
    borderRadius: 6,
    transition: "height 0.1s ease",
  },
};
