"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client"; // আপনার প্রজেক্টের auth client সেশন হুক অনুযায়ী পাথ ঠিক রাখুন

// HeroUI-এর মূল কম্পোনেন্টসমূহ (নতুন ডট নোটেশন আর্কিটেকচার)
import {
  Button,
  Card,
  Chip,
  Select,
  ListBox,
  Table,
} from "@heroui/react";

import { FaEye } from "react-icons/fa6";
import { FaHeartBroken, FaRemoveFormat } from "react-icons/fa";
import toast from "react-hot-toast";
import { FiDelete } from "react-icons/fi";

export default function MyFavoritesPage() {
  const { data: session } = useSession(); // লগইন করা ইউজারের ডেটা
  const userId = session?.user?.id;

  const [category, setCategory] = useState("all");
  const [tone, setTone] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // আপনার ব্যাকএন্ড বেস ইউআরএল
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://digital-life-lessons-server-l2igjgsre.vercel.app';

  // ডেটাবেস থেকে ডেটা ফেচ করার ইফেক্ট
  useEffect(() => {
    if (!userId) return;

    const fetchFavoritesData = async () => {
      try {
        setLoading(true);
        
        // ১. ইউজারের সেভ করা লিস্ট (আইডি সমূহ) নিয়ে আসা
        const savesRes = await fetch(`${baseUrl}/api/saves?userId=${userId}`);
        const savedList = await savesRes.json();
        setFavorites(
          savedList.map((item) => ({
            _id: item.lessonId,
            title: item.title,
            category: item.category,
            emotionalTone: item.emotionalTone,
            savedAt: new Date(item.createdAt).toLocaleDateString(),
          }))
        );
        // ২. প্রতিটি সেভ করা আইটেমের lessonId দিয়ে লেসনের মূল ডিটেইলস নিয়ে আসা
        if (Array.isArray(savedList)) {
          const detailedFavorites = await Promise.all(
            savedList.map(async (savedItem) => {
              try {
                const lessonRes = await fetch(`${baseUrl}/api/lessons/${savedItem.lessonId}`);
                const lessonDetails = await lessonRes.json();
                
                return {
                  _id: savedItem.lessonId,
                  title: lessonDetails?.title || "Unknown Lesson",
                  category: lessonDetails?.category || "N/A",
                  emotionalTone: lessonDetails?.emotionalTone || "N/A",
                  savedAt: savedItem.createdAt ? new Date(savedItem.createdAt).toLocaleDateString() : "N/A",
                };
              } catch (err) {
                console.error(`Failed to fetch details for lesson: ${savedItem.lessonId}`, err);
                return {
                  _id: savedItem.lessonId,
                  title: "Failed to load lesson title",
                  category: "N/A",
                  emotionalTone: "N/A",
                  savedAt: "N/A",
                };
              }
            })
          );
          setFavorites(detailedFavorites);
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritesData();
  }, [userId, baseUrl]);

  const handleRemoveFavorite = async (lessonId) => {
    if (!userId) return;
    try {
      // সরাসরি DELETE মেথড কল করা হচ্ছে
      const res = await fetch(`${baseUrl}/api/saves?lessonId=${lessonId}&userId=${userId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      
      // ডিলিট সফল হলে UI থেকে আইটেমটি ফিল্টার করে বাদ দেওয়া হচ্ছে
      if (data.success) {
        toast.success('Your Favorite Leson Remove Success')
        setFavorites((prev) => prev.filter((item) => item._id !== lessonId));
      }
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  };

  // ফিল্টার লজিক (Filter favorites by category / emotional tone)
  const filtered = useMemo(() => {
    return favorites.filter((item) => {
      const categoryMatch = category === "all" || item.category.toLowerCase() === category.toLowerCase();
      const toneMatch = tone === "all" || item.emotionalTone.toLowerCase() === tone.toLowerCase();
      return categoryMatch && toneMatch;
    });
  }, [category, tone, favorites]);

  return (
    <div className="space-y-6 p-4">
      {/* হেডার সেকশন */}
      <div>
        <h1 className="text-3xl font-bold">My Favorites</h1>
        <p className="text-default-500 mt-2">
          Manage your saved lessons from database.
        </p>
      </div>

      {/* মেইন কার্ড */}
      <Card>
        <Card.Content>
          
          {/* ফিল্টার ড্রপডাউনদ্বয় */}
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Select  aria-label="Filter by category">
              <Select.Trigger>
                <Select.Value placeholder={category === "all" ? "All Categories" : category} />
              </Select.Trigger>
              <Select.Popover>
                <ListBox onAction={(key) => setCategory(String(key))}>
                  <ListBox.Item id="all">All Categories</ListBox.Item>
                  <ListBox.Item id="Motivation">Motivation</ListBox.Item>
                  <ListBox.Item id="Life">Life</ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>

            <Select aria-label="Filter by emotional tone">
              <Select.Trigger>
                <Select.Value placeholder={tone === "all" ? "All Tones" : tone} />
              </Select.Trigger>
              <Select.Popover>
                <ListBox onAction={(key) => setTone(String(key))}>
                  <ListBox.Item id="all">All Tones</ListBox.Item>
                  <ListBox.Item id="Motivational">Motivational</ListBox.Item>
                  <ListBox.Item id="Realization">Realization</ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* ট্যাবুলার ফরম্যাট টেবিল */}
          <Table aria-label="Favorite Lessons Table">
            <Table.ScrollContainer>
              <Table.Content aria-label="Favorite Lessons Table">
                <Table.Header>
                  <Table.Column isRowHeader >TITLE</Table.Column>
                  <Table.Column>CATEGORY</Table.Column>
                  <Table.Column>TONE</Table.Column>
                  <Table.Column>SAVED AT</Table.Column>
                  <Table.Column>ACTION</Table.Column>
                </Table.Header>
                <Table.Body>
                  {loading ? (
                    <Table.Row>
                      <Table.Cell colSpan={5} className="text-center py-8">
                        Loading your favorites...
                      </Table.Cell>
                    </Table.Row>
                  ) : filtered.length === 0 ? (
                    <Table.Row>
                      <Table.Cell colSpan={5} className="text-center py-8 text-default-400">
                        No favorite lessons found.
                      </Table.Cell>
                    </Table.Row>
                  ) : (
                    filtered.map((lesson) => (
                      <Table.Row key={lesson._id}>
                        {/* গুরুত্বপূর্ণ ইনফো সমূহ */}
                        <Table.Cell className="font-medium">{lesson.title}</Table.Cell>
                        <Table.Cell>
                          <Chip size="sm" color="primary" variant="flat">
                            {lesson.category}
                          </Chip>
                        </Table.Cell>
                        <Table.Cell>{lesson.emotionalTone}</Table.Cell>
                        <Table.Cell>{lesson.savedAt}</Table.Cell>
                        <Table.Cell>
                          <div className="flex gap-2 justify-center items-center">
                            {/* Lesson Details Button */}
                            <Link
                              href={`/lessons/${lesson._id}`}
                              color="primary"
                              variant="flat"
                              title="View Lesson Details"
                            >
                              <FaEye size={16} />
                            </Link>

                            {/* Remove from Favorites Button */}
                            <Button
                              color="danger"
                              variant="flat"
                              title="Remove from Favorites"
                              onClick={() => handleRemoveFavorite(lesson._id)}
                            >
                              <FiDelete size={16} />
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
    </div>
  );
}