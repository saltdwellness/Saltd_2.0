import type { Metadata } from 'next';
import { PolicyPage, PolicySection } from '@/components/layout/PolicyPage';

export const metadata: Metadata = { title: 'Shipping Policy · SALTD.' };

export default function ShippingPage() {
  return (
    <PolicyPage
      badge="Legal"
      title="Shipping Policy"
      intro="How orders placed on the SALTD. website are processed and delivered."
      lastUpdated="25 February 2026"
    >
      <PolicySection title="1. Order Confirmation">
        <p>
          Once you place an order, you will receive an order confirmation email acknowledging receipt. This confirmation
          does not signify final acceptance of your order. We reserve the right to cancel or refuse orders due to stock
          issues, pricing errors, or suspected fraud.
        </p>
        <p>
          For Cash on Delivery (COD) orders, additional verification via SMS, call, or email may be required before
          processing.
        </p>
      </PolicySection>

      <PolicySection title="2. Order Processing">
        <p>
          Orders are typically processed within <strong>1–3 business days</strong> (excluding Sundays and public holidays).
          Orders may be dispatched from different warehouses depending on availability. In case of high demand, dispatch
          timelines may extend slightly. All products undergo quality inspection and secure packaging before shipment.
        </p>
      </PolicySection>

      <PolicySection title="3. Shipping & Delivery Timeline">
        <p>Estimated delivery timelines:</p>
        <ul>
          <li>Metro cities: 3–6 business days</li>
          <li>Non-metro / remote areas: 5–8 business days</li>
        </ul>
        <p>
          Delivery timelines are estimates and may vary due to courier partner delays, weather conditions, local
          restrictions, or unforeseen logistical challenges. SALTD. is not liable for delays caused by third-party logistics
          providers.
        </p>
      </PolicySection>

      <PolicySection title="4. Shipping Charges">
        <p>
          Shipping charges (if applicable) will be displayed at checkout before payment. Free shipping thresholds and flat
          shipping fees are shown at the time of purchase.
        </p>
      </PolicySection>

      <PolicySection title="5. Order Tracking">
        <p>
          Once your order is shipped, you will receive tracking details via email and/or SMS. You may also track your order
          via your account dashboard (if registered). Please allow up to 24 hours after dispatch for tracking to become
          active.
        </p>
      </PolicySection>

      <PolicySection title="6. Delivery Attempts">
        <p>
          Our delivery partners will attempt delivery at the address provided. If delivery is unsuccessful due to incorrect
          address, recipient unavailable, or refusal to accept order, the package may be returned to us. Re-shipping charges
          may apply.
        </p>
      </PolicySection>

      <PolicySection title="7. Cash on Delivery (COD)">
        <p>
          For COD orders, additional verification may be required. Excessive refusal of COD orders may result in future COD
          restrictions. We reserve the right to limit COD availability in certain regions.
        </p>
      </PolicySection>

      <PolicySection title="8. International Shipping">
        <p>
          Currently, SALTD. delivers <strong>only within India</strong>. We do not offer international shipping at this
          time.
        </p>
      </PolicySection>

      <PolicySection title="9. Damaged or Tampered Packages">
        <p>
          If you receive a package that appears damaged, opened, or tampered, please do not accept the package. If already
          accepted, contact us within <strong>24 hours of delivery</strong> with your Order ID, clear photos of packaging
          and product, and a description of the issue. We will investigate and resolve as per our Refund &amp; Cancellation
          Policy.
        </p>
      </PolicySection>

      <PolicySection title="10. Incorrect Address">
        <p>
          Customers are responsible for providing accurate shipping details. SALTD. is not responsible for delays or failed
          deliveries due to incorrect or incomplete addresses.
        </p>
      </PolicySection>

      <PolicySection title="11. Contact for Shipping Queries">
        <p>
          <strong>Company Name:</strong> Aurevia Ventures<br />
          <strong>Brand:</strong> SALTD.<br />
          <strong>Email:</strong>{' '}
          <a href="mailto:support@saltd.in" className="text-saltd-black underline underline-offset-4">support@saltd.in</a>
        </p>
        <p>Our support team will respond within standard business hours.</p>
      </PolicySection>
    </PolicyPage>
  );
}
