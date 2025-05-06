"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { CheckIcon, ArrowRightIcon, BookOpen, ArrowLeft, Home, Trophy, Sparkles, UserIcon, ClipboardList } from "lucide-react";
import Link from "next/link";

export default function ExaminationPage() {
  const [activeTab, setActiveTab] = useState("grammar");
  const [currentSection, setCurrentSection] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [fillBlanksAnswers, setFillBlanksAnswers] = useState<Record<string, string>>({});
  const [comprehensionAnswers, setComprehensionAnswers] = useState<Record<string, string>>({});
  const [writingAnswer, setWritingAnswer] = useState("");
  const [speakingResponse, setSpeakingResponse] = useState("");
  const [examComplete, setExamComplete] = useState(false);
  const [results, setResults] = useState<{score: number, feedback: string} | null>(null);

  // Rest of your existing state and functions
  const grammarQuestions = [
    {
      id: "g1",
      question: "What is the correct form of the verb?",
      text: "She _____ to the store yesterday.",
      options: [
        { value: "go", label: "go" },
        { value: "goes", label: "goes" },
        { value: "went", label: "went" },
        { value: "going", label: "going" }
      ],
      answer: "went"
    },
    {
      id: "g2",
      question: "Choose the correct article:",
      text: "I saw _____ bird in the tree.",
      options: [
        { value: "a", label: "a" },
        { value: "an", label: "an" },
        { value: "the", label: "the" },
        { value: "no article", label: "no article" }
      ],
      answer: "a"
    },
    {
      id: "g3",
      question: "Select the correct preposition:",
      text: "The book is _____ the table.",
      options: [
        { value: "on", label: "on" },
        { value: "in", label: "in" },
        { value: "at", label: "at" },
        { value: "by", label: "by" }
      ],
      answer: "on"
    }
  ];

  const fillBlanksSentences = [
    {
      id: "fb1",
      text: "The weather was so nice that we decided to go for a _____.",
      answer: "walk"
    },
    {
      id: "fb2",
      text: "She _____ her keys and couldn't get into her apartment.",
      answer: "lost"
    },
    {
      id: "fb3",
      text: "You need to _____ the instructions carefully before starting.",
      answer: "read"
    }
  ];

  const readingText = `
    The digital revolution has transformed how we communicate and access information. 
    In just a few decades, we've moved from sending letters through the mail to 
    instant messaging across the globe. Libraries of information that once required 
    physical buildings can now be accessed from devices that fit in our pockets. 
    This transformation has created new opportunities but also challenges. While 
    information is more accessible than ever, distinguishing reliable sources from 
    misinformation requires critical thinking skills.
  `;

  const comprehensionQuestions = [
    {
      id: "c1",
      question: "What has transformed how we communicate according to the text?",
      options: [
        { value: "postal service", label: "Postal service improvements" },
        { value: "digital revolution", label: "The digital revolution" },
        { value: "library expansion", label: "Expansion of libraries" },
        { value: "critical thinking", label: "Critical thinking education" }
      ],
      answer: "digital revolution"
    },
    {
      id: "c2",
      question: "According to the text, what challenge has emerged from the digital transformation?",
      options: [
        { value: "slow communication", label: "Slow communication" },
        { value: "less information", label: "Less access to information" },
        { value: "distinguishing sources", label: "Distinguishing reliable sources from misinformation" },
        { value: "device size", label: "The size of digital devices" }
      ],
      answer: "distinguishing sources"
    }
  ];

  const writingPrompt = "Describe an experience where technology helped you solve a problem. Include what happened and how it made you feel. (Write at least 50 words)";

  const speakingPrompt = "If you could visit any place in the world, where would you go and why? Record your answer after thinking about it.";

  const handleNextSection = () => {
    if (currentSection < 4) {
      setCurrentSection(currentSection + 1);
      
      // Change tab based on current section
      if (currentSection === 0) setActiveTab("fillblanks");
      if (currentSection === 1) setActiveTab("reading");
      if (currentSection === 2) setActiveTab("writing");
      if (currentSection === 3) setActiveTab("speaking");
    } else {
      // Complete the exam and calculate results
      completeExam();
    }
  };

  const completeExam = () => {
    // Simple scoring calculation
    let score = 0;
    let totalQuestions = grammarQuestions.length + fillBlanksSentences.length + comprehensionQuestions.length;
    
    // Check grammar answers
    grammarQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.answer) score++;
    });
    
    // Check fill in the blanks
    fillBlanksSentences.forEach(s => {
      if (fillBlanksAnswers[s.id]?.toLowerCase() === s.answer.toLowerCase()) score++;
    });
    
    // Check comprehension
    comprehensionQuestions.forEach(q => {
      if (comprehensionAnswers[q.id] === q.answer) score++;
    });
    
    // Writing and speaking are qualitative and would need human assessment
    // Adding 1 point each if there's any content
    if (writingAnswer.trim().length > 50) score++;
    if (speakingResponse.trim().length > 0) score++;
    
    totalQuestions += 2; // for writing and speaking
    
    const percentage = Math.round((score / totalQuestions) * 100);
    
    // Generate feedback based on score
    let feedback = "";
    if (percentage >= 90) {
      feedback = "Excellent! You have advanced English skills.";
    } else if (percentage >= 70) {
      feedback = "Good job! You have intermediate to upper-intermediate English skills.";
    } else if (percentage >= 50) {
      feedback = "You have basic to intermediate English skills. Keep practicing!";
    } else {
      feedback = "You're at a beginner level. Regular practice will help you improve.";
    }
    
    setResults({score: percentage, feedback});
    setExamComplete(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-blue-200 dark:bg-blue-900/20 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 left-20 w-72 h-72 bg-purple-200 dark:bg-purple-900/20 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-indigo-200 dark:bg-indigo-900/20 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="container mx-auto py-3 px-3 sm:px-4 sm:py-4 flex justify-between items-center backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-b sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <div className="p-1.5 bg-blue-500 text-white rounded-full">
              <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-blue-800 dark:text-blue-400">EnglishTutor</h1>
          </Link>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border bg-blue-50/50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 shadow-sm">
            <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-800 dark:text-blue-400">English Assessment</span>
          </div>
          
          <Link href="/">
            <Button variant="ghost" size="sm" className="flex items-center gap-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-2 sm:px-3">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
          </Link>
        </div>
      </header>
      
      <div className="container mx-auto py-4 sm:py-8 px-3 sm:px-4 relative z-10">
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-blue-800 dark:text-blue-400">English Assessment</h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">Complete all sections for your proficiency score.</p>
          </div>
          <div className="flex gap-2 items-center self-end sm:self-auto">
            <div className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg border bg-white/90 dark:bg-gray-800/90 flex items-center gap-1.5 shadow-sm">
              <UserIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500" />
              <span className="text-xs sm:text-sm">Candidate</span>
            </div>
            <div className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg border bg-white/90 dark:bg-gray-800/90 flex items-center gap-1.5 shadow-sm">
              <ClipboardList className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500" />
              <span className="text-xs sm:text-sm">Assessment</span>
            </div>
          </div>
        </div>
        
        <Card className="w-full max-w-4xl mx-auto backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 shadow-xl border-t-4 border-t-blue-500 rounded-xl overflow-hidden">
          <CardHeader className="relative pb-0 pt-6">
            <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 blur-2xl"></div>
            <div className="absolute -bottom-10 -right-10 w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/30 blur-2xl"></div>
            
            <div className="relative">
              <div className="flex justify-between items-center mb-4">
                <CardTitle className="text-2xl text-blue-800 dark:text-blue-400">
                  {activeTab === "grammar" && "Grammar & Vocabulary"}
                  {activeTab === "fillblanks" && "Fill in the Blanks"}
                  {activeTab === "reading" && "Reading Comprehension"}
                  {activeTab === "writing" && "Writing Assessment"}
                  {activeTab === "speaking" && "Speaking Assessment"}
                </CardTitle>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Section {currentSection + 1} of 5</span>
                </div>
              </div>
              
              <CardDescription className="text-base">
                {activeTab === "grammar" && "Test your knowledge of English grammar and vocabulary."}
                {activeTab === "fillblanks" && "Complete sentences with appropriate words."}
                {activeTab === "reading" && "Read the passage and answer questions to demonstrate comprehension."}
                {activeTab === "writing" && "Write a response to the given prompt."}
                {activeTab === "speaking" && "Record or type your response to the speaking prompt."}
              </CardDescription>
              
              <div className="mt-6">
                <div className="flex justify-between text-xs mb-2">
                  <span>Progress</span>
                  <span>{Math.round((currentSection / 5) * 100)}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out" 
                    style={{ width: `${(currentSection / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0 mt-6">
            {!examComplete ? (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full flex bg-blue-50/50 dark:bg-gray-800/50 p-1 rounded-lg mx-6">
                  {[
                    { id: "grammar", label: "Grammar", icon: "1" },
                    { id: "fillblanks", label: "Fill Blanks", icon: "2" },
                    { id: "reading", label: "Reading", icon: "3" },
                    { id: "writing", label: "Writing", icon: "4" },
                    { id: "speaking", label: "Speaking", icon: "5" }
                  ].map((tab, index) => (
                    <TabsTrigger 
                      key={tab.id}
                      value={tab.id} 
                      disabled={
                        (tab.id === "grammar" && currentSection !== 0) ||
                        (tab.id === "fillblanks" && currentSection !== 1) ||
                        (tab.id === "reading" && currentSection !== 2) ||
                        (tab.id === "writing" && currentSection !== 3) ||
                        (tab.id === "speaking" && currentSection !== 4)
                      }
                      className={`flex-1 py-2 px-3 rounded-md gap-2 flex items-center justify-center transition-all 
                        ${activeTab === tab.id 
                          ? 'bg-white dark:bg-gray-800 shadow-sm text-blue-700 dark:text-blue-400' 
                          : 'text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400'}
                        ${index < 4 ? 'mr-1' : ''}
                        ${currentSection > index ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                      `}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                        ${activeTab === tab.id 
                          ? 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-400' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}
                        ${currentSection > index ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : ''}
                      `}>
                        {currentSection > index ? <CheckIcon className="h-3 w-3" /> : tab.icon}
                      </div>
                      <span className="hidden sm:inline">{tab.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                <div className="p-6">
                  <TabsContent value="grammar" className="mt-0 space-y-6">
                    <div className="space-y-8">
                      {grammarQuestions.map((q, qIndex) => (
                        <div key={q.id} className="p-6 bg-white dark:bg-gray-800 rounded-xl border shadow-sm relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                          <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">Q{qIndex + 1}</span>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-medium text-lg text-blue-800 dark:text-blue-400">{q.question}</h3>
                              <p className="mt-2 text-base">{q.text}</p>
                            </div>
                            
                            <RadioGroup 
                              value={selectedAnswers[q.id]} 
                              onValueChange={(value) => setSelectedAnswers({...selectedAnswers, [q.id]: value})}
                              className="mt-4"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {q.options.map((option) => (
                                  <div 
                                    key={option.value} 
                                    className={`flex items-center space-x-2 p-3 rounded-lg border-2 cursor-pointer transition-all
                                      ${selectedAnswers[q.id] === option.value 
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-600' 
                                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800'}
                                    `}
                                    onClick={() => setSelectedAnswers({...selectedAnswers, [q.id]: option.value})}
                                  >
                                    <RadioGroupItem value={option.value} id={`${q.id}-${option.value}`} className="text-blue-600" />
                                    <Label htmlFor={`${q.id}-${option.value}`} className="flex-1 cursor-pointer font-medium">
                                      {option.label}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-end mt-8">
                      <Button 
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all transform hover:scale-105 flex items-center gap-2 shadow-md" 
                        onClick={handleNextSection}
                        disabled={grammarQuestions.some(q => !selectedAnswers[q.id])}
                      >
                        <span>Next Section</span>
                        <ArrowRightIcon className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="fillblanks" className="mt-0 space-y-6">
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border shadow-sm">
                      <div className="mb-6 flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"></path></svg>
                        </div>
                        <h3 className="font-medium text-lg text-blue-800 dark:text-blue-400">Fill in the blanks with appropriate words</h3>
                      </div>
                      
                      <p className="mb-6 text-muted-foreground text-sm bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        Complete each sentence by typing an appropriate word in the blank space. Choose a word that makes the sentence grammatically correct and meaningful.
                      </p>
                      
                      <div className="space-y-8">
                        {fillBlanksSentences.map((s, index) => (
                          <div key={s.id} className="border-b last:border-0 pb-6 last:pb-0">
                            <div className="mb-2 flex items-center">
                              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 text-xs font-semibold text-blue-600 dark:text-blue-400">
                                {index + 1}
                              </div>
                              <p className="text-base font-medium">Complete this sentence:</p>
                            </div>
                            
                            <div className="mb-4 p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-lg">
                              {s.text.split('_____').map((part, i, array) => (
                                <span key={i}>
                                  {part}
                                  {i < array.length - 1 && (
                                    <span className="inline-block mx-1 px-1 min-w-[80px] border-b-2 border-blue-400 dark:border-blue-500"></span>
                                  )}
                                </span>
                              ))}
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <Input 
                                placeholder="Type your answer" 
                                value={fillBlanksAnswers[s.id] || ""} 
                                onChange={(e) => setFillBlanksAnswers({...fillBlanksAnswers, [s.id]: e.target.value})}
                                className="max-w-xs border-blue-200 dark:border-blue-800 focus:ring-blue-500 focus:border-blue-500"
                              />
                              
                              {fillBlanksAnswers[s.id] && (
                                <div className="animate-pulse-slow">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-8">
                      <Button 
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all transform hover:scale-105 flex items-center gap-2 shadow-md" 
                        onClick={handleNextSection}
                        disabled={fillBlanksSentences.some(s => !fillBlanksAnswers[s.id])}
                      >
                        <span>Next Section</span>
                        <ArrowRightIcon className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="reading" className="mt-0 space-y-6">
                    <div className="space-y-6">
                      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border shadow-sm">
                        <div className="mb-6 flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                          </div>
                          <h3 className="font-medium text-lg text-blue-800 dark:text-blue-400">Reading Comprehension</h3>
                        </div>
                        
                        <div className="mb-6 p-6 bg-blue-50/50 dark:bg-blue-900/10 rounded-lg relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                          <h4 className="font-medium mb-4 text-blue-700 dark:text-blue-400">Read the passage below:</h4>
                          <p className="leading-relaxed whitespace-pre-line">{readingText}</p>
                        </div>
                        
                        <div className="text-sm text-muted-foreground bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded-lg border-l-2 border-yellow-400 flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                          <span>Read the passage carefully before answering the questions below.</span>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        {comprehensionQuestions.map((q, qIndex) => (
                          <div key={q.id} className="p-6 bg-white dark:bg-gray-800 rounded-xl border shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
                            <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                              <span className="text-sm font-bold text-purple-600 dark:text-purple-400">Q{qIndex + 1}</span>
                            </div>
                            
                            <div className="space-y-4">
                              <h3 className="font-medium text-lg text-purple-800 dark:text-purple-400">{q.question}</h3>
                              
                              <RadioGroup 
                                value={comprehensionAnswers[q.id]} 
                                onValueChange={(value) => setComprehensionAnswers({...comprehensionAnswers, [q.id]: value})}
                                className="mt-4"
                              >
                                <div className="space-y-3">
                                  {q.options.map((option) => (
                                    <div 
                                      key={option.value} 
                                      className={`flex items-center space-x-2 p-3 rounded-lg border-2 cursor-pointer transition-all
                                        ${comprehensionAnswers[q.id] === option.value 
                                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-600' 
                                          : 'border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-800'}
                                      `}
                                      onClick={() => setComprehensionAnswers({...comprehensionAnswers, [q.id]: option.value})}
                                    >
                                      <RadioGroupItem value={option.value} id={`${q.id}-${option.value}`} className="text-purple-600" />
                                      <Label htmlFor={`${q.id}-${option.value}`} className="flex-1 cursor-pointer">
                                        {option.label}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </RadioGroup>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-8">
                      <Button 
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all transform hover:scale-105 flex items-center gap-2 shadow-md" 
                        onClick={handleNextSection}
                        disabled={comprehensionQuestions.some(q => !comprehensionAnswers[q.id])}
                      >
                        <span>Next Section</span>
                        <ArrowRightIcon className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="writing" className="mt-0 space-y-6">
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border shadow-sm">
                      <div className="mb-6 flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"></path></svg>
                        </div>
                        <h3 className="font-medium text-lg text-blue-800 dark:text-blue-400">Writing Assessment</h3>
                      </div>
                      
                      <div className="mb-6 p-5 bg-blue-50/50 dark:bg-blue-900/10 rounded-lg border-l-4 border-blue-500">
                        <h4 className="font-medium mb-2 text-blue-700 dark:text-blue-400">Writing Prompt:</h4>
                        <p className="leading-relaxed">{writingPrompt}</p>
                      </div>
                      
                      <div className="mb-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                          <p className="text-sm font-medium">Your Response</p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {writingAnswer.trim().length} characters | {writingAnswer.trim().split(/\s+/).length} words
                        </div>
                      </div>
                      
                      <div className="relative">
                        <Textarea 
                          placeholder="Write your response here..." 
                          className="min-h-[250px] p-4 border-gray-200 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500 resize-none text-base" 
                          value={writingAnswer}
                          onChange={(e) => setWritingAnswer(e.target.value)}
                        />
                        
                        <div className="absolute bottom-3 right-3 flex items-center gap-2">
                          {writingAnswer.trim().split(/\s+/).length < 50 ? (
                            <div className="text-xs text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-full flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                              <span>Aim for at least 50 words</span>
                            </div>
                          ) : (
                            <div className="text-xs text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                              <span>Good length</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-6 text-sm text-muted-foreground bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 mt-0.5"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 17" x2="12.01"></path></svg>
                        <div>
                          <p className="font-medium text-blue-700 dark:text-blue-400">Writing Tips:</p>
                          <ul className="list-disc ml-4 mt-1 space-y-1">
                            <li>Include an introduction, body, and conclusion</li>
                            <li>Use examples to support your ideas</li>
                            <li>Pay attention to grammar and spelling</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-8">
                      <Button 
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all transform hover:scale-105 flex items-center gap-2 shadow-md" 
                        onClick={handleNextSection}
                        disabled={writingAnswer.trim().length < 10}
                      >
                        <span>Next Section</span>
                        <ArrowRightIcon className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="speaking" className="mt-0 space-y-6">
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border shadow-sm">
                      <div className="mb-6 flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="22"></line></svg>
                        </div>
                        <h3 className="font-medium text-lg text-blue-800 dark:text-blue-400">Speaking Assessment</h3>
                      </div>
                      
                      <div className="mb-6 p-5 bg-blue-50/50 dark:bg-blue-900/10 rounded-lg border-l-4 border-blue-500">
                        <h4 className="font-medium mb-2 text-blue-700 dark:text-blue-400">Speaking Prompt:</h4>
                        <p className="leading-relaxed">{speakingPrompt}</p>
                      </div>
                      
                      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-xl border border-dashed border-blue-200 dark:border-blue-800">
                        <div className="flex justify-center mb-6">
                          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center animate-pulse-slow">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="22"></line></svg>
                          </div>
                        </div>
                        
                        <div className="text-center mb-6">
                          <h4 className="font-medium mb-2 text-blue-700 dark:text-blue-400">Voice Recording</h4>
                          <p className="text-sm text-muted-foreground">In a real test, you would record your voice answering the prompt.</p>
                        </div>
                        
                        <div className="flex justify-center">
                          <div className="flex items-center gap-4">
                            <Button className="rounded-full w-10 h-10 flex items-center justify-center p-0 bg-red-500 hover:bg-red-600 text-white shadow-md">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>
                            </Button>
                            
                            <div className="w-40 h-10 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden relative">
                              <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Press to record</span>
                              </div>
                              <div className="h-full bg-gradient-to-r from-blue-300 to-purple-300 dark:from-blue-700 dark:to-purple-700 rounded-full w-0"></div>
                            </div>
                            
                            <Button variant="ghost" className="rounded-full w-10 h-10 flex items-center justify-center p-0 text-gray-500">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-2 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                          <p className="text-sm font-medium">Type your response instead (for demo purposes)</p>
                        </div>
                      </div>
                      
                      <Textarea 
                        placeholder="Type what you would say in response to the prompt..." 
                        className="min-h-[150px] p-4 border-gray-200 dark:border-gray-700 focus:ring-purple-500 focus:border-purple-500" 
                        value={speakingResponse}
                        onChange={(e) => setSpeakingResponse(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex justify-end mt-8">
                      <Button 
                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-all transform hover:scale-105 flex items-center gap-2 shadow-md" 
                        onClick={handleNextSection}
                        disabled={speakingResponse.trim().length < 10}
                      >
                        <span>Complete Assessment</span>
                        <CheckIcon className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            ) : (
              <div className="py-10 space-y-8 text-center p-6">
                <div className="relative mb-8">
                  <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-blue-100/80 to-purple-100/80 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full blur-3xl opacity-70"></div>
                  <div className="relative">
                    <div className="animate-float">
                      <div className="w-28 h-28 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                          <Trophy className="h-12 w-12 text-yellow-500" />
                        </div>
                      </div>
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl font-bold mt-6 text-blue-800 dark:text-blue-400">Assessment Complete!</h2>
                    <p className="text-muted-foreground mt-3 max-w-md mx-auto">Great job! You've successfully completed your English language assessment. Here are your results:</p>
                  </div>
                </div>
                
                <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6">
                  <div className="p-8 border rounded-xl bg-white dark:bg-gray-800 shadow-lg relative overflow-hidden md:col-span-1">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600"></div>
                    
                    <div className="mb-6 flex items-center justify-center relative">
                      <div className="animate-pulse-slow w-36 h-36 flex items-center justify-center">
                        <svg className="w-36 h-36" viewBox="0 0 100 100">
                          <circle 
                            className="text-gray-200 dark:text-gray-700" 
                            strokeWidth="6" 
                            stroke="currentColor" 
                            fill="transparent" 
                            r="44" 
                            cx="50" 
                            cy="50" 
                          />
                          <circle 
                            className="text-blue-500 dark:text-blue-400" 
                            strokeWidth="6" 
                            stroke="currentColor" 
                            fill="transparent" 
                            r="44" 
                            cx="50" 
                            cy="50" 
                            strokeDasharray={`${2 * Math.PI * 44}`}
                            strokeDashoffset={`${2 * Math.PI * 44 * (1 - (results?.score || 0) / 100)}`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                          <span className="text-4xl font-bold text-blue-700 dark:text-blue-400">{results?.score}%</span>
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">SCORE</span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-400 text-center">Your Proficiency</h3>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-base">{results?.feedback}</p>
                    </div>
                  </div>
                  
                  <div className="p-8 border rounded-xl bg-white dark:bg-gray-800 shadow-lg relative overflow-hidden md:col-span-1">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-green-500 via-teal-500 to-emerald-600"></div>
                    
                    <h3 className="text-xl font-semibold mb-5 text-green-700 dark:text-green-400 flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      <span>Recommendations</span>
                    </h3>
                    
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg transition-all hover:translate-x-1">
                        <div className="mt-0.5 bg-green-100 dark:bg-green-800 rounded-full p-1">
                          <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium">Personalized Learning Path</p>
                          <p className="text-muted-foreground text-sm mt-0.5">Custom curriculum based on your assessment results</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg transition-all hover:translate-x-1">
                        <div className="mt-0.5 bg-green-100 dark:bg-green-800 rounded-full p-1">
                          <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium">Targeted Practice Materials</p>
                          <p className="text-muted-foreground text-sm mt-0.5">Focus on improving areas where you scored lower</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg transition-all hover:translate-x-1">
                        <div className="mt-0.5 bg-green-100 dark:bg-green-800 rounded-full p-1">
                          <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium">Live Conversation Practice</p>
                          <p className="text-muted-foreground text-sm mt-0.5">Improve your speaking skills with our AI tutor</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-8 border rounded-xl bg-white dark:bg-gray-800 shadow-lg relative overflow-hidden md:col-span-2">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600"></div>
                    
                    <h3 className="text-xl font-semibold mb-5 text-amber-700 dark:text-amber-400 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart-3"><path d="M3 3v18h18"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg>
                      <span>Performance Breakdown</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 dark:text-amber-400"><path d="m5 8 6 6"></path><path d="m4 14 10-10 6 6-10 10-6-6z"></path><path d="M14 4v4h4"></path><path d="M10 14v4h4"></path></svg>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Grammar & Vocabulary</p>
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-lg">Good</p>
                            <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500 dark:bg-amber-600" style={{ width: '75%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 dark:text-amber-400"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Fill in the Blanks</p>
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-lg">Excellent</p>
                            <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500 dark:bg-amber-600" style={{ width: '90%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 dark:text-amber-400"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Reading Comprehension</p>
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-lg">Good</p>
                            <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500 dark:bg-amber-600" style={{ width: '80%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 dark:text-amber-400"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"></path></svg>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Writing & Speaking</p>
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-lg">Needs Practice</p>
                            <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500 dark:bg-amber-600" style={{ width: '60%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <Button 
                    onClick={() => window.location.reload()}
                    className="px-6 py-2.5 h-auto bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all transform hover:scale-105 flex items-center gap-2 shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path><path d="M3 21v-5h5"></path></svg>
                    <span>Retake Assessment</span>
                  </Button>
                  <Link href="/">
                    <Button 
                      variant="outline"
                      className="px-6 py-2.5 h-auto border-blue-500 text-blue-600 hover:bg-blue-50 rounded-lg transition-all flex items-center gap-2"
                    >
                      <Home className="h-4 w-4" />
                      <span>Return to Home</span>
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Add animation container at the bottom */}
        <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-100/50 dark:from-blue-900/10 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}