import { Table } from "@heroui/react";

export default function ContributorsTable({
  contributors,
}) {
  return (
    <div className="bg-content1 border border-default-200 rounded-2xl p-5">
         <h2 className="text-lg font-semibold mb-4">
        Lesson Growth
      </h2>
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="contributors table">
          <Table.Header>
            <Table.Column isRowHeader>Name</Table.Column>
            <Table.Column>Email</Table.Column>
            <Table.Column>Lessons</Table.Column>
          </Table.Header>

          <Table.Body>
            {contributors.map((user) => (
              <Table.Row key={user._id}>
                <Table.Cell>
                  {user.name}
                </Table.Cell>

                <Table.Cell>
                  {user.email}
                </Table.Cell>

                <Table.Cell>
                  {user.lessonCount}
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