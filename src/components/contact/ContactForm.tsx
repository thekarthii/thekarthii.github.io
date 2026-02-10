'use client';

import { useState, FormEvent } from 'react';
import { CircuitNode } from '../ui';
import { cn } from '@/lib/utils';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const inputClasses = cn(
    'w-full bg-slate-900/50 border border-emerald-500/30 rounded-lg px-4 py-3',
    'text-slate-200 placeholder:text-slate-500',
    'focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/50',
    'transition-all duration-300'
  );

  const errorClasses = 'text-red-400 text-sm mt-1';

  return (
    <form onSubmit={handleSubmit} className="relative">
      {/* Circuit decoration */}
      <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent" />
      
      <div className="space-y-6">
        {/* Name & Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <CircuitNode size="sm" className="absolute -left-6 top-3" />
            <label className="block text-emerald-400 text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Your name"
              className={cn(inputClasses, errors.name && 'border-red-400/50')}
              disabled={isSubmitting}
            />
            {errors.name && <p className={errorClasses}>{errors.name}</p>}
          </div>

          <div className="relative">
            <CircuitNode size="sm" className="absolute -left-6 top-3 md:hidden" />
            <label className="block text-emerald-400 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="your.email@example.com"
              className={cn(inputClasses, errors.email && 'border-red-400/50')}
              disabled={isSubmitting}
            />
            {errors.email && <p className={errorClasses}>{errors.email}</p>}
          </div>
        </div>

        {/* Subject */}
        <div className="relative">
          <CircuitNode size="sm" className="absolute -left-6 top-3" />
          <label className="block text-emerald-400 text-sm font-medium mb-2">
            Subject
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            placeholder="What's this about?"
            className={cn(inputClasses, errors.subject && 'border-red-400/50')}
            disabled={isSubmitting}
          />
          {errors.subject && <p className={errorClasses}>{errors.subject}</p>}
        </div>

        {/* Message */}
        <div className="relative">
          <CircuitNode size="sm" className="absolute -left-6 top-3" />
          <label className="block text-emerald-400 text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            placeholder="Tell me about your project or opportunity..."
            rows={5}
            className={cn(inputClasses, 'resize-none', errors.message && 'border-red-400/50')}
            disabled={isSubmitting}
          />
          {errors.message && <p className={errorClasses}>{errors.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="relative">
          <CircuitNode size="md" variant="active" className="absolute -left-7 top-1/2 -translate-y-1/2" />
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              'w-full md:w-auto px-8 py-3 rounded-lg font-medium',
              'bg-emerald-500 text-slate-900',
              'hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'transition-all duration-300',
              'flex items-center justify-center gap-2'
            )}
          >
            {isSubmitting ? (
              <>
                <span className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                Transmitting...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send Message
              </>
            )}
          </button>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400">
            ✓ Message transmitted successfully! I'll get back to you soon.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
            ✗ Transmission failed. Please try again or email me directly.
          </div>
        )}
      </div>
    </form>
  );
}
