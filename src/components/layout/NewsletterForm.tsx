'use client';
import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

/**
 * Footer newsletter signup. Captures + validates the email and confirms in the UI.
 * NOTE: it doesn't persist anywhere yet — wire `onSubscribe` to Shopify Email /
 * Klaviyo / Mailchimp to actually store subscribers.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: send `email` to your email provider here.
    setDone(true);
  };

  if (done) {
    return (
      <div className="mt-6 flex items-center gap-3 rounded-2xl border border-saltd-lime/40 bg-saltd-lime/10 px-4 py-3.5">
        <span className="grid place-items-center w-8 h-8 rounded-full bg-saltd-lime text-white shrink-0">
          <Check size={16} />
        </span>
        <p className="font-body text-sm text-white/90">You&apos;re on the list. Watch your inbox.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="mt-6 flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.03] p-2 focus-within:border-saltd-lime transition-colors"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        aria-label="Email address"
        className="flex-1 bg-transparent px-3 py-2.5 text-white placeholder:text-white/40 outline-none text-base min-w-0"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="shrink-0 grid place-items-center w-12 h-11 rounded-xl bg-saltd-lime text-white hover:scale-105 active:scale-95 transition-transform"
      >
        <ArrowRight size={20} />
      </button>
    </form>
  );
}
