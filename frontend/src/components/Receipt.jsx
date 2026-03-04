import { forwardRef } from "react";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/utils";

/**
 * ==========================================================
 * LUXURY BOOKING RECEIPT COMPONENT
 * ==========================================================
 *
 * A beautifully styled receipt component for Kabsat La Union.
 * Designed to be rendered on screen and converted to PDF.
 *
 * USAGE:
 * ------
 * <Receipt
 *   ref={receiptRef}
 *   guestName="John Doe"
 *   guestEmail="john@example.com"
 *   bookingReference="KBST-2026-00001"
 *   processingId="TXN-ABC123XYZ"
 *   roomDetails={{
 *     name: "Ocean Breeze Standard",
 *     category: "standard",
 *     checkIn: "2026-02-15",
 *     checkOut: "2026-02-18",
 *     nights: 3,
 *     guests: { adults: 2, children: 1 },
 *     pricePerNight: 75000,
 *     totalAmount: 225000
 *   }}
 *   paymentStatus="confirmed"
 *   confirmedAt={new Date()}
 * />
 *
 * PROPS:
 * ------
 * @param {string} guestName - Full name of the guest
 * @param {string} guestEmail - Email address
 * @param {string} guestEmail - Email address
 * @param {string} bookingReference - Unique booking reference (e.g., KBST-2026-00001)
 * @param {string} processingId - Payment processing ID
 * @param {Object} roomDetails - Room and pricing information
 * @param {string} paymentStatus - Payment status (confirmed, pending, etc.)
 * @param {Date} confirmedAt - Date of confirmation
 *
 * ==========================================================
 */

export const Receipt = forwardRef(function Receipt(
  {
    guestName,
    guestEmail,
    bookingReference,
    processingId,
    roomDetails,
    paymentStatus = "confirmed",
    confirmedAt,
  },
  ref,
) {
  const {
    name: roomName,
    category,
    checkIn,
    checkOut,
    nights,
    guests,
    pricePerNight,
    totalAmount,
  } = roomDetails || {};

  const confirmationDate = confirmedAt
    ? format(new Date(confirmedAt), "MMMM d, yyyy 'at' h:mm a")
    : format(new Date(), "MMMM d, yyyy 'at' h:mm a");

  return (
    <div
      ref={ref}
      className="bg-white p-8 max-w-2xl mx-auto"
      style={{
        fontFamily: "'DM Serif Display', 'Georgia', serif",
        minWidth: "600px",
      }}
    >
      {/* Receipt Container with Border */}
      <div className="border-2 border-[#85c4d7] p-8">
        {/* Header */}
        <header className="text-center border-b-2 border-[#85c4d7] pb-6 mb-8">
          {/* Logo / Brand */}
          <div className="flex justify-center mb-2">
            <img
              src="/logo.png"
              alt="Kabsat La Union"
              className="h-12 w-auto"
            />
          </div>
          <h1
            className="text-3xl tracking-[0.2em] text-[#0f3d4a] mb-2"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            KABSAT LA UNION
          </h1>
          <p
            className="text-xs tracking-[0.3em] text-[#3188a3] uppercase"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Surf & Beach Resort • La Union, Philippines
          </p>
          <p
            className="text-xs text-[#3188a3] mt-1"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            kabsatlaunion.com
          </p>

          {/* Confirmation Title */}
          <div className="mt-6">
            <h2
              className="text-xl text-[#0f3d4a] mb-1"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Booking Confirmation
            </h2>
            <p
              className="text-sm text-[#4da3be]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Thank you for your reservation
            </p>
          </div>
        </header>

        {/* Booking Reference Section */}
        <section className="bg-[#f0f7f9] p-6 rounded-md mb-8 text-center">
          <p
            className="text-xs uppercase tracking-[0.2em] text-[#3188a3] mb-2"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Confirmation Number
          </p>
          <p
            className="text-2xl font-bold text-[#0f3d4a] tracking-wider"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {bookingReference || "KBST-0000-00000"}
          </p>
          {processingId && (
            <p
              className="text-xs text-[#3188a3] mt-2"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Processing ID: {processingId}
            </p>
          )}
        </section>

        {/* Guest Information */}
        <section className="mb-8">
          <h3
            className="text-sm uppercase tracking-[0.15em] text-[#3188a3] mb-4 border-b border-[#d9eef3] pb-2"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Guest Information
          </h3>
          <div
            className="grid grid-cols-2 gap-4 text-sm"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <div>
              <p className="text-[#3188a3] text-xs uppercase tracking-wider mb-1">
                Name
              </p>
              <p className="text-[#0f3d4a] font-medium">{guestName}</p>
            </div>
            <div>
              <p className="text-[#3188a3] text-xs uppercase tracking-wider mb-1">
                Email
              </p>
              <p className="text-[#0f3d4a]">{guestEmail}</p>
            </div>
            <div>
              <p className="text-[#3188a3] text-xs uppercase tracking-wider mb-1">
                Confirmation Date
              </p>
              <p className="text-[#0f3d4a]">{confirmationDate}</p>
            </div>
          </div>
        </section>

        {/* Reservation Details */}
        <section className="mb-8">
          <h3
            className="text-sm uppercase tracking-[0.15em] text-[#3188a3] mb-4 border-b border-[#d9eef3] pb-2"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Reservation Details
          </h3>

          {/* Room Name */}
          <div className="mb-4">
            <p
              className="text-xl text-[#0f3d4a]"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {roomName || "Ocean View Room"}
            </p>
            <p
              className="text-xs tracking-wider text-[#3188a3] capitalize"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {category || "Standard"}
            </p>
          </div>

          {/* Dates Grid */}
          <div
            className="grid grid-cols-3 gap-4 mb-6"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <div className="bg-[#f0f7f9] p-4 rounded text-center">
              <p className="text-xs uppercase tracking-wider text-[#3188a3] mb-1">
                Check-in
              </p>
              <p className="text-[#0f3d4a] font-medium">
                {checkIn ? format(new Date(checkIn), "MMM d, yyyy") : "—"}
              </p>
              <p className="text-xs text-[#3188a3]">From 3:00 PM</p>
            </div>
            <div className="bg-[#f0f7f9] p-4 rounded text-center">
              <p className="text-xs uppercase tracking-wider text-[#3188a3] mb-1">
                Check-out
              </p>
              <p className="text-[#0f3d4a] font-medium">
                {checkOut ? format(new Date(checkOut), "MMM d, yyyy") : "—"}
              </p>
              <p className="text-xs text-[#3188a3]">Until 12:00 PM</p>
            </div>
            <div className="bg-[#f0f7f9] p-4 rounded text-center">
              <p className="text-xs uppercase tracking-wider text-[#3188a3] mb-1">
                Duration
              </p>
              <p className="text-[#0f3d4a] font-medium">
                {nights || 0} Night{nights !== 1 ? "s" : ""}
              </p>
              <p className="text-xs text-[#3188a3]">
                {guests?.adults || 0} Adult{guests?.adults !== 1 ? "s" : ""}
                {guests?.children > 0 &&
                  `, ${guests.children} Child${guests.children !== 1 ? "ren" : ""}`}
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Table */}
        <section className="mb-8">
          <h3
            className="text-sm uppercase tracking-[0.15em] text-[#3188a3] mb-4 border-b border-[#d9eef3] pb-2"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Payment Summary
          </h3>

          <table
            className="w-full text-sm"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <tbody>
              <tr className="border-b border-[#d9eef3]">
                <td className="py-3 text-[#4da3be]">
                  {roomName || "Room"} × {nights || 0} night
                  {nights !== 1 ? "s" : ""}
                </td>
                <td className="py-3 text-right text-[#0f3d4a]">
                  {formatCurrency(pricePerNight || 0)} × {nights || 0}
                </td>
              </tr>
              <tr className="border-b border-[#d9eef3]">
                <td className="py-3 text-[#4da3be]">Subtotal</td>
                <td className="py-3 text-right text-[#0f3d4a]">
                  {formatCurrency(totalAmount || 0)}
                </td>
              </tr>
              <tr className="border-b-2 border-[#85c4d7]">
                <td className="py-3 text-[#4da3be]">Taxes & Fees</td>
                <td className="py-3 text-right text-[#0f3d4a]">Included</td>
              </tr>
              <tr>
                <td className="py-4 text-[#0f3d4a] font-semibold text-base">
                  Total Amount
                </td>
                <td className="py-4 text-right text-[#0f3d4a] font-bold text-lg">
                  {formatCurrency(totalAmount || 0)}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Payment Status Badge */}
          <div className="flex items-center justify-end mt-4">
            <span
              className={`
                inline-flex items-center px-3 py-1 rounded-full text-xs uppercase tracking-wider font-medium
                ${
                  paymentStatus === "confirmed"
                    ? "bg-green-100 text-green-800"
                    : paymentStatus === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                }
              `}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {paymentStatus === "confirmed" ? "✓ " : ""}
              {paymentStatus || "Pending"}
            </span>
          </div>
        </section>

        {/* Important Information */}
        <section className="bg-[#f0f7f9] p-5 rounded-md mb-8">
          <h3
            className="text-sm uppercase tracking-[0.15em] text-[#3188a3] mb-3"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Important Information
          </h3>
          <ul
            className="text-xs text-[#4da3be] space-y-2"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <li>
              • Check-in time is 3:00 PM. Early check-in subject to
              availability.
            </li>
            <li>
              • Check-out time is 12:00 PM. Late check-out may incur additional
              charges.
            </li>
            <li>• Please present this confirmation upon arrival.</li>
            <li>• Cancellation policy applies as per booking terms.</li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="border-t-2 border-[#85c4d7] pt-6 text-center">
          <p
            className="text-sm text-[#0f3d4a] mb-1"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            We look forward to welcoming you
          </p>
          <p
            className="text-xs text-[#3188a3] mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            For any inquiries, please contact our reservations team
          </p>

          <div
            className="text-xs text-[#3188a3] space-y-1"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <p>
              <strong>Email:</strong> reservations@kabsatlaunion.com
            </p>
            <p>
              <strong>Website:</strong> kabsatlaunion.com
            </p>
            <p>
              <strong>Address:</strong> San Juan, La Union, San Juan,
              Philippines, 2514
            </p>
          </div>

          <p
            className="text-[10px] text-[#85c4d7] mt-6"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            © {new Date().getFullYear()} Kabsat La Union. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
});

export default Receipt;
