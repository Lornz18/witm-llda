import LagunaMap from "@/components/LagunaMap";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <header style={{ textAlign: "center", padding: "1rem" }}>
        <h1>Laguna Lake Water Quality Map</h1>
        <p>
          Interactive map of monitoring stations with water quality parameters.
        </p>
      </header>
      <LagunaMap />
    </main>
  );
}
