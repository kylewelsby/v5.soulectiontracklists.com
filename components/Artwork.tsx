interface Transformation {
  [key: string]: string;
}

export default function Artwork(
  props: {
    src: string;
    alt: string;
    size?: number;
    style?: string;
    named?: string;
    loading?: "lazy" | "eager";
  },
) {
  const { alt, size = 24, loading = "lazy" } = props;

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

  const src = props.src.replace(/^\/+/, "");
  const url = "https://cdn.soulectiontracklists.com/" +
    (props.named ? props.named + "/" : "") + src;

  return (
    <div
      className={classes.join(" ")}
      {...{ style: props.style }}
    >
      <img
        src={url}
        loading={loading}
        alt={alt}
        width={size}
        height={size}
      />
    </div>
  );
}
