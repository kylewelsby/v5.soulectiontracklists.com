import { TwicImg } from "@/utils/twicpics.ts";

export default function Artwork(
  props: { src: string; alt: string; size: number },
) {
  const { src, alt, size } = props;

  const names = ["min-w", "max-w", "min-h", "max-h", "md:min-w", "md:min-h"];
  const classes = [];

  if (size) {
  }
  return (
    <div>
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
