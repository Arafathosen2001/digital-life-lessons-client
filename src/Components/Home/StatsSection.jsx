export default function StatsSection() {
    const stats = [
      {
        title: "Lessons",
        value: "500+",
      },
      {
        title: "Premium Users",
        value: "2,000+",
      },
      {
        title: "Reviews",
        value: "15K+",
      },
      {
        title: "Success Rate",
        value: "95%",
      },
    ];
  
    return (
      <section className="py-20 ">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
  
            {stats.map((item) => (
              <div
                key={item.title}
                className="border rounded-3xl p-8 text-center shadow-sm"
              >
                <h2 className="text-4xl font-black text-indigo-600">
                  {item.value}
                </h2>
  
                <p className="text-gray-500 mt-2">
                  {item.title}
                </p>
              </div>
            ))}
  
          </div>
        </div>
      </section>
    );
  }