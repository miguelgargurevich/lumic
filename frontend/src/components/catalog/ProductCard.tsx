import Image from "next/image";

export interface ProductCardAction {
  label: string;
  onClick: () => void;
  type: "view" | "add" | "edit" | "delete";
  icon?: React.ReactNode;
}

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  description?: string;
  actions: ProductCardAction[];
}

const baseButton = "min-w-[110px] h-11 px-6 py-2 rounded-xl font-semibold shadow transition-all text-base flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary/40";
const buttonStyles: Record<string, string> = {
  view: `${baseButton} bg-primary text-white hover:bg-primary/90`,
  add: `${baseButton} bg-primary text-white hover:bg-primary/90`,
  edit: `${baseButton} bg-amber-500 text-white hover:bg-amber-600`,
  delete: `${baseButton} bg-red-500 text-white hover:bg-red-600`,
};

export default function ProductCard({ name, price, image, description, actions }: ProductCardProps) {
  return (
    <div
      className="relative bg-white rounded-3xl shadow-2xl flex flex-col border border-muted h-[370px] w-full max-w-[340px] overflow-hidden group hover:scale-[1.03] hover:shadow-3xl transition-all duration-300 cursor-pointer"
    >
      {/* Imagen con overlay y blur para nombre y precio */}
      <div className="relative w-full h-[180px] overflow-hidden">
        <Image
          src={image}
          alt={name}
          className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105"
          width={340}
          height={180}
          quality={80}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 340px"
          priority={false}
          style={{ width: '100%', height: 'auto', aspectRatio: '340/180' }}
          objectFit="cover"
        />
        <div className="absolute bottom-0 left-0 w-full px-4 py-2 bg-white/60 backdrop-blur-md flex flex-col items-start gap-1">
          <h3 className="text-lg font-bold text-gray-900 drop-shadow-sm line-clamp-1">{name}</h3>
          <span className="px-3 py-0.5 rounded bg-primary/20 text-primary font-bold text-base shadow-sm">${price.toFixed(2)}</span>
        </div>
      </div>
      {/* Descripción y acciones */}
      <div className="flex-1 flex flex-col justify-between w-full px-5 pb-5 pt-3 bg-white">
        {description && (
          <p className="text-muted-foreground text-left mb-3 text-sm line-clamp-2">{description}</p>
        )}
        <div className="flex flex-row flex-wrap gap-3 mt-auto">
          {actions.map((action) => (
            <button
              key={action.label}
              className={buttonStyles[action.type]}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick();
              }}
              type="button"
            >
              {action.icon && <span>{action.icon}</span>}
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
