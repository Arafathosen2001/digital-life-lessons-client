"use client";

import { Table, Button } from "@heroui/react";

export default function MyLessonsPage() {
  const lessons = [
    {
      title: "Life is about consistency",
      category: "Mindset",
      status: "Public",
      saves: 12,
    },
    {
      title: "Failure taught me everything",
      category: "Career",
      status: "Private",
      saves: 5,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        My Lessons
      </h1>

      <Table>
        <Table.ScrollContainer>

          <Table.Content aria-label="My Lessons Table">

            <Table.Header>
              <Table.Column isRowHeader>
                {() => "Title"}
              </Table.Column>

              <Table.Column>
                {() => "Category"}
              </Table.Column>

              <Table.Column>
                {() => "Status"}
              </Table.Column>

              <Table.Column>
                {() => "Saves"}
              </Table.Column>

              <Table.Column>
                {() => "Actions"}
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {lessons.map((item, i) => (
                <Table.Row key={i}>
                  <Table.Cell>{item.title}</Table.Cell>
                  <Table.Cell>{item.category}</Table.Cell>
                  <Table.Cell>{item.status}</Table.Cell>
                  <Table.Cell>{item.saves}</Table.Cell>

                  <Table.Cell>
                    <div className="flex gap-2">
                      <Button size="sm" color="primary">
                        View
                      </Button>
                      <Button size="sm" color="warning">
                        Edit
                      </Button>
                      <Button size="sm" color="danger">
                        Delete
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>

          </Table.Content>

        </Table.ScrollContainer>
      </Table>
    </div>
  );
}