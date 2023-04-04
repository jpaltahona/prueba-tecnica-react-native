import { settings } from "./settings"

export const getAllProducts = async (params) => {
    try {
        const data = await fetch(`${settings.url}/all-products?${new URLSearchParams(params)}`);
        if( data.status === 429 ) return null;
        const res = await data.json();
        return  res.products
    } catch (error) {
        return error
    }
}

export const getSingleProduct =  async(idProduct) => {
    try {
        const data = await fetch(`${settings.url}/detail/${idProduct}`);
        const res = await data.json();
        return  res
    } catch (error) {
        return error
    }
}