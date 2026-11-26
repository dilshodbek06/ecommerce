import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  price: number;
  imageUrl: string;
  categoryName: string;
  id: number;
}

function ProductCard({ categoryName, imageUrl, price, title, id }: Props) {
  return (
    <div className="w-full max-w-sm h-fit overflow-hidden rounded-2xl border border-gray-200 bg-white">
      {/* Product Image */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* Wishlist Button */}
        <button className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600 hover:text-red-500">
          <Heart size={20} />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-600">
          {categoryName}
        </p>

        <Link to={`/products/${id}`}>
          <h3 className="mb-2 hover:text-orange-500 text-lg font-bold text-gray-900">
            {title}
          </h3>
        </Link>

        {/* Price & Cart */}
        <div className="flex items-center justify-between gap-3">
          <span className="text-xl font-bold text-gray-900">
            {price.toLocaleString()} UZS
          </span>

          <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
