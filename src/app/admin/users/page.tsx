"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

export default function Page() {
  useEffect(() => {
    putUsers();
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  type userDataType = {
    _id: string;
    fullName: string;
    email: string;
    createdAt: string;
  };

  const [userData, setUserData] = useState<Array<userDataType>>([]);

  async function putUsers() {
    const call = await fetch("http://localhost:3000/api/allusers");
    const res = await call.json();
    setIsLoading(false);
    setUserData(res.data);
  }

  return (
    <div className="h-full w-full">
      <div className="h-full w-full bg-background border shadow-md rounded-lg shadow-black p-4">
        <div className="mb-4">
          <h3 className="font-bold text-3xl">Users</h3>
        </div>

        <Table>
          <TableCaption>List of the users in RavenBloom</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Created at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <div className="w-full p-4 flex flex-row justify-center items-center ">
                    Loading..
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              userData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item._id}</TableCell>
                  <TableCell>{item.fullName}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.createdAt}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
