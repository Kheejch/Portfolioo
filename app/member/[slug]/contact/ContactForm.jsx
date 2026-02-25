"use client";
import { useState } from "react";
import { FaPaperPlane, FaUser, FaEnvelope, FaComments, FaRocket, FaStar } from "react-icons/fa";
import EmailSentAnimation from "./EmailSentAnimation";
import LoadingAnimation from "./LoadingAnimation";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setResult({ success: true, message: "Message sent successfully!" });
        setForm({ name: "", email: "", message: "" });
        // Show the email sent animation
        setShowAnimation(true);
      } else {
        setResult({ success: false, message: data.error || "Failed to send message." });
      }
    } catch (err) {
      setResult({ success: false, message: "An error occurred. Please try again." });
    }
    setLoading(false);
  };

  const handleAnimationComplete = () => {
    setShowAnimation(false);
  };

  return (
    <div className="relative">
      {/* Beautiful Background Card */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#6c5ce7]/20 via-[#fd79a8]/20 to-[#00cec9]/20 rounded-3xl blur-3xl"></div>
      
      {/* Main Form Container */}
      <div className="relative bg-gradient-to-br from-[#18192a]/95 to-[#23234a]/95 backdrop-blur-xl rounded-2xl xs:rounded-3xl p-4 xs:p-6 border border-white/20 shadow-2xl">
        {/* Header Section */}
        <div className="text-center mb-4 xs:mb-6">
          <div className="relative inline-flex items-center justify-center w-12 h-12 xs:w-14 xs:h-14 bg-gradient-to-r from-[#6c5ce7] via-[#fd79a8] to-[#00cec9] rounded-full mb-2 xs:mb-3 shadow-lg">
            <FaRocket className="text-lg xs:text-xl text-white animate-bounce" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#6c5ce7] via-[#fd79a8] to-[#00cec9] opacity-75 animate-pulse"></div>
          </div>
          <h3 className="text-lg xs:text-xl font-bold text-white mb-1 xs:mb-2 bg-gradient-to-r from-[#a29bfe] to-[#00cec9] bg-clip-text text-transparent">Let's Start a Project</h3>
          <p className="text-gray-300 text-xs">Share your vision and I'll bring it to life</p>
        </div>

        {/* Form Fields */}
        <form className="space-y-4 xs:space-y-6" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="group relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <div className="relative">
                <FaUser className={`text-lg transition-all duration-300 ${
                  focusedField === 'name' ? 'text-[#6c5ce7] scale-110' : 'text-gray-400'
                }`} />
                                 {focusedField === 'name' && (
                   <FaStar className="absolute -top-1 -right-1 text-xs text-[#6c5ce7] animate-pulse" />
                 )}
              </div>
            </div>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              className="w-full pl-12 pr-4 py-4 bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 
                         focus:outline-none focus:border-[#6c5ce7] focus:bg-gradient-to-r focus:from-white/10 focus:to-white/20 focus:shadow-lg focus:shadow-[#6c5ce7]/30
                         transition-all duration-300 backdrop-blur-sm group-hover:border-white/30 group-hover:shadow-lg group-hover:shadow-[#6c5ce7]/20"
              placeholder="Enter your full name"
              required
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#6c5ce7]/10 via-[#fd79a8]/5 to-[#00cec9]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#6c5ce7] via-[#fd79a8] to-[#00cec9] rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>

          {/* Email Field */}
          <div className="group relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <div className="relative">
                <FaEnvelope className={`text-lg transition-all duration-300 ${
                  focusedField === 'email' ? 'text-[#fd79a8] scale-110' : 'text-gray-400'
                }`} />
                                 {focusedField === 'email' && (
                   <FaStar className="absolute -top-1 -right-1 text-xs text-[#fd79a8] animate-pulse" />
                 )}
              </div>
            </div>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              className="w-full pl-12 pr-4 py-4 bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 
                         focus:outline-none focus:border-[#fd79a8] focus:bg-gradient-to-r focus:from-white/10 focus:to-white/20 focus:shadow-lg focus:shadow-[#fd79a8]/30
                         transition-all duration-300 backdrop-blur-sm group-hover:border-white/30 group-hover:shadow-lg group-hover:shadow-[#fd79a8]/20"
              placeholder="your.email@example.com"
              required
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#fd79a8]/10 via-[#6c5ce7]/5 to-[#00cec9]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#fd79a8] via-[#6c5ce7] to-[#00cec9] rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>

          {/* Message Field */}
          <div className="group relative">
            <div className="absolute top-4 left-4 flex items-center pointer-events-none">
              <div className="relative">
                <FaComments className={`text-lg transition-all duration-300 ${
                  focusedField === 'message' ? 'text-[#00cec9] scale-110' : 'text-gray-400'
                }`} />
                                 {focusedField === 'message' && (
                   <FaStar className="absolute -top-1 -right-1 text-xs text-[#00cec9] animate-pulse" />
                 )}
              </div>
            </div>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              className="w-full pl-12 pr-4 py-4 bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 
                         focus:outline-none focus:border-[#00cec9] focus:bg-gradient-to-r focus:from-white/10 focus:to-white/20 focus:shadow-lg focus:shadow-[#00cec9]/30
                         transition-all duration-300 backdrop-blur-sm resize-none group-hover:border-white/30 group-hover:shadow-lg group-hover:shadow-[#00cec9]/20"
              rows={5}
              placeholder="Tell me about your project, goals, and vision..."
              required
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00cec9]/10 via-[#fd79a8]/5 to-[#6c5ce7]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00cec9] via-[#fd79a8] to-[#6c5ce7] rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-[#6c5ce7] via-[#fd79a8] to-[#00cec9] 
                         text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-[#6c5ce7]/30 
                         transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 
                         focus:outline-none focus:ring-4 focus:ring-[#6c5ce7]/30 disabled:opacity-60 disabled:cursor-not-allowed
                         disabled:transform-none disabled:shadow-lg"
            >
              {/* Button Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00cec9] via-[#6c5ce7] to-[#fd79a8] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Button Content */}
              <div className="relative flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="text-lg group-hover:animate-bounce" />
                    <span className="text-lg">Send Message</span>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </>
                )}
              </div>
            </button>
          </div>

          {/* Result Message */}
          {result && (
            <div className={`text-center py-4 px-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
              result.success 
                ? "bg-green-500/20 border-green-500/30 text-green-300 shadow-lg shadow-green-500/20" 
                : "bg-red-500/20 border-red-500/30 text-red-300 shadow-lg shadow-red-500/20"
            }`}>
              <div className="flex items-center justify-center gap-2">
                <div className={`w-3 h-3 rounded-full ${result.success ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
                <span className="font-semibold">{result.message}</span>
              </div>
            </div>
          )}
        </form>

        {/* Enhanced Decorative Elements */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-[#fd79a8] to-[#6c5ce7] rounded-full animate-pulse"></div>
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-[#00cec9] to-[#fd79a8] rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 -right-1 w-2 h-2 bg-gradient-to-r from-[#6c5ce7] to-[#00cec9] rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/4 -left-1 w-2 h-2 bg-gradient-to-r from-[#fd79a8] to-[#6c5ce7] rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Loading Animation */}
      <LoadingAnimation isVisible={loading} />
      
      {/* Email Sent Animation */}
      <EmailSentAnimation 
        isVisible={showAnimation} 
        onComplete={handleAnimationComplete} 
      />
    </div>
  );
} 