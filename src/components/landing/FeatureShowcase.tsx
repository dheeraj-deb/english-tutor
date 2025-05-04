import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MessageSquare,
  Mic,
  Phone,
  Calendar,
  BookOpen,
  Award,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  imageUrl?: string;
}

const FeatureCard = (
  { icon, title, description, imageUrl }: FeatureCardProps = {
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    title: "Feature Title",
    description: "Feature description goes here",
    imageUrl: undefined,
  },
) => {
  return (
    <Card className="overflow-hidden h-full bg-card border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm mb-4">
          {description}
        </CardDescription>
        {imageUrl && (
          <div className="rounded-md overflow-hidden mt-4">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const FeatureShowcase = () => {
  const aiFeatures = [
    {
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      title: "AI Text Chat",
      description:
        "Engage in natural conversations with our AI tutor to practice your English writing and comprehension skills anytime.",
      imageUrl:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80",
    },
    {
      icon: <Mic className="h-8 w-8 text-primary" />,
      title: "Voice Messaging",
      description:
        "Practice your pronunciation and listening skills by exchanging voice messages with our AI tutor for immediate feedback.",
      imageUrl:
        "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&q=80",
    },
    {
      icon: <Phone className="h-8 w-8 text-primary" />,
      title: "AI Voice Calls",
      description:
        "Simulate real conversations through voice calls with our AI tutor to build confidence in your speaking abilities.",
      imageUrl:
        "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80",
    },
  ];

  const learningFeatures = [
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Personalized Daily Tasks",
      description:
        "Receive customized daily exercises and lessons tailored to your specific examination goals and current knowledge level.",
      imageUrl:
        "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600&q=80",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: "Adaptive Learning Path",
      description:
        "Our system adapts to your progress, focusing on areas that need improvement while building on your strengths.",
      imageUrl:
        "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&q=80",
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Exam Preparation",
      description:
        "Targeted practice for specific English proficiency exams like IELTS, TOEFL, and Cambridge with proven preparation strategies.",
      imageUrl:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for Effective Learning
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform combines AI-powered conversation practice with
            personalized learning paths to accelerate your English language
            mastery.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-center">
            AI Conversation Practice
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                imageUrl={feature.imageUrl}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-6 text-center">
            Personalized Learning Experience
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                imageUrl={feature.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
