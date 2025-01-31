import { Header } from "@/components/header";
import { ProductType } from "@/constants/products";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { ProductsActions } from "@/store/modules/products";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Modal } from "@/components/modal";

export default function ProductDetail() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { products } = useAppSelector((state) => state.products);
    const { id } = router.query;

    const [quantity, setQuantity] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
        null
    );
    const [isOpenModal, setIsOpenModal] = useState(false);

    useEffect(() => {
        const selected = products.find((product) => product.id === id) || null;

        setSelectedProduct(selected);
    }, [id, products]);

    function handleAddToCart() {
        if (!selectedProduct) {
            return;
        }

        dispatch(
            ProductsActions.addToCart({ product: selectedProduct, quantity })
        );

        setIsOpenModal(true);
        setQuantity(1);
    }

    function handleQuantitySelector(value: number) {
        if (value < 1) {
            return;
        }

        setQuantity(value);
    }

    function renderImage() {
        if (!selectedProduct) {
            return null;
        }

        return (
            <Image
                src={selectedProduct.image}
                alt={selectedProduct.title}
                width={500}
                height={500}
                unoptimized
            />
        );
    }

    function renderProductInfo() {
        return (
            <div className="mb-5">
                <h1 className="mb-4 font-semibold">{selectedProduct?.title}</h1>
                <p>{selectedProduct?.description}</p>
            </div>
        );
    }

    function renderButton() {
        return (
            <button
                className="bg-black text-white px-4 py-2 text-sm"
                onClick={handleAddToCart}
            >
                Adicionar ao carrinho
            </button>
        );
    }

    function renderQuantityPicker() {
        return (
            <div className="flex gap-3">
                <div
                    className="h-full w-5 flex justify-center cursor-pointer select-none"
                    onClick={() => handleQuantitySelector(quantity - 1)}
                >
                    -
                </div>
                <span className="w-3 text-center">{quantity}</span>
                <div
                    className="h-full w-5 flex justify-center cursor-pointer select-none"
                    onClick={() => handleQuantitySelector(quantity + 1)}
                >
                    +
                </div>
            </div>
        );
    }

    function renderModalContent() {
        return (
            <div className="flex flex-col items-start gap-4 m-4">
                <div>
                    <h2 className="font-semibold">
                        Item adicionado ao carrinho!
                    </h2>
                    <span>Quantidade: {quantity}</span>
                </div>
                <div className="gap-3 flex flex-col w-full">
                    <button
                        onClick={() => router.push("/product-list")}
                        className="border border-black w-full px-4 py-2 text-sm"
                    >
                        Continuar comprando
                    </button>
                    <button
                        onClick={() => router.push("/cart")}
                        className="bg-black w-full text-white px-4 py-2 text-sm"
                    >
                        Ir para o carrinho
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className="mx-auto pt-24 pb-10 max-w-[500px] md:max-w-[1000px] px-10 flex justify-center">
                <div className="flex flex-col md:flex-row gap-6">
                    {renderImage()}
                    <div>
                        {renderProductInfo()}
                        <div className="flex gap-6 items-center">
                            {renderButton()}
                            {renderQuantityPicker()}
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isOpenModal}
                onClose={() => {
                    setIsOpenModal(false);
                }}
            >
                {renderModalContent()}
            </Modal>
        </div>
    );
}
