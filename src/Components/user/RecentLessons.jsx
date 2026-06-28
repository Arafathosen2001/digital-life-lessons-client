"use client";

import Link from "next/link";
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
} from "@heroui/react";

import { FaEye } from "react-icons/fa6";

export default function RecentLessons({ lessons }) {
  return (
    <Card
      shadow="sm"
      className="border border-default-200"
    >
      <Card.Header className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">
            Recently Added Lessons
          </h2>

          <p className="text-default-500 text-sm">
            Your latest 5 lessons
          </p>
        </div>
      </Card.Header>

      <Card.Body>
        <Table
          aria-label="Recent Lessons"
          removeWrapper
        >
          <Table.Header>
            <Table.Column>TITLE</Table.Column>
            <Table.Column>CATEGORY</Table.Column>
            <Table.Column>ACCESS</Table.Column>
            <Table.Column>CREATED</Table.Column>
            <Table.Column align="center">
              ACTION
            </Table.Column>
          </Table.Header>

          <Table.Body
            emptyContent="No lessons found."
          >
            {lessons.map((lesson) => (
              <Table.Row key={lesson._id}>
                <Table.Cell className="font-medium">
                  {lesson.title}
                </Table.Cell>

                <Table.Cell>
                  {lesson.category}
                </Table.Cell>

                <Table.Cell>
                  <Chip
                    size="sm"
                    color={
                      lesson.accessLevel ===
                      "Premium"
                        ? "warning"
                        : "success"
                    }
                    variant="flat"
                  >
                    {lesson.accessLevel}
                  </Chip>
                </Table.Cell>

                <Table.Cell>
                  {lesson.createdAt
                    ? new Date(
                        lesson.createdAt
                      ).toLocaleDateString()
                    : "-"}
                </Table.Cell>

                <Table.Cell>
                  <Button
                    as={Link}
                    href={`/lessons/${lesson._id}`}
                    isIconOnly
                    size="sm"
                    color="primary"
                    variant="flat"
                  >
                    <FaEye />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card.Body>
    </Card>
  );
}