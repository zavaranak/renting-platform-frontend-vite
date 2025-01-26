import { User, Attribute } from "@/lib/data-type";

export type ProfileInfoParams = {
  user: User;
  attributes: Attribute[];
};

export default function ProfileInfo(params: ProfileInfoParams) {
  const { user, attributes } = params;
  //   const libraryAttributes = new Map<string,any>()
  //   attributes.forEach(attr=>{
  //     libraryAttributes.set(attr.name,{id:attr.id,value: attr.value})
  //   })
  return (
    <>
      <div>
        <h1>Profile Page</h1>
        <p>Username: {user.username}</p>
        {attributes.map((attr) => {
          return (
            <p id={attr.id}>
              {attr.name}: {attr.value}
            </p>
          );
        })}
      </div>
    </>
  );
}
