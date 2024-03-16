import fetchShow from "@/utils/soulection/fetchShow.ts";
import RadioHero from "@/components/discover/RadioHero.tsx";

export default async function HomePage() {
  const show = await fetchShow("HEAD");
  return (
    <>
      <RadioHero show={show} />
    </>
  );
}
