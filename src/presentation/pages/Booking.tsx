import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  CheckCircle,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useAllServices } from "../hooks/useServices";
import { useAllPractitioners } from "../hooks/usePractitioners";
import { useNavigate } from "react-router-dom";

export default function Booking() {
  const services = useAllServices();
  const practitioners = useAllPractitioners();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    service: "",
    practitioner: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  function onsubmit(): void {
    alert(t("booking.thankYou"));
    navigate("/");
  }

  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  return (
    <div data-page="booking" className="pt-10 md:pt-16 pb-20 min-h-screen bg-surface-container-low">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Progress Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-headline text-3xl text-primary">
              {t("booking.title")}
            </h1>
            <span className="text-xs font-label text-slate-400 uppercase tracking-widest">
              {t("booking.step", { current: step, total: 4 })}
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-200 overflow-hidden" aria-hidden="true">
            <motion.div
              className="h-full bg-primary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: step / 4 }}
              style={{ transformOrigin: "left center" }}
            />
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-3xl p-8 md:p-12 border border-slate-100 shadow-xl">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-headline text-primary mb-2">
                    {t("booking.chooseService")}
                  </h2>
                  <p className="text-slate-500 text-sm">
                    {t("booking.chooseServiceDesc")}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => {
                        setBookingData({
                          ...bookingData,
                          service: service.title,
                        });
                        nextStep();
                      }}
                      className={cn(
                        "p-6 rounded-2xl border text-left transition-colors group",
                        bookingData.service === service.title
                          ? "border-primary bg-primary/5"
                          : "border-slate-100 hover:border-primary/30 hover:bg-slate-50",
                      )}
                    >
                      <CalendarIcon className="mb-4 h-6 w-6 text-primary" aria-hidden="true" />
                      <h3 className="font-headline text-xl text-primary mb-2">
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {service.description}
                      </p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
                    aria-label={t("booking.back")}
                  >
                    <ArrowLeft className="w-5 h-5 text-slate-400" />
                  </button>
                  <div>
                    <h2 className="text-2xl font-headline text-primary mb-2">
                      {t("booking.chooseExpert")}
                    </h2>
                    <p className="text-slate-500 text-sm">
                      {t("booking.chooseExpertDesc")}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {practitioners.map((practitioner) => (
                    <button
                      key={practitioner.id}
                      onClick={() => {
                        setBookingData({
                          ...bookingData,
                          practitioner: practitioner.name,
                        });
                        nextStep();
                      }}
                      className={cn(
                        "p-6 rounded-2xl border text-left flex items-center gap-4 transition-colors",
                        bookingData.practitioner === practitioner.name
                          ? "border-primary bg-primary/5"
                          : "border-slate-100 hover:border-primary/30 hover:bg-slate-50",
                      )}
                    >
                      <img
                        src={practitioner.avatar}
                        alt={practitioner.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-headline text-lg text-primary">
                          {practitioner.name}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {practitioner.role}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
                    aria-label={t("booking.back")}
                  >
                    <ArrowLeft className="w-5 h-5 text-slate-400" />
                  </button>
                  <div>
                    <h2 className="text-2xl font-headline text-primary mb-2">
                      {t("booking.meetingTime")}
                    </h2>
                    <p className="text-slate-500 text-sm">
                      {t("booking.meetingTimeDesc")}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <label htmlFor="booking-date" className="text-sm font-semibold text-slate-500">
                      {t("booking.meetingDate")}
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      className="w-full min-h-12 p-4 rounded-xl bg-surface border border-slate-200 outline-2 outline-transparent focus-visible:outline-focus"
                      onChange={(e) =>
                        setBookingData({ ...bookingData, date: e.target.value })
                      }
                    />
                    <p className="min-h-[1lh] text-xs text-slate-500" aria-live="polite" />
                  </div>
                  <div className="space-y-4">
                    <span className="text-sm font-semibold text-slate-500">
                      {t("booking.timeSlot")}
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          type="button"
                          key={time}
                          onClick={() =>
                            setBookingData({ ...bookingData, time })
                          }
                          className={cn(
                            "py-3 rounded-lg border text-sm font-medium transition-colors",
                            bookingData.time === time
                              ? "bg-primary text-on-primary border-primary"
                              : "border-slate-100 hover:border-primary/30",
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  disabled={!bookingData.date || !bookingData.time}
                  onClick={nextStep}
                  className="action-primary w-full"
                >
                  {t("booking.continue")}
                </button>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
                    aria-label={t("booking.back")}
                  >
                    <ArrowLeft className="w-5 h-5 text-slate-400" />
                  </button>
                  <div>
                    <h2 className="text-2xl font-headline text-primary mb-2">
                      {t("booking.contactInfo")}
                    </h2>
                    <p className="text-slate-500 text-sm">
                      {t("booking.contactInfoDesc")}
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <label className="grid gap-2 text-sm font-semibold text-slate-500">
                    {t("booking.fullName")}
                    <input
                    type="text"
                    autoComplete="name"
                    className="w-full min-h-12 p-4 rounded-xl bg-surface border border-slate-200 outline-2 outline-transparent focus-visible:outline-focus"
                    onChange={(e) =>
                      setBookingData({ ...bookingData, name: e.target.value })
                    }
                  />
                    <span className="min-h-[1lh] text-xs font-normal" aria-live="polite" />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-slate-500">
                    {t("booking.email")}
                    <input
                    type="email"
                    autoComplete="email"
                    className="w-full min-h-12 p-4 rounded-xl bg-surface border border-slate-200 outline-2 outline-transparent focus-visible:outline-focus"
                    onChange={(e) =>
                      setBookingData({ ...bookingData, email: e.target.value })
                    }
                  />
                    <span className="min-h-[1lh] text-xs font-normal" aria-live="polite" />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-slate-500">
                    {t("booking.phoneNumber")}
                    <input
                    type="tel"
                    autoComplete="tel"
                    className="w-full min-h-12 p-4 rounded-xl bg-surface border border-slate-200 outline-2 outline-transparent focus-visible:outline-focus"
                    onChange={(e) =>
                      setBookingData({ ...bookingData, phone: e.target.value })
                    }
                  />
                    <span className="min-h-[1lh] text-xs font-normal" aria-live="polite" />
                  </label>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> {t("booking.summary")}
                  </h4>
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <span className="text-slate-500">
                      {t("booking.service")}
                    </span>
                    <span className="font-medium text-primary text-right">
                      {bookingData.service}
                    </span>
                    <span className="text-slate-500">
                      {t("booking.expert")}
                    </span>
                    <span className="font-medium text-primary text-right">
                      {bookingData.practitioner}
                    </span>
                    <span className="text-slate-500">{t("booking.time")}</span>
                    <span className="font-medium text-primary text-right">
                      {bookingData.time}, {bookingData.date}
                    </span>
                  </div>
                </div>

                <button
                  disabled={!bookingData.name || !bookingData.email || !bookingData.phone}
                  className="action-primary w-full"
                  onClick={() => onsubmit()}
                >
                  {t("booking.confirmBooking")}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
