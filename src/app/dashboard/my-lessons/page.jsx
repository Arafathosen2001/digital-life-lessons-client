"use client";

import { useEffect, useState } from "react";
import { Table, Button, Spinner } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export default function MyLessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session, isPending } = authClient.useSession();
  const userId = session?.user?.id;

  const fetchLessons = async () => {
    if (!userId) return;

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/api/lessons?userId=${userId}`
      );

      const data = await res.json();
      setLessons(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchLessons();
  }, [userId]);

  const handleView = (lesson) => {
    alert(`${lesson.title}`);
  };

  const handleEdit = async (lesson) => {
    const newTitle = prompt("New title", lesson.title);
    if (!newTitle) return;

    await fetch(`http://localhost:5000/api/lessons/${lesson._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    });

    fetchLessons();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/lessons/${id}`, {
      method: "DELETE",
    });

    setLessons((prev) => prev.filter((l) => l._id !== id));
  };

  if (isPending || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!session) {
    return <div className="p-6">Please login first</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Lessons</h1>

      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="My Lessons Table">
            <Table.Header>
              {/* ✅ MUST BE isRowHeader */}
              <Table.Column isRowHeader>
                TITLE
              </Table.Column>

              <Table.Column>CATEGORY</Table.Column>
              <Table.Column>STATUS</Table.Column>
              <Table.Column>SAVES</Table.Column>
              <Table.Column>ACTIONS</Table.Column>
            </Table.Header>

            <Table.Body>
              {lessons.length === 0 ? (
                <Table.Row>
                  <Table.Cell>No lessons found</Table.Cell>
                  <Table.Cell />
                  <Table.Cell />
                  <Table.Cell />
                  <Table.Cell />
                </Table.Row>
              ) : (
                lessons.map((lesson) => (
                  <Table.Row key={lesson._id}>
                    <Table.Cell>{lesson.title}</Table.Cell>
                    <Table.Cell>{lesson.category}</Table.Cell>
                    <Table.Cell>{lesson.status}</Table.Cell>
                    <Table.Cell>{lesson.saves || 0}</Table.Cell>

                    <Table.Cell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onPress={() => handleView(lesson)}
                        >
                          View
                        </Button>

                        <Button
                          size="sm"
                          color="warning"
                          onPress={() => handleEdit(lesson)}
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          color="danger"
                          onPress={() =>
                            handleDelete(lesson._id)
                          }
                        >
                          Delete
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}