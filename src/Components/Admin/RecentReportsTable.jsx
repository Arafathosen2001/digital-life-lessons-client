"use client";

import { Table, Chip } from "@heroui/react";

export default function RecentReportsTable({
  reports,
}) {
  return (
    <div className="bg-content1 border border-default-200 rounded-2xl p-4">
      <h2 className="text-lg font-semibold mb-4">
        Recent Reports
      </h2>

      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Recent reports">
            <Table.Header>
              <Table.Column isRowHeader>
                Lesson
              </Table.Column>

              <Table.Column>
                Reason
              </Table.Column>

              <Table.Column>
                Status
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {reports.map((report) => (
                <Table.Row key={report._id}>
                  <Table.Cell>
                    {report.lessonTitle}
                  </Table.Cell>

                  <Table.Cell>
                    {report.reason}
                  </Table.Cell>

                  <Table.Cell>
                    <Chip
                      size="sm"
                      color="danger"
                      variant="flat"
                    >
                      Reported
                    </Chip>
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