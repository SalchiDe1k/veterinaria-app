import Link from "next/link";

interface BreadcrumbsProps {
  items: Array<{ label: string; link?: string }>;
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <div className="breadcrumbs text-sm">
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.link ? (
              <Link href={item.link} className="hover:underline">
                {item.label}
              </Link>
            ) : (
              item.label
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
