import data from "iso3166-2-db" assert { type: "json" };

export default function locationByISOCode(code = "") {
  const [iso1, iso2] = code.split("-");
  const country = data[iso1];
  let region = null;
  if (iso2) {
    region = country.regions.find(
      (region: { iso: string }) => region.iso === iso2,
    );
  }
  if (region && country) {
    return `${region.name}, ${country.name}`;
  }
  if (country) {
    return country.name;
  }
  return `Planet Earth`;
}
