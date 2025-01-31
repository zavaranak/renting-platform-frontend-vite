import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
export default function ClientInfoForm() {
  const [clientInfo, setClientInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  return (
    <>
      <div className="grid grid-cols-3 gap-1 ">
        {" "}
        <Label>
          First Name
          <Input
            type="text"
            value={clientInfo.firstName}
            onChange={(e) =>
              setClientInfo({ ...clientInfo, firstName: e.target.value })
            }
          />
        </Label>
        <Label>
          Last Name
          <Input
            type="text"
            value={clientInfo.lastName}
            onChange={(e) =>
              setClientInfo({ ...clientInfo, lastName: e.target.value })
            }
          />
        </Label>
        <Label>
          {" "}
          Phone number
          <Input
            type="text"
            value={clientInfo.firstName}
            onChange={(e) =>
              setClientInfo({ ...clientInfo, firstName: e.target.value })
            }
          />
        </Label>
      </div>
      <div className="grid grid-cols-2 gap-1 ">
        <Label>
          Email
          <Input
            type="email"
            value={clientInfo.email}
            onChange={(e) =>
              setClientInfo({ ...clientInfo, email: e.target.value })
            }
          />
        </Label>
      </div>
    </>
  );
}
