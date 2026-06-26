import React from 'react';

export default function AboutUs() {
  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen">
      
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          We believe that through accessible knowledge, continuous learning, and innovation, anyone can achieve their ultimate potential.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">
        
        {/* Our Story & Mission */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 relative inline-block">
              Our Story
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-primary rounded"></span>
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Launched in 2026, our platform started with a simple vision: to break down complex topics into easily digestible lessons and build a thriving community of learners and thinkers. 
            </p>
            <p className="text-slate-600 leading-relaxed">
              What began as a passion project has quickly evolved into a trusted space where individuals come to expand their mindsets, build resilience, and master new skills. Driven by user feedback, we continuously strive to refine our content and engineering.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-2xl font-bold mb-4 text-blue-600">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              To empower learners globally by providing high-quality, structured, and impactful lessons that bridge the gap between curiosity and practical execution.
            </p>
            <h3 className="text-2xl font-bold mb-4 text-purple-600">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed">
              To become a premier destination for self-improvement and technical mastery, fostering a global ecosystem where knowledge sharing is seamless, engaging, and accessible to all.
            </p>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* Core Values */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Value 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="text-3xl mb-4">🤝</div>
              <h4 className="text-xl font-semibold mb-2">Integrity & Trust</h4>
              <p className="text-slate-600 text-sm">We maintain complete transparency in our operations and prioritize the authenticity of our platform above all else.</p>
            </div>

            {/* Value 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="text-3xl mb-4">💡</div>
              <h4 className="text-xl font-semibold mb-2">Innovation</h4>
              <p className="text-slate-600 text-sm">We continuously experiment with modern web tech and features to bring you the smoothest user experience.</p>
            </div>

            {/* Value 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="text-3xl mb-4">🎯</div>
              <h4 className="text-xl font-semibold mb-2">User-Centric Growth</h4>
              <p className="text-slate-600 text-sm">Your bookmarks, likes, reports, and comments actively shape our platform. We grow exactly where you need us to.</p>
            </div>

          </div>
        </div>

        <hr className="border-slate-200" />

        {/* Team Section */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-4">Meet Our Team</h2>
          <p className="text-slate-500 text-center max-w-md mx-auto mb-12">
            The dedicated minds working around the clock to build, curate, and scale this platform.
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {/* Team Member 1 */}
            <div className="text-center bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <img 
                className="w-24 h-24 rounded-full mx-auto object-cover mb-4 ring-4 ring-slate-100" 
                src="https://i.pravatar.cc/150?img=33" 
                alt="CEO" 
              />
              <h4 className="text-lg font-bold">Asif Rahman</h4>
              <p className="text-sm text-blue-600 font-medium mb-2">Founder & CEO</p>
              <p className="text-slate-500 text-xs">The visionary mind driving the platform's core direction and curation.</p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <img 
                className="w-24 h-24 rounded-full mx-auto object-cover mb-4 ring-4 ring-slate-100" 
                src="https://i.pravatar.cc/150?img=12" 
                alt="Lead Developer" 
              />
              <h4 className="text-lg font-bold">Tanjila Akter</h4>
              <p className="text-sm text-blue-600 font-medium mb-2">Lead Developer</p>
              <p className="text-slate-500 text-xs">Architects full-stack features, smooth database indexing, and client states.</p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <img 
                className="w-24 h-24 rounded-full mx-auto object-cover mb-4 ring-4 ring-slate-100" 
                src="https://i.pravatar.cc/150?img=68" 
                alt="Designer" 
              />
              <h4 className="text-lg font-bold">Rakib Hasan</h4>
              <p className="text-sm text-blue-600 font-medium mb-2">UI/UX Designer</p>
              <p className="text-slate-500 text-xs">Transforms interactive logic into stunning, crisp, and clean responsive interfaces.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}