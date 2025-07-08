import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <Link href={`/shop/${product.id}`}>
      <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
        <div className="relative w-full h-48 mb-3">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover rounded"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <h2 className="text-xl font-semibold">{product.title}</h2>
        <p className="text-gray-600">{product.description}</p>
        <p className="mt-1 font-medium">₹{product.price}</p>
        <p className="text-sm text-gray-500">📍 {product.location}</p>
        <p className="text-sm text-gray-400">
          Sold by: {product.seller?.name || "Unknown"}
        </p>
      </div>
    </Link>
  );
}
