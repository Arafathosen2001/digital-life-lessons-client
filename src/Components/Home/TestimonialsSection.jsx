import { Avatar } from "@heroui/react";

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "Student",
    image: "https://i.pravatar.cc/150?img=1",
    review:
      "Digital Life Lessons completely changed how I manage my time and goals.",
  },
  {
    name: "Rakib Hasan",
    role: "Entrepreneur",
    image: "https://i.pravatar.cc/150?img=3",
    review:
      "The premium lessons are packed with practical advice that I use every day.",
  },
  {
    name: "Nusrat Jahan",
    role: "Designer",
    image: "https://i.pravatar.cc/150?img=5",
    review:
      "Beautiful platform and extremely valuable life-changing content.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black">
            What Our Learners Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className=" rounded-[28px] border border-slate-200 p-8 shadow-sm hover:shadow-xl transition"
            >
              <p className="text-slate-600 leading-8">
                "{item.review}"
              </p>

              <div className="flex items-center gap-4 mt-8">
              <Avatar>
                    <Avatar.Image alt={item?.name || "User"} src={item?.image} />
                    <Avatar.Fallback>
                      {item?.name ? item.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() : "U"}
                    </Avatar.Fallback>
                  </Avatar>

                <div>
                  <h4 className="font-bold">
                    {item.name}
                  </h4>

                  <p className="text-sm text-slate-500">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}