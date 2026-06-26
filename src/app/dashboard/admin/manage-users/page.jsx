"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Input,
  Button,
  Chip,
  Avatar,
  Card,
  Table,
} from "@heroui/react";
import { FaSearch, FaUserShield, FaTrash, FaTimes } from "react-icons/fa";
import { getUsers } from "@/lib/getData/data/lessons";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { DeletButton } from "./DeletButton";
// import { toast } from "react-toastify";
import { MakeAdmin } from "./MakeAdmin";
import toast from "react-hot-toast";

export default function ManageUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        user?.email?.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);
  const handleMakeAdmin = async (userId) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}`,
        {
          method: "PATCH",
        }
      );
  
      const data = await res.json();
      // console.log(data);
  
      if (data.modifiedCount > 0) {
        setUsers(prev =>
          prev.map(user =>
            user._id === userId
              ? { ...user, role: "admin" }
              : user
          )
        );
        toast.success("User updated successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (id) => {
   

    try {
      toast.error("Sorry This Is Demo");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6 p-4 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Manage Users</h1>
        <p className="text-default-500 mt-1">Manage all platform users.</p>
      </div>

      {/* Search */}
      <Card>
        <Card.Content className="flex flex-row items-center gap-3 p-4">
          <FaSearch className="text-default-400 flex-shrink-0" />
          <div className="relative w-full flex items-center">
            <Input
              className="w-full pr-10"
              placeholder="Search user by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* সার্চ বক্সে কিছু লেখা থাকলে ক্লিয়ার (X) বাটন দেখাবে */}
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 text-default-400 hover:text-default-600 p-1 rounded-full transition-colors"
                type="button"
                aria-label="Clear search"
              >
                <FaTimes size={14} />
              </button>
            )}
          </div>
        </Card.Content>
      </Card>

      {/* Table */}
      <Card>
        <Card.Content className="p-0">
          <Table aria-label="Manage Users">
            <Table.ScrollContainer>
              <Table.Content>
                <Table.Header>
                  <Table.Column isRowHeader >USER</Table.Column>
                  <Table.Column>EMAIL</Table.Column>
                  <Table.Column>ROLE</Table.Column>
                  <Table.Column>LESSONS</Table.Column>
                  <Table.Column>ACTIONS</Table.Column>
                </Table.Header>
                
                <Table.Body>
                  {loading ? (
                    <Table.Row>
                      <Table.Cell colSpan={5} className="text-center py-4">
                        Loading users...
                      </Table.Cell>
                    </Table.Row>
                  ) : filteredUsers.length === 0 ? (
                    <Table.Row>
                      <Table.Cell colSpan={5} className="text-center py-4">
                        No users found
                      </Table.Cell>
                    </Table.Row>
                  ) : (
                    filteredUsers.map((user) => (
                      <Table.Row key={user._id}>
                        <Table.Cell>
                          <div className="flex items-center gap-3">
                            <Avatar name={user.name} size="sm" src={user.image} />
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </Table.Cell>

                        <Table.Cell>{user.email}</Table.Cell>

                        <Table.Cell>
                          <Chip
                            color={user.role === "admin" ? "success" : "default"}
                            variant="flat"
                            size="sm"
          >
                            {user.role || "user"}
                          </Chip>
                        </Table.Cell>

                        <Table.Cell>{user.lessonCount || 0}</Table.Cell>

                        <Table.Cell>
                          <div className="flex gap-2">
                            {user.role !== "admin" && (
                             <MakeAdmin handleMakeAdmin={handleMakeAdmin} user={user} ></MakeAdmin>
                            )}
                            

                            {/* <Button
                              size="sm"
                              color="danger"
                              variant="flat"
                              onPress={() => handleDeleteUser()}
                            >
                              <span className="flex items-center gap-1">
                                <FaTrash /> Delete
                              </span>
                            </Button> */}
                            <DeletButton handleDeleteUser={handleDeleteUser}></DeletButton>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ))
                  )}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </Card.Content>
      </Card>
    </div>
  );
}