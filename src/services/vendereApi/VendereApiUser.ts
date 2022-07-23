import { ISellerReview } from '../interfaces/ISellerReview';
import { IUserInfo } from '../interfaces/IUser';
import {
    convertApiResponseSellerReviews, convertApiResponseUser, createFirestoreRequestBody,
    firestoreQueryOperators, IFirestoreFieldFilter
} from '../utils/apiUtils';
import { VendereApiInstance, VendereQueryApiInstance } from './VendereApiBase';

export const getUserByUID = async (uid: string): Promise<IUserInfo | null> => {
  const fieldFilter: IFirestoreFieldFilter = {
    fieldPath: "uid",
    value: uid,
    op: firestoreQueryOperators.EQUAL,
  };
  const getUserRequestBody = createFirestoreRequestBody("users", [fieldFilter]);
  const res = await VendereQueryApiInstance.post("", getUserRequestBody).catch(
    (err: any) => {
      console.log("Error getting user by UID: ", err);
    }
  );
  if (!res) {
    return null;
  }
  return convertApiResponseUser(res.data[0].document);
};

export const getSellerReviews = async (
  sellerUID: string
): Promise<Array<ISellerReview>> => {
  const fieldFilter: IFirestoreFieldFilter = {
    fieldPath: "targetSellerUID",
    value: sellerUID,
    op: firestoreQueryOperators.EQUAL,
  };
  const sellerReviewsRequestBody = createFirestoreRequestBody("seller_review", [
    fieldFilter,
  ]);
  const res = await VendereQueryApiInstance.post(
    "",
    sellerReviewsRequestBody
  ).catch((err: any) => {
    console.log("Error getting seller reviews: ", err);
  });

  if (!res) {
    return [];
  }

  return convertApiResponseSellerReviews(res.data);
};

export const getUserByUIDs = async (
  UIDs: Array<string>
): Promise<Array<IUserInfo>> => {
  const promiseArray = UIDs.map((UID) => getUserByUID(UID));
  const userList = await Promise.all(promiseArray).catch((err: any) => {
    console.log("Error getting user list: ", err);
  });
  if (!userList) {
    return [];
  }
  const resultUserList: Array<IUserInfo> = [];
  userList.forEach((user) => {
    if (user) {
      resultUserList.push(user);
    }
  });
  return resultUserList;
};

export const createUser = async (userData: IUserInfo): Promise<IUserInfo> => {
  const postParams = {
    fields: {
      uid: { stringValue: userData.uid },
      name: { stringValue: userData.name },
      numOfReviews: { integerValue: userData.numOfReviews },
      averageReview: { doubleValue: userData.averageReview },
      imageUrl: { stringValue: userData.imageUrl },
    },
  };
  const response = await VendereApiInstance.post("users", postParams);
  return convertApiResponseUser(response.data);
};
