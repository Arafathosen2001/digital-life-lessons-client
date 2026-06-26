"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Avatar,
  Chip,
} from "@heroui/react";
import { FaBookmark, FaClock, FaFlag, FaRegBookmark } from "react-icons/fa";
import { BiSolidLike, BiLike } from "react-icons/bi";
import { useClientSession } from "@/lib/getData/session/session";
import { ReportLessonModal } from "./ReportLessonModal";
import toast from "react-hot-toast";

export default function LessonDetailsContent({ lessonById }) {
  const { session } = useClientSession();
  const user = session?.user;
  const lesson = lessonById;
  const lessonId = lesson._id;
  const currentUser = user;

  const [authorInfo, setAuthorInfo] = useState(null);
  // States
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // Save States (ফিক্সড: সেভ কাউন্টার যুক্ত করা হয়েছে)
  const [saved, setSaved] = useState(false);
  const [saveCount, setSaveCount] = useState(0);
  
  // Report State (ফিক্সড: রিপোর্ট স্ট্যাটাস ট্র্যাক করার জন্য)
  const [reported, setReported] = useState(false);
  
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");
  // console.log(comments);

  // ব্যাকএন্ড থেকে প্রাথমিক ডেটা লোড করা
  useEffect(() => {
    if (!lessonId) return;
    if (lesson?.userId) {
      fetch(`http://localhost:5000/api/user/${lesson.userId}`)
        .then(res => res.json())
        .then(data => {
          if (!data.message) {
            setAuthorInfo(data);
          }
        })
        .catch(err => console.error("Error fetching author info:", err));
    }
    // লাইক স্ট্যাটাস ও কাউন্ট আনা
    fetch(`http://localhost:5000/api/lessons/${lessonId}/like-status?userId=${currentUser?.id}`)
      .then(res => res.json())
      .then(data => {
        setLikeCount(data.totalLikes || 0);
        setLiked(data.isLiked);
      })
      .catch(err => console.error("Error fetching like status:", err));

    // সেভ স্ট্যাটাস ও কাউন্ট আনা (ফিক্সড: ব্যাকএন্ড থেকে totalSaves ও isSaved আশা করা হচ্ছে)
    fetch(`http://localhost:5000/api/lessons/${lessonId}/save-status?userId=${currentUser?.id}`)
      .then(res => res.json())
      .then(data => {
        setSaved(data.isSaved);
        setSaveCount(data.totalSaves || 0); // ব্যাকএন্ডে totalSaves না থাকলে রেসপন্সে পাঠাতে হবে
      })
      .catch(err => console.error("Error fetching save status:", err));

    // রিপোর্ট স্ট্যাটাস আনা (নতুন যুক্ত করা হয়েছে)
    if (currentUser?.id) {
      fetch(`http://localhost:5000/api/lessons/${lessonId}/report-status?userId=${currentUser?.id}`)
        .then(res => res.json())
        .then(data => {
          setReported(data.isReported);
        })
        .catch(err => console.error("Error fetching report status:", err));
    }

    // কমেন্ট লিস্ট আনা
    fetch(`http://localhost:5000/api/lessons/${lessonId}/comments`)
      .then(res => res.json())
      .then(data => setComments(data || []))
      .catch(err => console.error("Error fetching comments:", err));

  }, [lessonId, currentUser?.id, lesson?.userId]);

  // Like Handle Function
  const handleLike = async () => {
    if (!currentUser?.id) {
      toast("Please log in to like this lesson!");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/lessons/${lessonId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser.id })
      });
      const data = await res.json();
      setLiked(data.liked);
      setLikeCount(prev => data.liked ? prev + 1 : prev - 1);
    } catch (err) {
      console.error("Like tracking error:", err);
    }
  };

  // Save Handle Function (ফিক্সড: কাউন্টার রিয়েল-টাইম আপডেট)
  const handleSave = async () => {
    if (!currentUser?.id) {
      toast("Please log in to save this lesson!");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/lessons/${lessonId}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser.id })
      });
      const data = await res.json();
      setSaved(data.saved);
      // রিয়েল-টাইমে কাউন্ট বাড়ানো বা কমানো
      setSaveCount(prev => data.saved ? prev + 1 : prev - 1);
      toast(data.saved ? "Saved to favorites!" : "Removed from favorites!");
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  // Report Handle Function (ফিক্সড: অলরেডি রিপোর্টেড হলে বাধা দেওয়া এবং স্টেট আপডেট)
 

  // Comment Post Handle Function
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    if (!currentUser?.id) {
      toast("Please log in to make a comment!");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/lessons/${lessonId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser?.id,
          commentText: newCommentText,
          userName: currentUser?.name || "Anonymous User",
          userAvatar: currentUser?.image || ""
        })
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server responded with status ${res.status}: ${errorText}`);
      }

      const postedComment = await res.json();
      setComments([postedComment, ...comments]);
      setNewCommentText("");
    } catch (err) {
      console.error("Comment submission error:", err.message);
    }
  };

  return (
    <div className="grid lg:grid-cols-4 gap-8 p-6 max-w-7xl mx-auto">
      {/* Main Content */}
      <div className="lg:col-span-3">
        <img
          src={lesson?.image || null}
          alt={lesson?.title}
          className="w-full h-[400px] object-cover rounded-3xl"
        />

        <div className="mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">{lesson.title}</h1>
          </div>

          {/* ফিক্সড: ওপরের সেভ বাটনটিকেও ডাইনামিক করা হলো এবং কাউন্ট দেখানো হলো */}
          <Button color={saved ? "success" : "primary"} variant="flat" onClick={handleSave}>
            {saved ? <FaBookmark size={18} /> : <FaRegBookmark size={18} />}
            {saved ? `Favorited (${saveCount})` : `Add to Favorites (${saveCount})`}
          </Button>
        </div>

        <div className="flex flex-wrap gap-3 mt-5">
          <Chip>{lesson.category}</Chip>
          <Chip color="secondary">{lesson.emotionalTone}</Chip>
          <Chip>
            <FaClock size={14} className="inline mr-1" />
            {lesson.readTime}
          </Chip>
          <Chip color="success">{lesson.accessLevel}</Chip>
        </div>

        <hr className="my-8 opacity-20" />

        <section>
          <h2 className="text-2xl font-bold mb-4">About This Lesson</h2>
          <p className="text-default-600 leading-8">
            Positive thinking is more than a feel-good attitude. It helps us overcome obstacles,
            maintain motivation and develop resilience during difficult times.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-4">What You Will Learn</h2>
          <ul className="space-y-3 text-default-600">
            <li>✓ Understand positive thinking</li>
            <li>✓ Build mental resilience</li>
            <li>✓ Improve daily productivity</li>
            <li>✓ Create better habits</li>
          </ul>
        </section>

        <hr className="my-8 opacity-20" />

        {/* Actions Section */}
        <div className="flex flex-wrap gap-3">
          <Button variant={liked ? "solid" : "flat"} onClick={handleLike}>
            {liked ? <><BiSolidLike size={18} />Liked </> : <><BiLike size={18} />Like</>}
            ({likeCount})
          </Button>

          {/* ফিক্সড: রিপোর্ট বাটনের কন্ডিশনাল রেন্ডারিং */}
         {reported ? (<Button
            variant={reported && "danger-soft"}
            
            disabled={reported} // অলরেডি রিপোর্ট করলে বাটন ডিজেবল থাকবে
          >
            {reported && <FaFlag size={18} />}
            {reported && "Reported" }
          </Button>):
          (<><ReportLessonModal currentUser={currentUser} lessonId={lessonId}>
          </ReportLessonModal></>)}
        </div>

        {/* Comments Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>

          {/* New Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-6 flex flex-col gap-3">
            <textarea
              className="w-full p-4 rounded-xl border border-default-200 bg-transparent text-sm focus:outline-none focus:border-primary"
              rows={3}
              placeholder="Write a comment..."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
            />
            <Button color="primary" type="submit" className="self-end">Submit Comment</Button>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment._id} className="p-4">
                <div className="p-0">
                  <div className="flex gap-3">
                  <Avatar>
              <Avatar.Image alt={comment?.name || "User"} src={comment?.userAvatar} />
              <Avatar.Fallback>
                {comment?.userName ? comment.userName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() : "U"}
              </Avatar.Fallback>
            </Avatar>
                    <div>
                      <h4 className="font-semibold text-sm">{comment.userName || "User"}</h4>
                      <p className="text-xs text-default-400 mb-1">
                        {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : "Just now"}
                      </p>
                      <p className="text-sm text-default-600">{comment.commentText}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <Card className="p-4">
          <h3 className="font-bold mb-4">About Author</h3>
          <div className="flex gap-3">
            <Avatar>
              <Avatar.Image alt={authorInfo?.name || "User"} src={authorInfo?.image} />
              <Avatar.Fallback>
                {authorInfo?.name ? authorInfo.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() : "U"}
              </Avatar.Fallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">{authorInfo?.name}</h4>
              <p className="text-sm text-default-500">12 Lessons</p>
            </div>
          </div>
          <Button className="mt-4" variant="flat" fullWidth>View Profile</Button>
        </Card>

        <Card className="p-4">
          <h3 className="font-bold mb-4">Related Lessons</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex gap-3">
                <img
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=300"
                  alt=""
                  className="w-20 h-16 rounded-lg object-cover"
                />
                <p className="text-sm font-medium">How to Build Discipline</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}