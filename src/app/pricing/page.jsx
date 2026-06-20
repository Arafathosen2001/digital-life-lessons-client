import { Button, Card } from "@heroui/react";
import { HiCheckCircle, HiSparkles } from "react-icons/hi2";

export default function PricingPage() {
  const freeFeatures = [
    "View Public Free Lessons",
    "Create Free Lessons",
    "Save Favorites",
    "Comment on Lessons",
  ];

  const premiumFeatures = [
    "Everything in Free",
    "Access Premium Lessons",
    "Create Premium Lessons",
    "Priority Visibility",
    "Premium Badge",
    "Ad Free Experience",
    "Lifetime Access",
  ];

  return (
    <main className="relative overflow-hidden">
      {/* Background Effects */}

      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/20 blur-[150px]" />
      <div className="absolute right-0 top-40 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-20">
        {/* Hero */}

        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-300 bg-white/70 px-5 py-2 text-sm backdrop-blur">
            <HiSparkles />
            Premium Membership
          </span>

          <h1 className="mt-8 text-6xl font-black tracking-tight md:text-7xl">
            Unlock Your
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              Full Potential
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-default-500">
            Access premium life lessons, exclusive insights,
            advanced learning tools and become part of a
            growing community focused on personal growth.
          </p>

          <div className="mt-10">
            <h2 className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-7xl font-black text-transparent">
              ৳1500
            </h2>

            <p className="mt-2 text-default-500">
              One-Time Payment • Lifetime Access
            </p>
          </div>

          <Button
            color="primary"
            size="lg"
            className="mt-8 px-10 font-semibold shadow-xl transition hover:scale-105"
          >
            Upgrade To Premium
          </Button>
        </div>

        {/* Stats */}

        <div className="mt-24 grid gap-6 md:grid-cols-3">
          <Card className="border p-8 text-center">
            <h3 className="text-4xl font-black">5K+</h3>
            <p className="mt-2 text-default-500">
              Premium Members
            </p>
          </Card>

          <Card className="border p-8 text-center">
            <h3 className="text-4xl font-black">20K+</h3>
            <p className="mt-2 text-default-500">
              Life Lessons
            </p>
          </Card>

          <Card className="border p-8 text-center">
            <h3 className="text-4xl font-black">98%</h3>
            <p className="mt-2 text-default-500">
              Satisfaction Rate
            </p>
          </Card>
        </div>

        {/* Pricing Cards */}

        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          {/* Free */}

          <Card className="border border-default-200 bg-white/70 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
            <h2 className="text-3xl font-bold">
              Free Plan
            </h2>

            <p className="mt-2 text-default-500">
              Perfect for beginners.
            </p>

            <div className="mt-6">
              <span className="text-6xl font-black">
                ৳0
              </span>
            </div>

            <ul className="mt-10 space-y-5">
              {freeFeatures.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3"
                >
                  <HiCheckCircle className="text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          {/* Premium */}

          <Card className="relative overflow-hidden border border-violet-500/40 bg-gradient-to-b from-violet-500/10 via-background to-background p-8 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_80px_rgba(139,92,246,0.25)]">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="absolute right-5 top-5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-1 text-xs font-semibold text-white shadow-lg">
              MOST POPULAR
            </div>

            <div className="relative">
              <h2 className="text-3xl font-bold">
                Premium Lifetime
              </h2>

              <p className="mt-2 text-default-500">
                One payment. Unlimited value.
              </p>

              <div className="mt-6">
                <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-6xl font-black text-transparent">
                  ৳1500
                </span>
              </div>

              <ul className="mt-10 space-y-5">
                {premiumFeatures.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <HiCheckCircle className="text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>

              <Button
                color="primary"
                size="lg"
                className="mt-10 w-full font-semibold shadow-xl transition hover:scale-[1.02]"
              >
                Upgrade Now
              </Button>
            </div>
          </Card>
        </div>

        {/* Comparison */}

        <div className="mt-24">
          <h2 className="text-center text-4xl font-black">
            Compare Plans
          </h2>

          <p className="mt-3 text-center text-default-500">
            Choose the plan that fits your learning journey.
          </p>

          <div className="mt-10 overflow-hidden rounded-3xl border border-default-200 bg-white/70 shadow-xl backdrop-blur-xl">
            <table className="w-full">
              <thead>
                <tr className="bg-default-100">
                  <th className="p-5 text-left font-bold">
                    Features
                  </th>
                  <th className="p-5">Free</th>
                  <th className="p-5">Premium</th>
                </tr>
              </thead>

              <tbody>
                {[
                  [
                    "Create Lessons",
                    "Limited",
                    "Unlimited",
                  ],
                  [
                    "Premium Lessons",
                    "❌",
                    "✅",
                  ],
                  [
                    "Premium Content",
                    "❌",
                    "✅",
                  ],
                  [
                    "Premium Badge",
                    "❌",
                    "✅",
                  ],
                  [
                    "Priority Visibility",
                    "❌",
                    "✅",
                  ],
                  [
                    "Ad Free Experience",
                    "❌",
                    "✅",
                  ],
                  [
                    "Lifetime Access",
                    "❌",
                    "✅",
                  ],
                ].map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-default-100 transition hover:bg-default-50"
                  >
                    <td className="p-5 font-medium">
                      {row[0]}
                    </td>
                    <td className="p-5 text-center">
                      {row[1]}
                    </td>
                    <td className="p-5 text-center">
                      {row[2]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}

        <div className="mt-24 rounded-[32px] border bg-gradient-to-r from-violet-600 to-indigo-600 p-12 text-center text-white">
          <h2 className="text-4xl font-black">
            Ready To Transform Your Life?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Join thousands of learners who have already
            upgraded their personal growth journey.
          </p>

          <Button
            size="lg"
            className="mt-8 bg-white font-semibold text-black"
          >
            Get Premium Access
          </Button>
        </div>
      </div>
    </main>
  );
}