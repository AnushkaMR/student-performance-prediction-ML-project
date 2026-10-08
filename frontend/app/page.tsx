"use client";

import { useState } from "react";

export default function Home() {
  const [studytime, setStudytime] = useState("");
  const [failures, setFailures] = useState("");
  const [absences, setAbsences] = useState("");
  const [G1, setG1] = useState("");
  const [G2, setG2] = useState("");
  const [age, setAge] = useState("");
  const [Medu, setMedu] = useState("");
  const [Fedu, setFedu] = useState("");
  const [traveltime, setTraveltime] = useState("");
  const [freetime, setFreetime] = useState("");
  const [goout, setGoout] = useState("");
  const [health, setHealth] = useState("");

  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studytime: Number(studytime),
          failures: Number(failures),
          absences: Number(absences),
          G1: Number(G1),
          G2: Number(G2),
          age: Number(age),
          Medu: Number(Medu),
          Fedu: Number(Fedu),
          traveltime: Number(traveltime),
          freetime: Number(freetime),
          goout: Number(goout),
          health: Number(health),
        }),
      });

      if (!response.ok) {
        throw new Error("Prediction request failed");
      }

      const data = await response.json();

      setPrediction(data.predicted_grade);
    } catch (error) {
      console.error("Prediction error:", error);
      setError(
        "Could not connect to the prediction server. Make sure FastAPI is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black">

      {/* Navbar */}
      <nav className="border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">
              StudentPredict
            </span>
          </div>

          <div className="flex gap-6 text-sm text-black">
            <a href="#" className="hover:text-blue-500">
              Home
            </a>

            <a href="#" className="hover:text-blue-500">
              History
            </a>

            <a href="#" className="hover:text-blue-500">
              About
            </a>
          </div>

        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-16 text-center">

        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          Student Performance
          <span className="block text-blue-500">
            Predictor
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
          Predict academic performance using student learning
          and academic information.
        </p>

      </section>

      {/* Main Content */}
      <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-20 lg:grid-cols-3">

        {/* Form */}
        <div className="rounded-2xl border border-slate-800 bg-blue-500 p-8 lg:col-span-2">

          <div className="mb-8">
            <h2 className="text-2xl font-semibold">
              Student Information
            </h2>

            <p className="mt-2 text-sm text-white">
              Enter the student's information below.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid gap-6 md:grid-cols-2"
          >

            {/* Study Time */}
            <div>
              <label className="mb-2 block text-white text-sm font-medium">
                Study Time
              </label>

              <input
                type="number"
                min="1"
                max="4"
                value={studytime}
                onChange={(e) => setStudytime(e.target.value)}
                placeholder="1 - 4"
                required
                className="w-full rounded-lg border border-slate-700 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
              />

              <p className="mt-1 text-xs text-white">
                1 = Low, 4 = Very High
              </p>
            </div>

            {/* Failed Courses */}
            <div>
              <label className="mb-2 block text-white text-sm font-medium">
                Failed Courses
              </label>

              <input
                type="number"
                min="0"
                max="4"
                value={failures}
                onChange={(e) => setFailures(e.target.value)}
                placeholder="e.g. 0"
                required
                className="w-full rounded-lg border border-slate-700 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            {/* Absences */}
            <div>
              <label className="mb-2 block text-white text-sm font-medium">
                Absences
              </label>

              <input
                type="number"
                min="0"
                value={absences}
                onChange={(e) => setAbsences(e.target.value)}
                placeholder="e.g. 4"
                required
                className="w-full rounded-lg border border-slate-700 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            {/* G1 */}
            <div>
              <label className="mb-2 block text-white text-sm font-medium">
                First Period Grade (G1)
              </label>

              <input
                type="number"
                min="0"
                max="20"
                value={G1}
                onChange={(e) => setG1(e.target.value)}
                placeholder="0 - 20"
                required
                className="w-full rounded-lg border border-slate-700 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            {/* G2 */}
            <div>
              <label className="mb-2 block text-white text-sm font-medium">
                Second Period Grade (G2)
              </label>

              <input
                type="number"
                min="0"
                max="20"
                value={G2}
                onChange={(e) => setG2(e.target.value)}
                placeholder="0 - 20"
                required
                className="w-full rounded-lg border border-slate-700 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            {/* Age */}
            <div>
              <label className="mb-2 block text-white text-sm font-medium">
                Age
              </label>

              <input
                type="number"
                min="15"
                max="25"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 16"
                required
                className="w-full rounded-lg border border-slate-700 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            {/* Mother's Education */}
            <div>
              <label className="mb-2 block text-white text-sm font-medium">
                Mother's Education
              </label>

              <input
                type="number"
                min="0"
                max="4"
                value={Medu}
                onChange={(e) => setMedu(e.target.value)}
                placeholder="0 - 4"
                required
                className="w-full rounded-lg border border-slate-700 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
              />

              <p className="mt-1 text-xs text-white">
                0 = None, 4 = Higher Education
              </p>
            </div>

            {/* Father's Education */}
            <div>
              <label className="mb-2 block text-white text-sm font-medium">
                Father's Education
              </label>

              <input
                type="number"
                min="0"
                max="4"
                value={Fedu}
                onChange={(e) => setFedu(e.target.value)}
                placeholder="0 - 4"
                required
                className="w-full rounded-lg border border-slate-700 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
              />

              <p className="mt-1 text-xs text-white">
                0 = None, 4 = Higher Education
              </p>
            </div>

            {/* Travel Time */}
            <div>
              <label className="mb-2 block text-white text-sm font-medium">
                Travel Time to School
              </label>

              <input
                type="number"
                min="1"
                max="4"
                value={traveltime}
                onChange={(e) => setTraveltime(e.target.value)}
                placeholder="1 - 4"
                required
                className="w-full rounded-lg border border-slate-700 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            {/* Free Time */}
            <div>
              <label className="mb-2 block text-white text-sm font-medium">
                Free Time
              </label>

              <input
                type="number"
                min="1"
                max="5"
                value={freetime}
                onChange={(e) => setFreetime(e.target.value)}
                placeholder="1 - 5"
                required
                className="w-full rounded-lg border border-slate-700 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            {/* Going Out */}
            <div>
              <label className="mb-2 block text-white text-sm font-medium">
                Going Out Frequency
              </label>

              <input
                type="number"
                min="1"
                max="5"
                value={goout}
                onChange={(e) => setGoout(e.target.value)}
                placeholder="1 - 5"
                required
                className="w-full rounded-lg border border-slate-700 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            {/* Health */}
            <div>
              <label className="mb-2 block text-white text-sm font-medium">
                Health
              </label>

              <input
                type="number"
                min="1"
                max="5"
                value={health}
                onChange={(e) => setHealth(e.target.value)}
                placeholder="1 - 5"
                required
                className="w-full rounded-lg border border-slate-700 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="md:col-span-2 rounded-lg bg-red-500/20 p-4 text-sm text-red-100">
                {error}
              </div>
            )}

            {/* Button */}
            <div className="md:col-span-2">

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Predicting..." : "Predict Performance"}
              </button>

            </div>

          </form>

        </div>

        {/* Result */}
        <div className="rounded-2xl border border-slate-800 bg-blue-600 p-8">

          <h2 className="text-2xl font-semibold">
            Prediction
          </h2>

          {prediction === null ? (

            <div className="flex min-h-[300px] items-center justify-center text-center">

              <div>

                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-900 text-2xl">
                  ?
                </div>

                <p className="text-white text-sm">
                  Enter student information and click
                  <span className="text-white">
                    {" "}Predict Performance
                  </span>
                </p>

              </div>

            </div>

          ) : (

            <div className="mt-10 text-center">

              <p className="text-sm text-slate-400">
                Predicted Final Grade
              </p>

              <div className="mt-3 text-6xl font-bold text-white">
                {prediction.toFixed(2)}
              </div>

              <p className="mt-2 text-slate-400">
                out of 20
              </p>

              <div className="mt-8 rounded-xl border border-green-500/20 bg-green-500/10 p-5">

                <p className="text-sm text-slate-400">
                  Prediction Status
                </p>

                <p className="mt-2 text-2xl font-bold text-green-400">
                  SUCCESS
                </p>

              </div>

            </div>

          )}

        </div>

      </section>

    </main>
  );
}