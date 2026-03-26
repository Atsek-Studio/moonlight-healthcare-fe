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
    let navigate = useNavigate();
    alert(t("booking.thankYou"));
    // Redirect to home or another page after booking
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
    <div className="pt-24 md:pt-32 pb-20 min-h-screen bg-surface-container-low">
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
          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: `${(step / 4) * 100}%` }}
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
                        "p-6 rounded-2xl border text-left transition-all group",
                        bookingData.service === service.title
                          ? "border-primary bg-primary/5"
                          : "border-slate-100 hover:border-primary/30 hover:bg-slate-50",
                      )}
                    >
                      <span className="material-symbols-outlined text-3xl text-primary mb-4">
                        {service.icon}
                      </span>
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
                    onClick={prevStep}
                    className="p-2 rounded-full hover:bg-slate-100 transition-colors"
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
                        "p-6 rounded-2xl border text-left flex items-center gap-4 transition-all",
                        bookingData.practitioner === practitioner.name
                          ? "border-primary bg-primary/5"
                          : "border-slate-100 hover:border-primary/30 hover:bg-slate-50",
                      )}
                    >
                      <img
                        src={practitioner.avatar}
                        alt={practitioner.name}
                        className="w-16 h-16 rounded-full object-cover"
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
                    onClick={prevStep}
                    className="p-2 rounded-full hover:bg-slate-100 transition-colors"
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
                    <label className="text-xs font-label uppercase tracking-widest text-slate-400">
                      {t("booking.meetingDate")}
                    </label>
                    <input
                      type="date"
                      className="w-full p-4 rounded-xl bg-surface border border-slate-200 outline-none focus:border-primary"
                      onChange={(e) =>
                        setBookingData({ ...bookingData, date: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-label uppercase tracking-widest text-slate-400">
                      {t("booking.timeSlot")}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() =>
                            setBookingData({ ...bookingData, time })
                          }
                          className={cn(
                            "py-3 rounded-lg border text-sm font-medium transition-all",
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
                  className="w-full py-5 bg-primary text-on-primary font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
                    onClick={prevStep}
                    className="p-2 rounded-full hover:bg-slate-100 transition-colors"
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

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder={t("booking.fullName")}
                    className="w-full p-4 rounded-xl bg-surface border border-slate-200 outline-none focus:border-primary"
                    onChange={(e) =>
                      setBookingData({ ...bookingData, name: e.target.value })
                    }
                  />
                  <input
                    type="email"
                    placeholder={t("booking.email")}
                    className="w-full p-4 rounded-xl bg-surface border border-slate-200 outline-none focus:border-primary"
                    onChange={(e) =>
                      setBookingData({ ...bookingData, email: e.target.value })
                    }
                  />
                  <input
                    type="tel"
                    placeholder={t("booking.phoneNumber")}
                    className="w-full p-4 rounded-xl bg-surface border border-slate-200 outline-none focus:border-primary"
                    onChange={(e) =>
                      setBookingData({ ...bookingData, phone: e.target.value })
                    }
                  />
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
                  className="w-full py-5 bg-primary text-on-primary font-bold rounded-xl shadow-lg hover:opacity-95 active:scale-95 transition-all"
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
