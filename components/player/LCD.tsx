interface LCDProps {
  artist: string;
  title: string;
}
export default function LCD(props: LCDProps) {
  const { artist, title } = props;
  return (
    <div
      class="flex flex-col whitespace-nowrap pl-8"
    >
      <span
        class="text-white font-bold"
      >
        {title}
      </span>
      <span
        class="mx-2"
      >
        by
      </span>
      <span
        class="underline text-white font-bold"
      >
        {artist}
      </span>
    </div>
  )
}
