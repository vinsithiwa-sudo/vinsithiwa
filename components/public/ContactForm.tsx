"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call since there's no ContactMessage model
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 text-green-800 p-8 rounded-xl text-center border border-green-100">
        <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
        <p>Thank you for reaching out. We will get back to you shortly.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-medium underline text-green-700"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-obsidian">Full Name</label>
          <input 
            id="name"
            required
            className="w-full p-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent transition-shadow"
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-obsidian">Email Address</label>
          <input 
            id="email"
            type="email"
            required
            className="w-full p-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent transition-shadow"
            placeholder="john@example.com"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-obsidian">Subject</label>
        <input 
          id="subject"
          required
          className="w-full p-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent transition-shadow"
          placeholder="How can we help?"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-obsidian">Message</label>
        <textarea 
          id="message"
          required
          rows={5}
          className="w-full p-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent transition-shadow resize-none"
          placeholder="Tell us about your inquiry..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-obsidian text-pearl py-4 rounded-md font-medium hover:bg-obsidian/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-pearl/30 border-t-pearl rounded-full animate-spin" />
        ) : (
          <>
            Send Message <Send size={18} />
          </>
        )}
      </button>
    </form>
  );
}
