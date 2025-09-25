'use client';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqData = [
  {
    question: 'How do I report a lost item?',
    answer: 'Simply click the "Report Lost Item" button on the homepage and fill in the necessary details. We’ll notify you when a potential match is found.',
  },
  {
    question: 'Is it free to use the platform?',
    answer: 'Yes, lost $ Found is completely free for individuals looking to report lost or found items.',
  },
  {
    question: 'How long do reports stay active?',
    answer: 'Reports remain active for 30 days by default. You can extend or close them anytime via your profile dashboard.',
  },
  {
    question: 'Is my contact information visible to others?',
    answer: 'No, we only share your contact details once both parties agree to connect through the platform.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full text-left flex justify-between items-center text-lg font-medium text-gray-800"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
