"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Send, Globe, CheckCircle2, Facebook, Twitter, User, Phone } from 'lucide-react';

const SHEETDB_URL = 'https://sheetdb.io/api/v1/lgl0ouhiwmjp2';

const TRANSLATIONS = {
  en: {
    welcome: "Welcome to Libra Automobiles Feedback Section",
    subWelcome: "We value your feedback. It helps us improve and serve you better.",
    langLabel: "Select Language",
    continue: "Continue",
    identTitle: "Tell us who you are",
    identSub: "Please provide your details to start the survey.",
    nameLabel: "Your Full Name",
    phoneLabel: "Your Mobile Number",
    greetings: "Greetings",
    q1: "1. How was your overall experience with the dealer?",
    q2: "2. Based on overall sales experience, how satisfied are you with your TML CV dealership?",
    q3: "3. What was your best experience with the dealer regarding Tata Magic Express Petrol?",
    q4: "4. How much effort did you need to put in yourself to get a response/support from the dealership in buying the vehicle?",
    q5: "5. Please rate on a scale of 0 to 10 how likely you are to recommend Tata Motors to a friend or peer",
    q6: "6. Do you want to recommend your friends or relative who are interested in purchasing Tata vehicle?",
    q7: "7. Would you like to share your experience on your social media?",
    moods: ["Happy", "Neutral", "Sad"],
    bestOpts: [
      "I got my vehicle in very good condition",
      "The dealer helped me understand all the information about vehicle",
      "The dealership's showroom was very clean",
      "The dealership was very helpful and prompt",
      "I got my vehicle on time",
      "The sales executive was very helpful",
      "I got my vehicle on the promised date"
    ],
    effortOpts: ["No effort (with ease)", "Little efforts", "Moderate effort", "More than moderate effort", "Lot of efforts"],
    recScale: ["never recommend", "highly recommend"],
    yes: "Yes",
    no: "No",
    submit: "Submit",
    prev: "Prev",
    next: "Next",
    thankYou: "Thank You!",
    success: "We appreciate your feedback! We'll be in touch with you shortly."
  },
  hi: {
    welcome: "टाटा मोटर्स फीडबैक सेक्शन में आपका स्वागत है",
    subWelcome: "हम आपकी प्रतिक्रिया को महत्व देते हैं। यह हमें बेहतर बनाने में मदद करता है।",
    langLabel: "भाषा चुनें",
    continue: "जारी रखें",
    identTitle: "अपनी पहचान बताएं",
    identSub: "सर्वेक्षण शुरू करने के लिए कृपया अपना विवरण दें।",
    nameLabel: "आपका पूरा नाम",
    phoneLabel: "आपका मोबाइल नंबर",
    greetings: "नमस्ते",
    q1: "1. डीलर के साथ आपका समग्र अनुभव कैसा रहा?",
    q2: "2. समग्र बिक्री अनुभव के आधार पर, आप अपने TML CV डीलरशिप से कितने संतुष्ट हैं?",
    q3: "3. टाटा मैजिक एक्सप्रेस पेट्रोल के संबंध में डीलर के साथ आपका सबसे अच्छा अनुभव क्या था?",
    q4: "4. वाहन खरीदने में डीलरशिप से सहायता प्राप्त करने के लिए आपको कितना प्रयास करना पड़ा?",
    q5: "5. 0 से 10 के पैमाने पर रेट करें कि आप टाटा मोटर्स की सिफारिश करने की कितनी संभावना रखते हैं",
    q6: "6. क्या आप अपने दोस्तों या रिश्तेदारों की सिफारिश करना चाहते हैं?",
    q7: "7. क्या आप अपना अनुभव अपने सोशल मीडिया पर साझा करना चाहेंगे?",
    moods: ["खुश", "सामान्य", "दुखी"],
    bestOpts: [
      "मुझे अपना वाहन बहुत अच्छी स्थिति में मिला",
      "डीलर ने मुझे वाहन के बारे में जानकारी समझने में मदद की",
      "डीलरशिप का शोरूम बहुत साफ था",
      "डीलरशिप बहुत मददगार और तत्पर थी",
      "मुझे अपना वाहन समय पर मिला",
      "बिक्री कार्यकारी बहुत मददगार था",
      "मुझे अपना वाहन वादा की गई तारीख पर मिला"
    ],
    effortOpts: ["कोई प्रयास नहीं (आसानी से)", "थोड़ा प्रयास", "सामान्य प्रयास", "सामान्य से अधिक प्रयास", "बहुत अधिक प्रयास"],
    recScale: ["कभी सिफारिश न करें", "अत्यधिक सिफारिश करें"],
    yes: "हाँ",
    no: "नहीं",
    submit: "सबमिट करें",
    prev: "पीछे",
    next: "आगे",
    thankYou: "धन्यवाद!",
    success: "हम आपकी प्रतिक्रिया की सराहना करते हैं! हम जल्द ही आपसे संपर्क करेंगे।"
  }
};

export default function TataFeedback() {
  const [lang, setLang] = useState('en');
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    user_name: "",
    user_phone: "",
    experience: "",
    satisfaction: 0,
    best_experiences: [],
    effort: "",
    recommend_score: 10,
    recommend_friend: "No",
    friend_name: "",
    friend_mobile: "",
    share_fb: "No",
    share_x: "No"
  });

  const t = TRANSLATIONS[lang];

  const handleNext = () => {
    if (step === 1 && (!formData.user_name || !formData.user_phone)) {
      alert(lang === 'en' ? "Please fill in your details" : "कृपया अपना विवरण भरें");
      return;
    }
    setStep(s => s + 1);
  };
  const handlePrev = () => setStep(s => s - 1);

  const toggleBest = (optIndex) => {
    const val = TRANSLATIONS.en.bestOpts[optIndex];
    setFormData(prev => ({
      ...prev,
      best_experiences: prev.best_experiences.includes(val)
        ? prev.best_experiences.filter(i => i !== val)
        : [...prev.best_experiences, val]
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await fetch(SHEETDB_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [{ ...formData, language: lang, best_experiences: formData.best_experiences.join(", ") }]
        })
      });
      setSubmitted(true);
    } catch (e) { alert("Error connecting to database"); }
    setLoading(false);
  };

  if (submitted) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full text-center p-10 bg-white rounded-3xl shadow-xl animate-in zoom-in duration-300">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={48}/></div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.thankYou} {formData.user_name},</h1>
        <p className="text-gray-500 leading-relaxed">{t.success}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-slate-900 font-sans selection:bg-indigo-100">
<div className="relative w-full h-56 md:h-80 lg:h-96 bg-slate-200 overflow-hidden">
        <img 
          src="/cover.jpg" 
          alt="Tata Motors Cover" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8F9FC] via-transparent to-transparent"></div>
      </div>
      <div className="max-w-2xl mx-auto p-4 md:p-8">
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden min-h-[500px] flex flex-col">
          
          <div className="p-8 md:p-12 flex-grow">
            {step === 0 && (
              <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="w-24 h-24 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto text-indigo-500"><Globe size={40}/></div>
                <h2 className="text-3xl font-black tracking-tight text-slate-800">{t.welcome}</h2>
                <p className="text-slate-500 leading-relaxed max-w-sm mx-auto">{t.subWelcome}</p>
                <div className="text-left bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">{t.langLabel}</label>
                  <select value={lang} onChange={(e) => setLang(e.target.value)} className="w-full bg-white border-none p-4 rounded-xl shadow-sm font-semibold text-slate-700 outline-none">
                    <option value="en">English</option>
                    <option value="hi">Hindi (हिंदी)</option>
                  </select>
                </div>
                <button onClick={handleNext} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 group">
                  {t.continue} <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-slate-800">{t.identTitle}</h3>
                  <p className="text-slate-500">{t.identSub}</p>
                </div>
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-4 text-slate-400" size={20}/>
                    <input 
                      className="w-full p-4 pl-12 bg-slate-50 border-2 border-transparent focus:border-indigo-100 rounded-2xl outline-none font-semibold transition-all" 
                      placeholder={t.nameLabel} 
                      value={formData.user_name}
                      onChange={e => setFormData({...formData, user_name: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-4 text-slate-400" size={20}/>
                    <input 
                      type="tel"
                      className="w-full p-4 pl-12 bg-slate-50 border-2 border-transparent focus:border-indigo-100 rounded-2xl outline-none font-semibold transition-all" 
                      placeholder={t.phoneLabel}
                      value={formData.user_phone}
                      onChange={e => setFormData({...formData, user_phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: MOOD & STARS */}
            {step === 2 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-4">
                <header>
                  <p className="text-indigo-600 font-bold text-xs uppercase tracking-widest mb-1">{t.greetings}! {formData.user_name},</p>
                  <h3 className="text-xl font-bold text-slate-800">Please tell us how you really feel...</h3>
                </header>
                <section>
                  <p className="font-bold text-slate-700 mb-6">{t.q1}</p>
                  <div className="grid grid-cols-3 gap-4">
                    {['Happy', 'Neutral', 'Sad'].map((m, i) => (
                      <button key={m} onClick={() => setFormData({...formData, experience: m})} 
                        className={`py-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 ${formData.experience === m ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-100 hover:border-slate-200'}`}>
                        <span className="text-4xl">{['😊','😐','☹️'][i]}</span>
                        <span className="text-xs font-black uppercase text-slate-500">{t.moods[i]}</span>
                      </button>
                    ))}
                  </div>
                </section>
                <section>
                  <p className="font-bold text-slate-700 mb-6">{t.q2}</p>
                  <div className="flex justify-center md:justify-start gap-3">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={44} onClick={() => setFormData({...formData, satisfaction: s})}
                        className={`cursor-pointer transition-all ${formData.satisfaction >= s ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* STEP 3: BEST EXPERIENCE */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h3 className="text-xl font-bold text-slate-800 mb-6">{t.q3}</h3>
                <div className="grid gap-3">
                  {t.bestOpts.map((opt, i) => {
                    const engVal = TRANSLATIONS.en.bestOpts[i];
                    return (
                      <button key={i} onClick={() => toggleBest(i)}
                        className={`text-left p-5 rounded-2xl border-2 transition-all font-semibold ${formData.best_experiences.includes(engVal) ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-100 text-slate-600 hover:bg-slate-50'}`}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: EFFORT & RECOMMEND SCALE */}
            {step === 4 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-4">
                <section>
                  <h3 className="text-xl font-bold text-slate-800 mb-6">{t.q4}</h3>
                  <div className="flex flex-col gap-3">
                    {t.effortOpts.map((eff, i) => {
                      const engEff = TRANSLATIONS.en.effortOpts[i];
                      return (
                        <button key={i} onClick={() => setFormData({...formData, effort: engEff})}
                          className={`w-full p-4 rounded-xl border-2 text-left font-bold transition-all ${formData.effort === engEff ? 'bg-indigo-50 border-indigo-600 text-indigo-700' : 'border-slate-100 text-slate-400'}`}>
                          {eff}
                        </button>
                      );
                    })}
                  </div>
                </section>
                <section>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">{t.q5}</h3>
                  <input type="range" min="0" max="10" value={formData.recommend_score} onChange={(e) => setFormData({...formData, recommend_score: e.target.value})}
                    className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 mt-6" />
                  <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mt-6 bg-slate-50 p-4 rounded-xl">
                    <span>{t.recScale[0]}</span>
                    <span className="text-3xl text-indigo-600 font-black">{formData.recommend_score}</span>
                    <span>{t.recScale[1]}</span>
                  </div>
                </section>
              </div>
            )}

            {/* STEP 5: RECOMMEND A FRIEND & SOCIALS */}
            {step === 5 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-4">
                <section>
                  <h3 className="text-xl font-bold text-slate-800 mb-6">{t.q6}</h3>
                  <div className="flex gap-4">
                    {['Yes', 'No'].map(v => (
                      <button key={v} onClick={() => setFormData({...formData, recommend_friend: v})}
                        className={`flex-1 py-4 rounded-2xl font-black border-2 transition-all ${formData.recommend_friend === v ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-100 text-slate-400'}`}>
                        {v === 'Yes' ? t.yes : t.no}
                      </button>
                    ))}
                  </div>
                  {formData.recommend_friend === 'Yes' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 animate-in slide-in-from-top-4">
                      <input className="p-4 bg-slate-50 border-none rounded-2xl outline-none font-semibold" placeholder="Friend Name" onChange={e => setFormData({...formData, friend_name: e.target.value})} />
                      <input className="p-4 bg-slate-50 border-none rounded-2xl outline-none font-semibold" placeholder="Friend Mobile" onChange={e => setFormData({...formData, friend_mobile: e.target.value})} />
                    </div>
                  )}
                </section>

                <section>
                  <h3 className="text-xl font-bold text-slate-800 mb-6">{t.q7}</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 border-2 border-slate-100 rounded-[2rem] text-center space-y-4">
                      <div className="flex justify-center items-center gap-2 text-blue-600 font-bold"><Facebook size={20}/> Facebook</div>
                      <div className="flex gap-2 justify-center">
                        <button onClick={() => setFormData({...formData, share_fb: 'Yes'})} className={`px-4 py-2 rounded-lg text-xs font-bold ${formData.share_fb === 'Yes' ? 'bg-blue-600 text-white' : 'bg-slate-100'}`}>{t.yes}</button>
                        <button onClick={() => setFormData({...formData, share_fb: 'No'})} className={`px-4 py-2 rounded-lg text-xs font-bold ${formData.share_fb === 'No' ? 'bg-slate-300 text-white' : 'bg-slate-100'}`}>{t.no}</button>
                      </div>
                    </div>
                    <div className="p-6 border-2 border-slate-100 rounded-[2rem] text-center space-y-4">
                      <div className="flex justify-center items-center gap-2 text-black font-bold"><Twitter size={20}/> X (Twitter)</div>
                      <div className="flex gap-2 justify-center">
                        <button onClick={() => setFormData({...formData, share_x: 'Yes'})} className={`px-4 py-2 rounded-lg text-xs font-bold ${formData.share_x === 'Yes' ? 'bg-black text-white' : 'bg-slate-100'}`}>{t.yes}</button>
                        <button onClick={() => setFormData({...formData, share_x: 'No'})} className={`px-4 py-2 rounded-lg text-xs font-bold ${formData.share_x === 'No' ? 'bg-slate-300 text-white' : 'bg-slate-100'}`}>{t.no}</button>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>

          {/* Footer Buttons */}
          {step > 0 && (
            <div className="px-8 pb-8 md:px-12 md:pb-12 flex gap-4">
              <button onClick={handlePrev} className="px-8 py-5 border-2 border-slate-100 text-slate-400 font-bold hover:bg-slate-50 rounded-2xl transition-all flex items-center gap-2">
                <ChevronLeft size={20}/> {t.prev}
              </button>
              {step < 5 ? (
                <button onClick={handleNext} className="flex-1 py-5 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                  {t.next} <ChevronRight size={20}/>
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={loading} className="flex-1 py-5 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                  {loading ? "..." : <><Send size={20}/> {t.submit}</>}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}