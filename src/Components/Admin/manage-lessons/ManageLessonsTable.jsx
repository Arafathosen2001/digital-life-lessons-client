"use client";

import {
  Table,
  Chip,
  Button,
  Tooltip,
} from "@heroui/react";

import {
  FaTrash,
  FaStar,
  FaCheck,
} from "react-icons/fa";

export default function ManageLessonsTable({
  lessons,
  onFeature,
  onReview,
  onDelete,
  onVisibility,
}) {
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Manage Lessons">

          <Table.Header>

            <Table.Column isRowHeader >
              TITLE
            </Table.Column>

            <Table.Column>
              CATEGORY
            </Table.Column>

            <Table.Column>
              AUTHOR
            </Table.Column>

            <Table.Column>
              VISIBILITY
            </Table.Column>

            <Table.Column>
              FEATURED
            </Table.Column>

            <Table.Column>
              REVIEW
            </Table.Column>

            <Table.Column>
              FLAGS
            </Table.Column>

            <Table.Column>
              ACTIONS
            </Table.Column>

          </Table.Header>

          <Table.Body>

            {lessons.map((lesson) => (

              <Table.Row key={lesson._id}>

                <Table.Cell>

                  <div className="flex flex-col">

                    <span className="font-semibold">
                      {lesson.title}
                    </span>

                    <span className="text-xs text-default-500">
                      {lesson.accessLevel}
                    </span>

                  </div>

                </Table.Cell>

                <Table.Cell>

                  <Chip
                    size="sm"
                    variant="flat"
                  >
                    {lesson.category}
                  </Chip>

                </Table.Cell>

                <Table.Cell>
                  {lesson.author}
                </Table.Cell>

                <Table.Cell>

                  <Chip
                    color={
                      lesson.visibility === "public"
                        ? "success"
                        : "warning"
                    }
                    variant="flat"
                  >
                    {lesson.visibility}
                  </Chip>

                </Table.Cell>

                <Table.Cell>

                  <Chip
                    color={
                      lesson.featured
                        ? "success"
                        : "default"
                    }
                    variant="flat"
                  >
                    {lesson.featured
                      ? "Featured"
                      : "No"}
                  </Chip>

                </Table.Cell>

                <Table.Cell>

                  <Chip
                    color={
                      lesson.reviewed
                        ? "success"
                        : "danger"
                    }
                    variant="flat"
                  >
                    {lesson.reviewed
                      ? "Reviewed"
                      : "Pending"}
                  </Chip>

                </Table.Cell>

                <Table.Cell>

                  <Chip
                    color={
                      lesson.flags > 0
                        ? "danger"
                        : "success"
                    }
                    variant="flat"
                  >
                    {lesson.flags}
                  </Chip>

                </Table.Cell>

                <Table.Cell>

                  <div className="flex gap-1 justify-between flex-wrap">

                    <Tooltip
                      content={
                        lesson.featured
                          ? "Remove Featured"
                          : "Make Featured"
                      }
                    >
                      <Button
                        size="sm"
                        color={
                          lesson.featured
                            ? "success"
                            : "warning"
                        }
                        variant="flat"
                        onPress={() => onFeature(lesson._id)}
                      >
                        {lesson.featured ? "Featured" : "Feature"}
                      </Button>
                    </Tooltip>

                    <Tooltip
                      content={
                        lesson.reviewed
                          ? "Already Reviewed"
                          : "Mark as Reviewed"
                      }
                    >
                      <Button
                        size="sm"
                        color={
                          lesson.reviewed
                            ? "success"
                            : "primary"
                        }
                        variant="flat"
                        onPress={() => onReview(lesson._id)}
                      >
                        {lesson.reviewed ? "Reviewed" : "Review"}
                      </Button>
                    </Tooltip>
                    <Tooltip content="Delete Lesson">
                      <Button
                        size="sm"
                        color={
                          lesson.visibility === "public"
                            ? "success"
                            : "warning"
                        }
                        variant="flat"
                        onPress={() =>
                          onVisibility(lesson._id)
                        }
                      >
                        {lesson.visibility}
                      </Button>
                    </Tooltip>

                    <Tooltip content="Delete Lesson">
                      <Button
                        size="sm"
                        color="danger"
                        variant="flat"
                        onPress={() => onDelete(lesson._id)}
                      >
                        <FaTrash />
                      </Button>
                    </Tooltip>

                    


                  </div>

                </Table.Cell>

              </Table.Row>

            ))}

          </Table.Body>

        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}