import { IKImage } from "imagekitio-react";

export default function Artwork(
  props: { src: string; alt: string; size?: number; style?: string },
) {
  const { alt, size = 24 } = props;

  const names = [
    `min-w[${size}px]`,
    `max-w[${size}px]`,
    `min-h[${size}px]`,
    `max-h[${size}px]`,
    `md:min-w[${size}px]`,
    `md:min-h[${size}px]`,
  ];
  const classes = [
    "inline-block",
    "object-cover",
    "overflow-hidden",
    "rounded-xl",
    "md:rounded-2xl",
    "shadow-lg",
  ];

  for (const name of names) {
    classes.push(`${name}-${size}`);
  }

  const presrc = "/" + props.src;
  return (
    <div
      className={classes.join(" ")}
      {...{ style: props.style }}
    >
      <IKImage
        path={presrc}
        alt={alt}
        transformation={[
          {
            height: (size).toFixed(0),
            width: (size).toFixed(0),
            ar: "1:1",
            dpr: "auto",
            c: "maintain_ratio",
            fo: "auto",
          },
        ]}
        lqip={{ active: true, quality: 20 }}
        loading="lazy"
        width={size}
        height={size}
        urlEndpoint="https://ik.imagekit.io/29e7mvzdh/soulection/"
      />
    </div>
  );
}
