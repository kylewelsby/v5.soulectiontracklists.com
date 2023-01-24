import { IKImage } from "imagekitio-react";

export default function Subscribe() {
  return (
    <div class="flex flex-col items-center">
      <div className="container mx-auto py-4 py-8 flex flex-col lg:flex-row relative">
        <div class="rounded-xl md:rounded-2xl w-full h-[240px] inline-block object-cover flex flex-col justify-center items-center">
          <IKImage
            path="/soulection/home/soulection-fade.jpg"
            alt="Soulection"
            width="1536"
            height="240"
            transformation={[{
              width: "1536",
              height: "240",
              c: "cover",
              q: "90",
            }]}
            urlEndpoint="https://ik.imagekit.io/29e7mvzdh/soulection/"
          />
        </div>
        <div class="absolute z-10 top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center">
          <span className="flex flex-col lg:flex-row">
            <a href="https://madmimi.com/signups/68317/join" class="btn">
              Subscribe to Newsletter
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
