'use client'
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react'; // install lucide-react

const faqs = [
  {
    question: "How do I know if an item is truly second-hand or new?",
    answer: "Each item comes with a condition label (New, Gently Used, Like New). We clearly mention it in the product details.",
  },
  {
    question: "Are all items quality-checked before listing?",
    answer: "Yes, every item undergoes a thorough inspection to ensure quality, cleanliness, and usability.",
  },
  {
    question: "Can I return a thrifted item if it doesn't fit?",
    answer: "Absolutely! We offer hassle-free returns within 7 days of delivery. Check our Return Policy for more info.",
  },
  {
    question: "How do you price pre-owned clothes fairly?",
    answer: "Prices are based on brand, condition, and demand. Our pricing team ensures it's fair and affordable.",
  },
  {
    question: "What steps do you take to ensure hygiene of thrifted clothes?",
    answer: "All clothing is steam-cleaned and sanitized before listing, so you get clean and ready-to-wear fashion.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className=" max-w-6xl mx-auto py-12 px-4 ">
      <h2 className="text-3xl font-bold mb-8 text-black">Frequently asked questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b pb-4">
            <div
              onClick={() => toggleFAQ(index)}
              className="flex items-start justify-between cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <span className="text-xl font-bold text-gray-700">Q.</span>
                <p className="text-lg font-semibold text-black">{faq.question}</p>
              </div>
              <button className="mt-1">
                {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
              </button>
            </div>
            {openIndex === index && (
              <p className="mt-2 ml-8 text-gray-600 transition-all duration-200">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
