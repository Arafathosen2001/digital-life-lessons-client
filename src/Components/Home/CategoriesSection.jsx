import {
    FaBrain,
    FaDollarSign,
    FaHeart,
    FaBriefcase,
  } from "react-icons/fa";
  
  export default function CategoriesSection() {
    const categories = [
      {
        title: "Career",
        icon: <FaBriefcase />,
      },
      {
        title: "Finance",
        icon: <FaDollarSign />,
      },
      {
        title: "Mindset",
        icon: <FaBrain />,
      },
      {
        title: "Relationships",
        icon: <FaHeart />,
      },
    ];
  
    return (
      <section className="py-10 ">
        <div className="container mx-auto px-6">
  
          <h2 className="text-center text-4xl font-black">
            Explore Categories
          </h2>
  
          <div className="grid md:grid-cols-4 gap-6 mt-14">
  
            {categories.map((cat) => (
              <div
                key={cat.title}
                className="border rounded-3xl p-10 text-center shadow-sm hover:shadow-xl transition"
              >
                <div className="text-5xl text-indigo-600 flex justify-center">
                  {cat.icon}
                </div>
  
                <h3 className="font-bold text-xl mt-4">
                  {cat.title}
                </h3>
              </div>
            ))}
  
          </div>
        </div>
      </section>
    );
  }