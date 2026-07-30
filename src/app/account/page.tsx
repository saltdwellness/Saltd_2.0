'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Package, LogOut, User, Truck } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { TopMarquee } from '@/components/layout/TopMarquee';
import { Footer } from '@/components/layout/Footer';
import { signInCustomer, registerCustomer, signOutCustomer, getCustomer } from '@/app/actions/account';
import { trackOrder } from '@/app/actions/orders';
import type { Customer, TrackedOrder } from '@/lib/account-types';

/* ---------- small shared UI ---------- */
function StatusPill({ label }: { label: string }) {
  const l = label.toUpperCase();
  const tone =
    /PAID|FULFILLED|COMPLETE/.test(l) ? 'bg-saltd-lime/15 text-saltd-lime border-saltd-lime/30'
    : /PENDING|PROGRESS|PARTIAL/.test(l) ? 'bg-saltd-orange/15 text-saltd-orange border-saltd-orange/30'
    : 'bg-saltd-black/[0.06] text-saltd-black/60 border-saltd-black/15';
  return (
    <span className={`text-[11px] font-body font-semibold px-2.5 py-1 rounded-full border ${tone}`}>
      {label.replace(/_/g, ' ')}
    </span>
  );
}

const fmtDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

const inputCls =
  'w-full bg-white border border-saltd-black/15 rounded-xl px-4 py-3 font-body text-saltd-black placeholder:text-saltd-black/30 focus:border-saltd-black focus:outline-none transition-colors';
const labelCls = 'font-body text-saltd-black/50 text-xs font-semibold tracking-widest uppercase mb-1.5 block';
const primaryBtn =
  'w-full bg-saltd-black text-white font-body font-semibold py-3.5 rounded-full hover:bg-saltd-purple transition-colors disabled:opacity-60';

/* ---------- page ---------- */
export default function AccountPage() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [mainTab, setMainTab] = useState<'track' | 'auth'>('track');
  const [authTab, setAuthTab] = useState<'signin' | 'register'>('signin');

  const refreshSession = () => getCustomer().then(setCustomer);

  useEffect(() => {
    getCustomer()
      .then(setCustomer)
      .finally(() => setLoadingSession(false));
  }, []);

  return (
    <>
      <TopMarquee />
      <Navbar />

      <div className="min-h-screen bg-saltd-cream" style={{ paddingTop: 'calc(var(--marquee-h) + 72px)' }}>
        {/* Header band */}
        <div className="bg-saltd-black py-14 px-6 lg:px-16">
          <h1 className="font-display text-section text-white">
            {customer ? 'Your account' : 'Account'}<span className="text-saltd-lime">.</span>
          </h1>
          <p className="font-body text-white/50 mt-2">
            {customer ? customer.email : 'Track an order, or sign in to see your history.'}
          </p>
        </div>

        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
          {loadingSession ? (
            <div className="py-24 text-center font-body text-saltd-black/40">Loading…</div>
          ) : customer ? (
            <Dashboard customer={customer} onSignOut={async () => { await signOutCustomer(); setCustomer(null); }} />
          ) : (
            <>
              {/* Top-level tabs */}
              <div className="flex justify-center mb-8">
                <div className="inline-flex bg-white rounded-full p-1 border border-saltd-black/10">
                  <TabButton active={mainTab === 'track'} onClick={() => setMainTab('track')}>Track order</TabButton>
                  <TabButton active={mainTab === 'auth'} onClick={() => setMainTab('auth')}>Sign in / Register</TabButton>
                </div>
              </div>

              <motion.div
                key={mainTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm"
              >
                {mainTab === 'track' ? (
                  <TrackOrderForm />
                ) : (
                  <>
                    <div className="flex mb-6 border-b border-saltd-black/10">
                      <SubTab active={authTab === 'signin'} onClick={() => setAuthTab('signin')}>Sign in</SubTab>
                      <SubTab active={authTab === 'register'} onClick={() => setAuthTab('register')}>Register</SubTab>
                    </div>
                    {authTab === 'signin'
                      ? <SignInForm onSuccess={refreshSession} />
                      : <RegisterForm onSuccess={refreshSession} />}
                  </>
                )}
              </motion.div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

/* ---------- tabs ---------- */
function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`font-body font-semibold text-sm px-5 py-2.5 rounded-full transition-colors ${
        active ? 'bg-saltd-black text-white' : 'text-saltd-black/60 hover:text-saltd-black'
      }`}
    >
      {children}
    </button>
  );
}
function SubTab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`font-body font-semibold text-sm px-4 pb-3 -mb-px border-b-2 transition-colors ${
        active ? 'border-saltd-lime text-saltd-black' : 'border-transparent text-saltd-black/40 hover:text-saltd-black/70'
      }`}
    >
      {children}
    </button>
  );
}

/* ---------- track order ---------- */
function TrackOrderForm() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TrackedOrder | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); setResult(null); setPending(true);
    const res = await trackOrder(orderId, email);
    setPending(false);
    if (res.ok) setResult(res.order);
    else setError(res.error);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Truck size={18} className="text-saltd-lime" />
        <h2 className="font-display text-2xl text-saltd-black">Track your order</h2>
      </div>
      <p className="font-body text-saltd-black/50 text-sm mb-6">
        No account needed. Enter your order ID and the email you used to order.
      </p>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className={labelCls}>Order ID</label>
          <input className={inputCls} value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="#1001" required />
        </div>
        <div>
          <label className={labelCls}>Email address</label>
          <input className={inputCls} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
        </div>
        {error && <p className="font-body text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={pending} className={primaryBtn}>
          {pending ? 'Finding…' : 'Find my order'}
        </button>
      </form>

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 border-t border-saltd-black/10 pt-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl text-saltd-black">{result.number}</span>
            <span className="font-body text-saltd-black/50 text-sm">{fmtDate(result.processedAt)}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <StatusPill label={result.financialStatus} />
            <StatusPill label={result.fulfillmentStatus} />
          </div>

          {/* Line items */}
          {result.lineItems.length > 0 && (
            <div className="mt-5 rounded-2xl bg-saltd-cream/70 border border-saltd-black/[0.06] divide-y divide-saltd-black/[0.06]">
              {result.lineItems.map((li, i) => (
                <div key={i} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="font-body text-sm font-semibold text-saltd-black/80 tabular-nums mt-0.5">{li.quantity}×</span>
                    <div className="min-w-0">
                      <p className="font-body text-sm font-semibold text-saltd-black truncate">{li.title}</p>
                      {li.variant && <p className="font-body text-xs text-saltd-black/50">{li.variant}</p>}
                    </div>
                  </div>
                  <span className="font-body text-sm text-saltd-black whitespace-nowrap">{li.total}</span>
                </div>
              ))}
            </div>
          )}

          {/* Price breakdown */}
          <div className="mt-4 space-y-1.5 font-body text-sm">
            <div className="flex justify-between text-saltd-black/60"><span>Subtotal</span><span>{result.subtotal}</span></div>
            <div className="flex justify-between text-saltd-black/60"><span>Shipping</span><span>{result.shipping}</span></div>
            <div className="flex justify-between font-semibold text-saltd-black pt-1.5 border-t border-saltd-black/10"><span>Total</span><span>{result.total}</span></div>
          </div>

          {/* Shipping address */}
          {result.shippingAddress && (
            <div className="mt-5">
              <p className="font-body text-saltd-black/40 text-xs font-semibold tracking-widest uppercase mb-1.5">Shipping to</p>
              <p className="font-body text-sm text-saltd-black/70 leading-relaxed">
                {[result.shippingAddress.name].filter(Boolean).join('')}
                {result.shippingAddress.name && <br />}
                {[result.shippingAddress.address1, result.shippingAddress.address2].filter(Boolean).join(', ')}
                {(result.shippingAddress.address1 || result.shippingAddress.address2) && <br />}
                {[result.shippingAddress.city, result.shippingAddress.province, result.shippingAddress.zip].filter(Boolean).join(', ')}
                {result.shippingAddress.country && <>, {result.shippingAddress.country}</>}
              </p>
            </div>
          )}

          {/* Tracking */}
          {result.tracking.length > 0 && (
            <div className="mt-5">
              <p className="font-body text-saltd-black/40 text-xs font-semibold tracking-widest uppercase mb-1.5">Tracking</p>
              <div className="space-y-2">
                {result.tracking.map((t, i) => (
                  <div key={i} className="flex items-center gap-2 font-body text-sm">
                    <Package size={15} className="text-saltd-black/50" />
                    <span className="text-saltd-black/70">{t.company || 'Tracking'}: {t.number || '—'}</span>
                    {t.url && <a href={t.url} target="_blank" rel="noopener noreferrer" className="text-saltd-lime font-semibold underline underline-offset-2">Track →</a>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

/* ---------- sign in ---------- */
function SignInForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); setPending(true);
    const res = await signInCustomer(email, password);
    if (res.ok) { onSuccess(); return; }
    setError(res.error); setPending(false);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className={labelCls}>Email</label>
        <input className={inputCls} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
      </div>
      <div>
        <label className={labelCls}>Password</label>
        <input className={inputCls} type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
      </div>
      {error && <p className="font-body text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={pending} className={primaryBtn}>{pending ? 'Signing in…' : 'Sign in'}</button>
      <p className="font-body text-xs text-saltd-black/40 text-center pt-1">
        Accounts give you order history and faster checkout.
      </p>
    </form>
  );
}

/* ---------- register ---------- */
function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); setPending(true);
    const res = await registerCustomer({ firstName, lastName, email, password });
    if (res.ok) { onSuccess(); return; }
    setError(res.error); setPending(false);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>First name</label>
          <input className={inputCls} autoComplete="given-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" />
        </div>
        <div>
          <label className={labelCls}>Last name</label>
          <input className={inputCls} autoComplete="family-name" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" />
        </div>
      </div>
      <div>
        <label className={labelCls}>Email</label>
        <input className={inputCls} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
      </div>
      <div>
        <label className={labelCls}>Password</label>
        <input className={inputCls} type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" minLength={8} required />
      </div>
      {error && <p className="font-body text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={pending} className={primaryBtn}>{pending ? 'Creating…' : 'Create account'}</button>
    </form>
  );
}

/* ---------- signed-in dashboard ---------- */
function Dashboard({ customer, onSignOut }: { customer: Customer; onSignOut: () => void }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-saltd-black text-white flex items-center justify-center">
            <User size={20} />
          </div>
          <div>
            <p className="font-display text-xl text-saltd-black leading-none">
              {customer.firstName ? `Hi, ${customer.firstName}` : 'Welcome back'}
            </p>
            <p className="font-body text-sm text-saltd-black/50 mt-1">{customer.email}</p>
          </div>
        </div>
        <button onClick={onSignOut} className="inline-flex items-center gap-1.5 font-body text-sm text-saltd-black/50 hover:text-saltd-black transition-colors">
          <LogOut size={15} /> Sign out
        </button>
      </div>

      <h2 className="font-display text-2xl text-saltd-black mb-4">Order history</h2>
      {customer.orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center shadow-sm">
          <Package size={40} className="text-saltd-black/15 mx-auto mb-4" />
          <p className="font-body text-saltd-black/50">No orders yet.</p>
          <Link href="/shop" className="inline-block mt-5 bg-saltd-lime text-white font-body font-semibold px-7 py-3 rounded-full hover:scale-105 transition-transform">
            Shop flavours →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {customer.orders.map((o) => (
            <div key={o.number} className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <span className="font-display text-lg text-saltd-black">{o.number}</span>
                  <span className="font-body text-xs text-saltd-black/40">{fmtDate(o.processedAt)}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <StatusPill label={o.financialStatus} />
                  <StatusPill label={o.fulfillmentStatus} />
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-display text-xl text-saltd-black">{o.total}</p>
                <p className="font-body text-xs text-saltd-black/40">{o.itemCount} item{o.itemCount !== 1 ? 's' : ''}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
