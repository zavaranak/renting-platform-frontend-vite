// import { Role } from '@/lib/contanst';
// import { Attribute, User } from '@/lib/data-type';
// import { VERIFY_USER } from './endpoint';
// import {client} from '@/lib/apollo-client'

// const undefinedVerification = { user: undefined, attributes: undefined };

// export const verifyUser = async (token: string | undefined) => {
//   if (token) {
//     const { data } = await client.query({
//       query: VERIFY_USER,
//     });
//     if (data?.verifyUser) {
//       const { tenant, landlord } = data.verifyUser;
//       if (tenant) {
//         const { __typename, attributes, ...rest } = tenant;
//         const verifiedTenant = { role: Role.tenant };
//         Object.assign(verifiedTenant, rest);
//         return {
//           user: verifiedTenant as User,
//           attributes: attributes as Attribute[],
//         };
//       } else if (landlord) {
//         const { __typename, attributes, ...rest } = tenant;
//         landlord.role = Role.landlord;
//         const verifiedLandlord = { role: Role.landlord };
//         Object.assign(verifiedLandlord, rest);
//         return {
//           user: verifiedLandlord as User,
//           attributes: attributes as Attribute[],
//         };
//       } else return undefinedVerification;
//     } else return undefinedVerification;
//   } else return undefinedVerification;
// };
// // export const getUserAttributes = async (token: string | undefined, id:string, role:Role) => {
// //   if (token) {
// //     const client = createApolloClientSSR(token);
// //     const { data } = await client.query({
// //       query: TENANT_ATTRIBUTES,
// //     });
// //   }
// // };
