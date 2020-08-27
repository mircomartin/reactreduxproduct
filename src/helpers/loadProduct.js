import { db } from "./../firebase/firebase-config"


export const loadProducts = async(uid) => {
    const productsSnap = await db.collection(`${uid}/hunt/products`).get();

    const products = [];

    productsSnap.forEach(snapHijo => {
        products.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    })

    
    return products;
}