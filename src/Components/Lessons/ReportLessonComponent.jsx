"use client";
import React, { useState } from "react";
import { Modal, Button } from "@heroui/react";
import { FaFlag, FaRegFlag } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ReportLessonComponent({handleButtonClick,isOpen}) {
    console.log(isOpen)
  
  const [reported, setReported] = useState(false); // অলরেডি রিপোর্টেড স্টেট
  const [selectedReason, setSelectedReason] = useState(""); // রেডিও বাটনের স্টেট
  const [customReason, setCustomReason] = useState(""); // অন্যান্য কারণের জন্য স্টেট

  // ডেমো ডেটা (আপনার কোড অনুযায়ী এগুলো প্রপ্স বা স্টেট থেকে আসবে)
  const currentUser = { id: "user_123" }; 
  const lessonId = "lesson_456";

  // রিপোর্ট করার অপশনসমূহ
  const reportOptions = [
    "Inappropriate content",
    "Copyright violation",
    "Incorrect information",
    "Spam or misleading",
    "Other"
  ];

  // বাটন ক্লিকের হ্যান্ডলার


  // মোডাল সাবমিট হ্যান্ডলার
  const handleReportSubmit = async () => {
    // ফাইনাল রিজন নির্ধারণ করা
    const finalReason = selectedReason === "Other" ? customReason : selectedReason;

    if (!finalReason) {
      toast("Please select or enter a reason for reporting!");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/lessons/${lessonId}/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser.id, reason: finalReason })
      });

      if (res.ok) {
        setReported(true); // UI স্টেট আপডেট
        setIsOpen(false); // মোডাল বন্ধ করা
        setSelectedReason(""); // স্টেট রিসেট
        setCustomReason("");
        toast("Lesson reported successfully."); // এখানে সুন্দর কোনো টোস্ট মেসেজ দিতে পারেন
      }
    } catch (err) {
      console.error("Report error:", err);
    }
  };

  return (
    <>
      {/* মেইন রিপোর্ট বাটন */}
      <Button
        variant={reported ? "danger-soft" : "solid"}
        onClick={handleButtonClick}
        disabled={reported} // অলরেডি রিপোর্ট করলে বাটন ডিজেবল থাকবে
      >
        {reported ? <FaFlag size={18} /> : <FaRegFlag />}
        {reported ? "Reported" : "Report"}
      </Button>

      {/* HeroUI মোডাল স্ট্রাকচার */}
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <Modal.Backdrop>
            <Modal.Container>
              <Modal.Dialog>
                <Modal.CloseTrigger onClick={() => setIsOpen(false)} />
                
                <Modal.Header>
                  <Modal.Icon>
                    <FaFlag style={{ color: "red" }} />
                  </Modal.Icon>
                  <Modal.Heading>Report this Lesson</Modal.Heading>
                </Modal.Header>

                <Modal.Body>
                  <p style={{ marginBottom: "12px", fontSize: "14px", color: "#555" }}>
                    Please select the reason why you are reporting this lesson:
                  </p>
                  
                  {/* রেডিও বাটন লিস্ট */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {reportOptions.map((option, index) => (
                      <label key={index} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                        <input
                          type="radio"
                          name="reportReason"
                          value={option}
                          checked={selectedReason === option}
                          onChange={(e) => setSelectedReason(e.target.value)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>

                  {/* 'Other' সিলেক্ট করলে টেক্সট এরিয়া দেখাবে */}
                  {selectedReason === "Other" && (
                    <div style={{ marginTop: "12px" }}>
                      <textarea
                        placeholder="Write your reason here..."
                        value={customReason}
                        onChange={(e) => setCustomReason(e.target.value)}
                        rows={3}
                        style={{
                          width: "100%",
                          padding: "8px",
                          borderRadius: "6px",
                          border: "1px solid #ccc",
                          fontSize: "14px"
                        }}
                      />
                    </div>
                  )}
                </Modal.Body>

                <Modal.Footer>
                  <Button variant="light" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    color="danger" 
                    onClick={handleReportSubmit}
                    disabled={!selectedReason || (selectedReason === "Other" && !customReason)}
                  >
                    Submit Report
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      )}
    </>
  );
}