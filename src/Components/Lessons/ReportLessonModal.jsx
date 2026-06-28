"use client";

import { useState } from "react";
import { Button, Modal, Surface } from "@heroui/react";
import { Radio, RadioGroup } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FaRegFlag } from "react-icons/fa";
import toast from "react-hot-toast";

export function ReportLessonModal({ currentUser, lessonId }) {
    const [reported, setReported] = useState(false);
    const [reason, setReason] = useState("premium"); // স্টেট ডিফল্ট "premium" করা আছে
    const raout =useRouter()

    const handleReport = async (e) => {
        e.preventDefault();

        if (!currentUser?.id) {
            toast.error("Please log in to report this lesson!");
            return;
        }

        if (reported) {
            toast.error("You have already reported this lesson.");
            return;
        }

        try {
            const res = await fetch(`http://localhost:5000/api/lessons/${lessonId}/report`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: currentUser.id, reason })
            });
            
            if (res.ok) {
                setReported(true);
                toast.success("Lesson reported successfully.");
                raout.push(`/lessons`)

            } else {
                toast.error("Failed to report. Please try again.");
            }
        } catch (err) {
            console.error("Report error:", err);
            toast.error("An error occurred. Please check your connection.");
        }
    };

    return (
        <Modal>
            <div className="flex justify-center items-center gap-1">
                <FaRegFlag></FaRegFlag>
            <Button className={'p-0 m-0'} variant="">Report</Button>
            </div>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading>Report Lesson</Modal.Heading>
                            <p className="mt-1.5 text-sm leading-5 text-muted">
                                Please select a reason for reporting this lesson.
                            </p>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={handleReport} className="flex flex-col gap-4">
                                    
                                    {/* HeroUI-তে কন্ট্রোলড কম্পোনেন্ট করতে value এবং onChange একসাথে ব্যবহার করতে হয়।
                                      এরর এড়াতে aria-label যুক্ত করা হয়েছে।
                                    */}
                                    <RadioGroup 
                                        value={reason} 
                                        onChange={(value) => setReason(value)}
                                        name="plan-custom-indicator"
                                        aria-label="Select Reason"
                                    >
                                        <Radio value="Fake Content">
                                            <Radio.Content>
                                                <Radio.Control className="bg-red-500">
                                                    <Radio.Indicator />
                                                </Radio.Control>
                                                Fake Content
                                            </Radio.Content>
                                        </Radio>

                                        <Radio value="Emotional Content">
                                            <Radio.Content>
                                                <Radio.Control className="bg-red-500">
                                                    <Radio.Indicator />
                                                </Radio.Control>
                                                Emotional Content
                                            </Radio.Content>
                                        </Radio>

                                        <Radio value="Not Match Content">
                                            <Radio.Content>
                                                <Radio.Control className="bg-red-500">
                                                    <Radio.Indicator />
                                                </Radio.Control>
                                                Not Match Content
                                            </Radio.Content>
                                        </Radio>
                                    </RadioGroup>

                                    <Modal.Footer>
                                        <Button slot="close" variant="secondary">
                                            Cancel
                                        </Button>
                                        <Button type="submit" slot={reported ? "close" : undefined}>
                                            Submit
                                        </Button>
                                    </Modal.Footer>
                                </form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}