import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table } from "@/components/ui/table";

export const GuestManager = () => {
  return (
    <Card className="mb-6 p-4">
      <h2 className="text-xl font-bold mb-4">Guests</h2>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* {guests?.map((guest: any) => (
              <tr key={guest.id}>
                <td>{guest.name}</td>
                <td>{guest.email}</td>
                <td>{guest.phone}</td>
                <td>
                  <Button variant="ghost">Edit</Button>
                  <Button variant="ghost">Delete</Button>
                </td>
              </tr>
            ))} */}
        </tbody>
      </Table>
      <Button className="mt-4">Add Guest</Button>
    </Card>
  );
};
