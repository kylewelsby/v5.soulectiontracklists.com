import { ComponentChildren } from "preact";

interface Props {
  title: string;
  children: ComponentChildren;
}

export default function SiteSubNav({ title, children }: Props) {
  return (
    <div class="mb-6 flex flex-row items-center xl:(flex-row items-end) border(b black opacity-50) dark:(border(white opacity-20))">
      <div class="flex-1 text(4xl white) font(bold header) uppercase">
        {title}
      </div>
      <div class="w-full xl:w-auto flex flex-row relative">
        <div class="flex-1 overflow-x-auto">
          <nav class="flex flex-row">
            {children}
          </nav>
        </div>
      </div>
    </div>
  );
}
