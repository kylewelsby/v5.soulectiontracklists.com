import { ComponentChildren } from "preact";

interface Props {
  title: string;
  children: ComponentChildren;
}

export default function SiteSubNav({ title, children }: Props) {
  return (
    <div class="mb-6 flex flex-col md:flex-row items-center xl:flex-row xl:items-end border-b border-black border-opacity-50 dark:border-white dark:border-opacity-20">
      <div class="flex-1 text-4xl text-white font-bold font-header uppercase">
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
