import { IKImage } from "imagekitio-react";

export default function Artwork(
  props: { src: string; alt: string; size?: number },
) {
  const { src, alt, size = 24 } = props;

  const names = ["min-w", "max-w", "min-h", "max-h", "md:min-w", "md:min-h"];
  const classes = [];

  for (const name of names) {
    classes.push(`${name}-${size}`);
  }
  const presrc = "/" + props.src;
  return (
    <div class="rounded-xl md:rounded-2xl shadow-lg inline-block object-cover overflow-hidden">
      <IKImage
        path={presrc}
        transformation={[
          {
            height: "128",
            width: "128",
            ar: "1:1",
            c: "maintain_ratio",
            fo: "auto",
          },
        ]}
        width={128}
        height={128}
        urlEndpoint="https://ik.imagekit.io/29e7mvzdh/soulection/"
      />
    </div>
  );
}
