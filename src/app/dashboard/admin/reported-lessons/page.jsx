"use client";

import { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Chip,
  Modal,
} from "@heroui/react";
import { FaTrash, FaEye, FaBan } from "react-icons/fa";
import toast from "react-hot-toast";
// import { toast } from "react-toastify";

export default function ReportedLessonsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 5000;
  // ======================
  // STATE MANAGEMENT
  // ======================
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  // console.log(reports)

  // ======================
  // FETCH REPORTED LESSONS FROM DB
  // ======================
  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/api/reports`);
      if (res.ok) {
        const data = await res.json();
        setReports(data);
      }
    } catch (err) {
      console.error("Error fetching reports:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // ======================
  // OPEN MODAL FOR DETAILS
  // ======================
  const handleOpenModal = (lesson) => {
    setSelectedLesson(lesson);
    setIsOpen(true);
  };

  // ======================
  // DELETE LESSON (PERMANENT)
  // ======================
  const handleDeleteLesson = async (id) => {
    const ok = confirm("Are you sure you want to delete this lesson permanently from the platform?");
    if (!ok) return;

    try {
      toast.success('The delete option is located in the lessons route of the dashboard.')
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Something went wrong!");
    }
  };

  // ======================
  // IGNORE REPORTS (CLEAR ALL)
  // ======================
// ======================
// IGNORE REPORTS (CLEAR ALL)
// ======================
const handleIgnore = async (lessonId) => {
  if (!confirm("Ignore all reports for this lesson?")) return;

  try {
    const res = await fetch(
      `${baseUrl}/api/reports/${lessonId}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (data.success) {
      setReports((prev) =>
        prev.filter((report) => report.lessonId !== lessonId)
      );
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error(error);
  }
};


  // ======================
  // UI RENDERING
  // ======================
  return (
    <div className="space-y-6 p-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reported Lessons</h1>
        <p className="text-default-500 mt-1">
          Review, delete flagged lessons, or clear user reports.
        </p>
      </div>

      {/* TABLE */}
      <Card>
        <Card.Content className="p-0">
          <Table>
            <Table.ScrollContainer>
              <Table.Content aria-label="Reported lessons management table">
                <Table.Header>
                  <Table.Column isRowHeader>LESSON TITLE</Table.Column>
                  <Table.Column>REPORT COUNT</Table.Column>
                  <Table.Column>DETAILS</Table.Column>
                  <Table.Column>ACTIONS</Table.Column>
                </Table.Header>

                <Table.Body>
                  {loading ? (
                    <Table.Row>
                      <Table.Cell colSpan={4} className="text-center py-8 text-default-400">
                        Loading reported lessons...
                      </Table.Cell>
                    </Table.Row>
                  ) : reports.length === 0 ? (
                    <Table.Row>
                      <Table.Cell colSpan={4} className="text-center py-8 text-default-400">
                        No reported lessons found.
                      </Table.Cell>
                    </Table.Row>
                  ) : (
                    reports.map((lesson) => (
                      
                      <Table.Row key={lesson.lessonId}>
                        {/* TITLE */}
                        <Table.Cell className="font-medium">
                          {lesson.title}
                        </Table.Cell>

                        {/* COUNT */}
                        <Table.Cell>
                          <Chip color="danger" variant="flat" size="sm">
                            {lesson.reports?.length || 0} Reports
                          </Chip>
                        </Table.Cell>

                        {/* VIEW DETAILS BUTTON */}
                        <Table.Cell>
                          <Button
                            size="sm"
                            color="primary"
                            variant="light"
                            onPress={() => handleOpenModal(lesson)}
                            className="flex items-center gap-1"
                          >
                            <FaEye /> View Reasons
                          </Button>
                        </Table.Cell>

                        {/* ACTIONS */}
                        <Table.Cell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              color="danger"
                              onPress={() => handleDeleteLesson(lesson.lessonId)}
                              className="flex items-center gap-1"
                            >
                              <FaTrash /> Delete
                            </Button>

                            <Button
                              size="sm"
                              color="warning"
                              variant="flat"
                              onPress={() => handleIgnore(lesson.lessonId)}
                              className="flex items-center gap-1"
                            >
                              <FaBan /> Ignore
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
        </Card.Content>
      </Card>

      {/* HeroUI Controlled Modal */}
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>Report Details</Modal.Heading>
                {selectedLesson && (
                  <p className="text-sm text-default-500 mt-1">
                    Lesson: <b>{selectedLesson.title}</b>
                  </p>
                )}
              </Modal.Header>
              <Modal.Body className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
                {selectedLesson?.reports && selectedLesson.reports.length > 0 ? (
                  selectedLesson.reports.map((r, i) => (
                    <div
                      key={i}
                      className="border border-default-200 p-3 rounded-xl bg-default-50 flex flex-col gap-1"
                    >
                      <p className="text-sm text-foreground">
                        <span className="font-semibold text-default-600">Reason:</span> {r.reason}
                      </p>
                      <p className="text-xs text-default-400">
                        Reported by: <span className="font-medium text-default-500">{r.reporterName}</span>
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-default-400 py-4">No specific reason logs found.</p>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button fullWidth variant="secondary" onPress={() => setIsOpen(false)}>
                  Close Window
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
