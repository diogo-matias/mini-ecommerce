import { PRODUCTS, ProductType } from "@/constants/products";
import { createSlice } from "@reduxjs/toolkit";

type addToCartActionPayload = {
    payload: {
        product: ProductType;
        quantity: number;
    };
    type: string;
};

type CartProduct = ProductType & { quantity: number };

type stateType = {
    products: ProductType[];
    cartProducts: CartProduct[];
};

const initialState: stateType = {
    products: PRODUCTS,
    cartProducts: [],
};

const ProductsSlice = createSlice({
    name: "@products",
    initialState,
    reducers: {
        addToCart: (state, { payload }: addToCartActionPayload) => {
            const { product, quantity } = payload;

            const alreadyAddedProduct = state.cartProducts.find(
                (p) => p.id === product.id
            );
            const alreadyAddedProductIndex = state.cartProducts.findIndex(
                (p) => p.id === product.id
            );

            if (alreadyAddedProduct) {
                state.cartProducts[alreadyAddedProductIndex] = {
                    ...alreadyAddedProduct,
                    quantity: quantity + alreadyAddedProduct.quantity,
                };

                return;
            }

            const result = state.cartProducts;
            result.push({ ...product, quantity });

            state.cartProducts = result;
        },
        setCartProductQuantity: (state, { payload }) => {
            const { productId, quantity } = payload;

            const productIndex = state.cartProducts.findIndex(
                (product) => product.id === productId
            );

            console.log("productIndex", productIndex);

            if (productIndex === -1 || quantity < 0) {
                return;
            }

            if (quantity === 0) {
                state.cartProducts.splice(productIndex, 1);
                return;
            }

            state.cartProducts[productIndex] = {
                ...state.cartProducts[productIndex],
                quantity: quantity,
            };
        },
        cleanCartProducts: (state) => {
            state.cartProducts = initialState.cartProducts;
        },
    },
});

export default ProductsSlice.reducer;

export const ProductsActions = {
    ...ProductsSlice.actions,
};
