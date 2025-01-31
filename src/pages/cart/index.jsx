import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Header } from "@/components/header";
import { Modal } from "@/components/modal";
import Image from "next/image";
import { ProductsActions } from "@/store/modules/products";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { formatPrice } from "@/utils/strings";

export default function Cart(){
    const dispatch = useAppDispatch()
    const router = useRouter()

    const { cartProducts } = useAppSelector((state) => state.products);
  
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [totalPrice, setTotalPrice] = useState()

    function handleQuantitySelector(product, quantity){
        dispatch(ProductsActions.setCartProductQuantity({productId: product.id, quantity}))
        getTotalPrice()
    }

    function closeModal(){
        setIsOpenModal(false)
    }

    function handleBuyButtonClick(){
        setIsOpenModal(true)

        dispatch(ProductsActions.cleanCartProducts())
    }

    useEffect(() => {
        getTotalPrice()
    }, [])

    function getTotalPrice(){
        let sum = 0

        cartProducts.forEach(product => {
            sum = sum + product.price * product.quantity
        });

        setTotalPrice(sum)
    }


    function renderQuantityPicker(product) {
        return (
            <div className="flex gap-3">
                <div
                    className="h-full w-5 flex justify-center cursor-pointer select-none"
                    onClick={() => handleQuantitySelector(product, product.quantity - 1)}
                >
                    -
                </div>
                <span className="w-3 text-center">{product.quantity}</span>
                <div
                    className="h-full w-5 flex justify-center cursor-pointer select-none"
                    onClick={() => handleQuantitySelector(product, product.quantity + 1)}
                >
                    +
                </div>
            </div>
        );
    }

    function renderCartItems(){
        return cartProducts.map(product => {
            return (
                <div className="flex relative rounded-lg px-2 py-2 shadow-lg gap-2">
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={100}
                        height={100}
                        unoptimized
                    />
               <div className={"py-2 max-w-[70%]"}>
                    <span className="text-sm">{product.category}</span>
                    <h4 className="font-light">{product.title}</h4>
                    <p className="font-semibold">{formatPrice(product.price)}</p>
               </div>
               <div className="right-5 absolute w-[1/4] top-[50%] translate-y-[-50%]">
                {renderQuantityPicker(product)}
               </div>
                </div>
            )
        })
    }

    function renderTotalPrice(){
        return (
            <div className="bg-white fixed bottom-0 w-full flex justify-center">
                <div className="w-full max-w-[800px] flex justify-center items-center flex-col py-5 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] rounded-tr-[90px] rounded-tl-[90px]">
                    <div className="mb-4 mt-4">
                        <span className="font-semibold"> Preço total: <span className="text-3xl">{formatPrice(totalPrice)}</span></span>
                    </div>
                    <div>
                        <button onClick={handleBuyButtonClick} className="bg-black text-white rounded-full py-4 px-8 w-64">Comprar agora</button>
                    </div>
                </div>
            </div>
        )
    }

    function renderContent(){
        if(!cartProducts.length){
            return (
                <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <div className=" flex flex-col items-center gap-4">
                       <h1 className="font-semibold">Carrinho Vazio ...</h1>
                       <button onClick={() => {router.push("/product-list")}} className="bg-black text-white rounded-full py-4 px-8">Voltar à lista de produtos</button>
                    </div>

                </div>
            )
        }

        return (
            <>
                <div className="mx-auto max-w-[1000px] px-10 pt-24 pb-4">
                    <div className="flex flex-col gap-4 pb-24">
                        {renderCartItems()}
                    </div>
                </div>
                {renderTotalPrice()}
            </>
        )
    }

    function renderModalContent(){
        return (
            <>
             <div className="mt-5 w-64 m-5">
                <h2>Compra realizada <br /><span className="font-bold">com sucesso!</span></h2>
                <h3>Total: {formatPrice(totalPrice)}</h3>
                </div>
                <button onClick={() => closeModal()} className="bg-black text-white rounded-full py-2 px-4 w-full text-sm mt-5">
                    Concluir
                </button>
            </>
        )
    }

    return (
        <div>
            <Header />
            {renderContent()}
            <Modal isOpen={isOpenModal} onClose={() => closeModal()}>
               {renderModalContent()}
            </Modal>
        </div>        
    )
}