import React, { useState } from "react";
import { motion } from "framer-motion";
import { RotateCw } from "lucide-react";

const About = () => {
  const [sourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("ta"); // Default Tamil
  const [originalText] = useState({
    experienceNumber: "25",
    experienceText: "Year of Experience",
    companyTitle: "AUTOMAX ELECTRONICS",
    para1: `Our Company with over 20 years' experience in the field, we always strive towards excellence and ensure that our customers get only the best from us, be it in performance or quality. AUTOMAX ELECTRONICS., is committed to quality and deliverance of customer requirements. We abide by our core values and look to ACHIEVE our goals through sincere dedication and will.`,
    para2: `AUTOMAX ELECTRONICS is a manufacturer of electrical products for automobiles. Our range of products includes Decorative LED light, Fog Lights, Roof lamp led light, Water proof led light, and Boat led lights, Convertors, Tail lamps, and much more. Located in Tumeric city, Erode. Automax Electronics caters to a wide range of Automobile Led lightings from two-wheelers to commercial vehicles under the brand name ASTRA`,
    awardTitle: "Award Winning",
    awardDesc: `As an award-winning company, we pride ourselves on delivering exceptional products and services that set industry standards. Our commitment to excellence drives our continuous success and innovation.`,
    teamTitle: "Dedicated Team",
    teamDesc: `Our dedicated product team excels in crafting innovative solutions, ensuring each product meets the highest standards of quality and performance. With a focus on excellence, we bring your vision to life.`
  });

  const [translatedText, setTranslatedText] = useState({});
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState(null);
  const [translationCache, setTranslationCache] = useState({});

  const handleTranslate = async () => {
    if (targetLang === "en") {
      setTranslatedText({});
      setTranslationError(null);
      return;
    }

    setIsTranslating(true);
    setTranslationError(null);
    
    try {
      const newTranslatedText = {};
      const textsToTranslate = [];
      const newCache = { ...translationCache };

      // Prepare texts to translate (only uncached)
      Object.entries(originalText).forEach(([key, text]) => {
        const cacheKey = `${targetLang}-${key}`;
        if (translationCache[cacheKey]) {
          newTranslatedText[key] = translationCache[cacheKey];
        } else {
          textsToTranslate.push({ key, text: String(text) });
        }
      });

      if (textsToTranslate.length > 0) {
        const response = await fetch("https://translator-0dye.onrender.com/translate/batch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            texts: textsToTranslate.map(t => t.text),
            from: sourceLang,
            to: targetLang,
          }),
        });

        if (!response.ok) {
          throw new Error(`Translation failed: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.error || "Translation service error");
        }

        // Process successful translation
        data.translatedTexts.forEach((translated, index) => {
          const { key } = textsToTranslate[index];
          const cacheKey = `${targetLang}-${key}`;
          const safeText = String(translated || textsToTranslate[index].text);
          newTranslatedText[key] = safeText;
          newCache[cacheKey] = safeText;
        });

        setTranslationCache(newCache);
      }

      setTranslatedText(newTranslatedText);
    } catch (error) {
      console.error("Translation error:", error);
      setTranslationError(error.message || "Translation failed. Please try again.");
    } finally {
      setIsTranslating(false);
    }
  };

  const getText = (key) => translatedText[key] || originalText[key];

  return (
    <div className="flex min-h-screen bg-white flex-col">
      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-full h-72 md:h-96 overflow-hidden"
      >
        <img
          src="https://t3.ftcdn.net/jpg/09/85/53/02/240_F_985530270_SgZsAuSMfXttrmIvPtbGU85hYBxygx6I.jpg"
          alt="About Us Banner"
          className="w-full h-full object-cover transform transition-transform duration-1000 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent flex items-center justify-center">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-center px-4 drop-shadow-lg"
          >
            ABOUT US
          </motion.h1>
        </div>
      </motion.div>

      {/* Logo */}
      <section className="w-full px-6 lg:px-20 py-2 flex flex-col md:flex-row items-center justify-center">
        <div className="flex-shrink-0 w-48 flex justify-center">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-48 h-48 object-contain rounded-lg"
          />
        </div>
        <div className="w-[350px] mb-4 flex justify-center">
          <h3
            className="text-[70px] md:text-[100px] font-extrabold text-red-700"
            style={{ fontFamily: "Georgia, sans-serif", fontStyle: "italic" }}
          >
            ASTRA
          </h3>
        </div>
      </section>

      {/* Translate UI */}
      <div className="flex flex-col items-center gap-4 px-6 mt-6">
        <div className="flex gap-4">
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md"
            disabled={isTranslating}
          >
            <option value="ta">Tamil</option>
            <option value="hi">Hindi</option>
            <option value="kn">Kannada</option>
            <option value="te">Telugu</option>
            <option value="ml">Malayalam</option>
            <option value="en">English</option>
          </select>
          <button
            onClick={handleTranslate}
            disabled={isTranslating}
            className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition flex items-center justify-center gap-2 min-w-[120px]"
          >
            {isTranslating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <RotateCw className="h-5 w-5" />
                </motion.div>
                <span>Translating...</span>
              </>
            ) : (
              "Translate"
            )}
          </button>
        </div>
        
        {translationError && (
          <div className="text-center">
            <p className="text-red-500 text-sm">{translationError}</p>
            <button
              onClick={handleTranslate}
              className="mt-1 text-blue-600 hover:text-blue-800 text-sm underline"
            >
              Retry Translation
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-1 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
          {/* Content */}
          <div className="lg:col-span-2">
            <div className="bg-white">
              <h2 className="text-6xl md:text-7xl font-bold text-blue-900 mb-2">
                {getText("experienceNumber")}
              </h2>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                {getText("experienceText")}
              </p>
              <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                {getText("companyTitle")}
              </h3>
              <p className="text-gray-700 mb-4 text-lg">{getText("para1")}</p>
              <p className="text-gray-700 mb-4 text-lg">{getText("para2")}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 ms-5">
            <div className="bg-white">
              <div className="mb-8">
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl">🏆</span>
                  </div>
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-blue-900 mb-2 text-left">
                  {getText("awardTitle")}
                </h4>
                <p className="text-gray-700 text-left text-lg">{getText("awardDesc")}</p>
              </div>
              <div>
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl">👥</span>
                  </div>
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-blue-900 mb-2 text-left">
                  {getText("teamTitle")}
                </h4>
                <p className="text-gray-700 text-left text-lg">{getText("teamDesc")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-page loading overlay */}
      {isTranslating && (
        <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
          <motion.div
            className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
        </div>
      )}
    </div>
  );
};

export default About;