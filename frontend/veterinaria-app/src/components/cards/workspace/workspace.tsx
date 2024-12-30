import type { propsCardWorkspace } from "@/domain/interfaces/components/cards/workspace/propsCardWorkspace";
import Image from "next/image";
import Link from "next/link";

export const Workspace = ({
  title = "titulo",
  urlImage = "url",
  text = "aqui va un texto",
  path = "/",
}: propsCardWorkspace) => {
  return (
    <Link
      href={path}
      className="card bg-base-100 image-full w-full shadow-xl cursor-pointer transition-transform duration-300 hover:scale-105 select-none"
    >
      <figure className="relative h-64 w-full overflow-hidden">
        <Image src={urlImage} 
        width={250}
        height={200}
        alt={title} className="object-cover h-full" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-white">{title}</h2>
        <p>{text}</p>
      </div>
    </Link>
  );
};
