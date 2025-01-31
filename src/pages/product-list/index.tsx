import { PRODUCTS } from "@/constants/products";
import Image from "next/image";
import { Header } from "@/components/header";
import { useRouter } from "next/router";
import { formatPrice } from "@/utils/strings";

export default function ProductList() {
    const router = useRouter();

    function formatTitle(title: string) {
        if (title.length > 50) {
            const sliceTitle = title.slice(0, 50);

            return `${sliceTitle}...`;
        }

        return title;
    }

    function renderProductCard(product: (typeof PRODUCTS)[0]) {
        return (
            <div className="flex flex-col">
                <Image
                    src={product.image}
                    className="w-full cursor-pointer"
                    alt={product.title}
                    width={700}
                    height={700}
                    unoptimized
                    onClick={() => router.push(`product/${product.id}`)}
                />
                <h1 className="font-light text-sm tracking-normal mt-2">
                    {formatTitle(product.title)}
                </h1>
                <p className="text-sm font-semibold">
                    {formatPrice(product.price)}
                </p>
            </div>
        );
    }

    function renderProductList() {
        return (
            <div className="flex justify-center px-10 pt-24">
                <div className="max-w-[1280px] w-full">
                    <h1 className="mb-4">Lista de produtos</h1>
                    <div className="grid grid-cols grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {PRODUCTS.map((product) => renderProductCard(product))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header />
            {renderProductList()}
        </div>
    );
}
