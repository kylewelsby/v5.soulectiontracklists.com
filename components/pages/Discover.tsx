import RadioHero from "@/components/discover/RadioHero.tsx";
import Subscribe from "@/components/discover/Subscribe.tsx";

export default function Discover() {
  const components = [
    // UntitledHero,
    // RecordsHero,
    // SupplyHero,
    RadioHero,
    // LiveHero,
    Subscribe,
  ];

  return (
    <div class="flex flex-col items-stretch">
      {components.map((Component) => {
        return <Component/>;
      })}
    </div>
  );
}
