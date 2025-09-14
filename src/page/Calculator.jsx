import { useState } from 'react';
import { Calendar, Clock, Heart } from 'lucide-react';

export default function AgeCalculator() {
  // States
  const [birthDate, setBirthDate] = useState(''); // user input
  const [age, setAge] = useState(null);           // calculated age data
  const [error, setError] = useState('');         // error messages

  // -----------------------------
  // Main Function to Calculate Age
  // -----------------------------
  const calculateAge = () => {
    if (!birthDate) {
      setError('Please select your birth date');
      return;
    }

    const birth = new Date(birthDate);
    const today = new Date();

    if (birth > today) {
      setError('Birth date cannot be in the future');
      return;
    }

    // Basic Age Calculation
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    // Adjust if days are negative
    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    // Adjust if months are negative
    if (months < 0) {
      years--;
      months += 12;
    }

    // Extra Statistics
    const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalHeartbeats = Math.floor(totalMinutes * 70); // Avg 70 bpm

    // Next Birthday Info
    let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysToNextBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

    // Save to state
    setAge({
      years,
      months,
      days,
      totalDays,
      totalHours,
      totalMinutes,
      totalHeartbeats: totalHeartbeats.toLocaleString(),
      daysToNextBirthday,
      nextBirthdayAge: years + 1,
    });

    setError('');
  };

  // Reset function
  const reset = () => {
    setBirthDate('');
    setAge(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="max-w-4xl mx-auto">
        
        {/* ---------------- Header ---------------- */}
        <div className="text-center mb-8 pt-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Calendar className="text-white w-12 h-12" />
            <h1 className="text-5xl font-bold text-white">Age Calculator</h1>
          </div>
          <p className="text-white/80 text-lg">
            Discover your age in years, months, days, and more!
          </p>
        </div>

        {/* ---------------- Input Section ---------------- */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
          <div className="flex flex-col items-center gap-6">

            {/* Date Input */}
            <div className="w-full max-w-md">
              <label className="block text-white text-lg font-medium mb-3">
                Select Your Birth Date
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]} // prevent future dates
                className="w-full px-4 py-3 rounded-xl border-2 border-white/20 
                           bg-white/10 text-white placeholder-white/60 backdrop-blur-sm 
                           focus:border-white/50 focus:outline-none transition-all duration-200"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-200 bg-red-500/20 px-4 py-2 rounded-lg border border-red-300/30">
                {error}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={calculateAge}
                className="px-8 py-3 bg-white text-purple-600 font-semibold 
                           rounded-xl hover:bg-white/90 transform hover:scale-105 
                           transition-all duration-200 shadow-lg"
              >
                Calculate Age
              </button>
              <button
                onClick={reset}
                className="px-8 py-3 bg-white/20 text-white font-semibold 
                           rounded-xl hover:bg-white/30 transition-all duration-200 
                           border border-white/30"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* ---------------- Results Section ---------------- */}
        {age && (
          <div className="space-y-6 animate-fade-in">

            {/* Main Age Display */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Age</h2>
                <div className="flex justify-center items-center gap-8 flex-wrap">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600">{age.years}</div>
                    <div className="text-gray-600">Years</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-pink-600">{age.months}</div>
                    <div className="text-gray-600">Months</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-600">{age.days}</div>
                    <div className="text-gray-600">Days</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fun Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Total Days */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="text-blue-500 w-8 h-8" />
                  <h3 className="text-xl font-semibold text-gray-800">Total Days</h3>
                </div>
                <div className="text-3xl font-bold text-blue-600">{age.totalDays.toLocaleString()}</div>
                <div className="text-gray-600">days on Earth</div>
              </div>

              {/* Total Hours */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="text-green-500 w-8 h-8" />
                  <h3 className="text-xl font-semibold text-gray-800">Total Hours</h3>
                </div>
                <div className="text-3xl font-bold text-green-600">{age.totalHours.toLocaleString()}</div>
                <div className="text-gray-600">hours lived</div>
              </div>

              {/* Heartbeats */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="text-red-500 w-8 h-8" />
                  <h3 className="text-xl font-semibold text-gray-800">Heartbeats</h3>
                </div>
                <div className="text-2xl font-bold text-red-600">{age.totalHeartbeats}</div>
                <div className="text-gray-600">approximate beats</div>
              </div>
            </div>

            {/* Next Birthday */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 
                            rounded-2xl p-6 text-white shadow-lg">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Next Birthday</h3>
                <div className="text-lg">
                  You'll turn{" "}
                  <span className="text-3xl font-bold">{age.nextBirthdayAge}</span> in{" "}
                  <span className="text-3xl font-bold">{age.daysToNextBirthday}</span> days!
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
