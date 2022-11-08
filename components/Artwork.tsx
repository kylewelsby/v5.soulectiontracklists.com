import { TwicImg } from "@/utils/twicpics.ts";

export default function Artwork(props: { src: string; alt: string }) {
  const { src, alt } = props;
  return (
    <div class="min-w-24 min-h-24 w-24 h-24 max-w-32 max-h-32 md:min-w-32 md:min-h-32 md:w-32 md:h-32">
      <TwicImg
        src={src}
        alt={alt}
        placeholder="preview"
        preTransform="cover=128x128"
        transition="fade"
        mode="cover"
      />
    </div>
  );
}
