interface CategoryCardProps {
  imageUrl: string;
  name: string;
  productCount: number;
}

function CategoryCard({ name, imageUrl, productCount }: CategoryCardProps) {
  return (
    <div
      style={{ backgroundImage: `url(${imageUrl})` }}
      className={`w-100 h-62.5 border rounded-md relative cursor-pointer text-white`}
    >
      <div className="absolute bottom-4 left-4">
        <h1 className="text-2xl font-medium">{name}</h1>
        <p className="text-sm text-gray-200">{productCount} mahsulot</p>
      </div>
    </div>
  );
}

export default CategoryCard;
