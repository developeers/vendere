import { IProductInfo } from '@/services/interfaces/IProduct';

import { convertApiResponseProduct } from '../utils/apiUtils';
import { VendereApiInstance } from './VendereApiBase';
import { IApiResponse } from './vendereApiResponse/IApiResponse';

export const getProductsList = async (): Promise<Array<IProductInfo>> => {
  const res = await VendereApiInstance.get(`products`).catch((err: any) => {
    console.log("Error getting product list: ", err);
  });
  if (!res) {
    return [];
  }
  return res?.data.documents.map((product: IApiResponse) =>
    convertApiResponseProduct(product)
  );
};

export const getProductByHashId = async (
  productHashId: string
): Promise<IProductInfo | null> => {
  const res = await VendereApiInstance.get(`products/${productHashId}`).catch(
    (err: any) => {
      console.log("Error getting product detail: ", err);
    }
  );
  if (!res) {
    return null;
  }
  return convertApiResponseProduct(res?.data);
};

export const createOrUpdateProduct = async (
  product: IProductInfo
): Promise<void> => {
  const imageUrlArrayValues = product.imageUrls.map((imageUrl) => {
    return { stringValue: imageUrl };
  });
  const postParams = {
    fields: {
      name: { stringValue: product.name },
      price: { integerValue: product.price },
      description: { stringValue: product.description },
      category: { stringValue: product.category },
      condition: { stringValue: product.condition },
      sellerUID: { stringValue: product.sellerUID },
      imageUrls: {
        arrayValue: {
          values: imageUrlArrayValues,
        },
      },
    },
  };
  await VendereApiInstance.post(`products`, postParams).catch((err: any) => {
    console.log("Error creating product: ", err);
  });
};
