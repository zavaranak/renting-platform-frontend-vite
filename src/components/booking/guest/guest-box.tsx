// import { GET_ALL_GUESTS_BY_ID } from "@/lib/gql/endpoint";
// import { useAuthStore } from "@/store/auth-store";
// import { useQuery } from "@apollo/client";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { useState } from "react";

// export default function GuestBox() {
//   const [guestList, setGuestList] = useState<Array<any>>([]);
//   const { user, isAuthenticated } = useAuthStore((state) => state);
//   const { loading, error, data } = useQuery(GET_ALL_GUESTS_BY_ID, {
//     skip: !isAuthenticated,
//     variables: { type: "tenantId", value: user?.id },
//     onCompleted(data) {
//       console.log(data);
//       if (data.getGuests.guests) {
//         setGuestList(data.getGuests.guests);
//       }
//     },
//     onError(error) {
//       console.log(error);
//     },
//   });

//   if (loading) return <p>Loading...</p>;
//   return <div></div>;
// }
