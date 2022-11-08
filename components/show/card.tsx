export default function ShowCard(props: { show: Show }) {
  const { show } = props;
  const showHref = `/tracklists/${show.slug}/`;
  return (
    <a
      class="py-4 flex flex-row dark:hover:bg-gray-800 transition p-4 -mx-4"
      href={showHref}
    >
      <Artwork
        src={show.artwork}
        alt={show.title}
      />
      <div class="ml-4 flex-grow min-w-0">
        <h4 class="text-lg font-bold mb-2">
          {show.title}
        </h4>
      </div>
    </a>
  );
}
