"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Extension from "../../../public/extension.png";
import Font from "../../../public/Frame.svg"
import meet from "../../../public/hello.svg"
interface Step {
  id: number;
  title: string;
  description: string;
  image?: any; // Allow custom images per step if needed
}

const STEPS: Step[] = [
  { 
    id: 1, 
    title: "Get the Extension", 
    description: "Download the extension from Chrome webstore.",
    image: Extension
  },
  { 
    id: 2, 
    title: "Activate During Meet", 
    description: "Click on the extension during your online meeting.",
    image: Font
  },
  { 
    id: 3, 
    title: "Enjoy the Experience", 
    description: "Seamless integration for enhanced meeting experience.",
    image: meet
  }
];

const StepsProgress: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  const progressValue: number = (step / STEPS.length) * 100;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        handleNextStep();
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleNextStep = () => {
    setStep((prevStep) => {
      const nextStep = prevStep === STEPS.length ? 1 : prevStep + 1;
      setCarouselIndex(nextStep - 1);
      return nextStep;
    });
  };

  const handlePrevStep = () => {
    setStep((prevStep) => {
      const nextStep = prevStep === 1 ? STEPS.length : prevStep - 1;
      setCarouselIndex(nextStep - 1);
      return nextStep;
    });
  };

  const handleStepClick = (clickedStep: number) => {
    setStep(clickedStep);
    setCarouselIndex(clickedStep - 1);
  };

  const ProgressBar = () => (
    <div className="relative flex flex-col items-center w-12 md:w-16 lg:w-20">
      <div className="h-[300px] md:h-[400px] lg:h-[500px] w-2 md:w-3 bg-gray-200 rounded-full relative">
        <div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-400 to-indigo-600 rounded-full transition-all duration-700 ease-in-out"
          style={{ height: `${progressValue}%` }}
        />
        {STEPS.map((stepItem) => (
          <div
            key={stepItem.id}
            className="absolute flex items-center -left-6 md:-left-10 cursor-pointer"
            style={{ top: `${((stepItem.id - 1) / (STEPS.length - 1)) * 100}%` }}
            onClick={() => handleStepClick(stepItem.id)}
          >
            <div
              className={`w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full transition-all duration-500 
                ${step >= stepItem.id ? "bg-indigo-600" : "bg-gray-300"} 
                ${step === stepItem.id ? "scale-125" : "scale-100"}`}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row h-auto md:h-screen w-full p-4 md:p-12 mt-0 md:mt-16 justify-center items-center gap-6 lg:gap-16">
      {/* Steps Content */}
      <div className="flex flex-col w-full md:flex-1 md:min-w-[350px] lg:min-w-[450px]">
        {STEPS.map((stepItem) => (
          <div
            key={stepItem.id}
            className="mb-4 md:mb-8 transition-all duration-500"
            style={{
              transform: step === stepItem.id ? "scale(1.05)" : "scale(1)",
              opacity: step === stepItem.id ? 1 : 0.7,
            }}
            onClick={() => handleStepClick(stepItem.id)}
          >
            <Card
              className={`w-full shadow-xl border-2 transition-all cursor-pointer 
                ${step === stepItem.id
                  ? "border-indigo-600 shadow-blue-200"
                  : "border-blue-400"}`}
            >
              <div className="flex items-center p-4 md:p-6">
                <div className="flex-shrink-0 w-16 md:w-20 flex-row mr-4 md:mr-6">
                  <div
                    className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center text-lg md:text-xl font-bold transition-all duration-500 
                      ${step >= stepItem.id
                        ? "bg-indigo-600 text-white ring-2 ring-blue-200"
                        : "bg-gray-200 text-gray-600"}`}
                  >
                    {stepItem.id}
                  </div>
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-lg md:text-2xl font-bold transition-colors duration-300 
                      ${step === stepItem.id ? "text-blue-800" : "text-gray-900"}`}
                  >
                    {stepItem.title}
                  </h3>
                  <p className="text-sm md:text-lg text-slate-800 mt-2">
                    {stepItem.description}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Progress Bar at the Center */}
      <ProgressBar />

      {/* Carousel Content */}
      <div className="w-full max-w-xs md:max-w-md lg:max-w-lg mt-4 md:mt-0">
        <div className="relative">
          <Carousel className="w-full overflow-hidden">
            <CarouselContent
              className="h-64 md:h-[500px] lg:h-[800px] transition-transform duration-700 ease-in-out flex"
              style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
            >
              {STEPS.map((stepItem) => (
                <CarouselItem 
                  key={stepItem.id} 
                  className="w-full flex-shrink-0 flex items-center justify-center"
                >
                  <div className="p-4 h-full flex flex-col items-center justify-center">
                    <Image 
                      src={stepItem.image} 
                      alt={stepItem.title} 
                      width={300} 
                      height={300} 
                      className="object-contain"
                    />
                    <h2 className="text-xl md:text-2xl font-bold my-2 md:my-4">
                      {stepItem.title}
                    </h2>
                    <p className="text-sm md:text-lg text-center">
                      {stepItem.description}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default StepsProgress;