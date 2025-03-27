import { MouseEvent } from "react";
import { GuestParam, useSearchStore } from "@/store/search-store";
interface AdjustEvent extends MouseEvent<HTMLButtonElement> {
  name: string;
}

export default function GuestSearchBox() {
  const { guest, setGuest } = useSearchStore((state) => state);
  const handleAdultAdjust = (event: AdjustEvent) => {
    const { name } = event.currentTarget;
    const newGuest: GuestParam = {
      adults:
        name === "minus" && guest.adults > 1
          ? guest.adults - 1
          : name === "plus"
          ? guest.adults + 1
          : guest.adults,
      children: guest.children,
    };
    handleGuestAdjust(newGuest);
  };
  const handleChildAdjust = (event: MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget;
    const newGuest: GuestParam = {
      adults: guest.adults,
      children:
        name === "minus" && guest.children > 0
          ? guest.children - 1
          : name === "plus"
          ? guest.children + 1
          : guest.children,
    };
    handleGuestAdjust(newGuest);
  };

  const handleGuestAdjust = (newGuest: GuestParam) => {
    if (JSON.stringify(newGuest) !== JSON.stringify(guest)) {
      setGuest(newGuest);
    }
  };

  return (
    <>
      <div className="text-sm uppercase font-bold py-3">
        How many guest will stay at the place
      </div>
      <div className="grid grid-cols-2 gap-10">
        <div className="flex justify-center items-center">
          <div>Adults</div>
          <button name="minus" onClick={handleAdultAdjust}>
            -
          </button>
          <div>{guest.adults}</div>
          <button name="plus" onClick={handleAdultAdjust}>
            +
          </button>
        </div>
        <div className="flex justify-center items-center">
          <div>Children</div>
          <button name="minus" onClick={handleChildAdjust}>
            -
          </button>
          <div>{guest.children}</div>
          <button name="plus" onClick={handleChildAdjust}>
            +
          </button>
        </div>
      </div>
    </>
  );
}
