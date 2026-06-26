import { Card } from "@heroui/react";
import {
  FaBookOpen,
  FaLock,
  FaFlag,
} from "react-icons/fa";

export default function AdminLessonStats({
  stats,
}) {
  const cards = [
    {
      title: "Public Lessons",
      value: stats.publicLessons,
      icon: <FaBookOpen />,
    },
    {
      title: "Private Lessons",
      value: stats.privateLessons,
      icon: <FaLock />,
    },
    {
      title: "Flagged Lessons",
      value: stats.flaggedLessons,
      icon: <FaFlag />,
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {cards.map((card) => (
        <Card key={card.title}>
          <Card.Content className="p-5">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-default-500">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold">
                  {card.value}
                </h2>
              </div>

              {card.icon}
            </div>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
}