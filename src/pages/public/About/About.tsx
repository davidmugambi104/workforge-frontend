import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Heart, 
  DollarSign, 
  Users, 
  Briefcase, 
  MessageCircle, 
  CheckCircle,
  Target,
  Globe,
  Sparkles,
  Rocket
} from 'lucide-react';
import { Card, CardBody } from '@components/ui/Card';
import { Button } from '@components/ui/Button';
import { Badge } from '@components/ui/Badge';

const About: React.FC = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Core values data
  const coreValues = [
    {
      icon: DollarSign,
      title: 'Fast Payment',
      description: 'Get paid within 24 hours. No delays. No excuses. Money moves as quickly as the work gets done.'
    },
    {
      icon: Users,
      title: 'Real Jobs for Fundis',
      description: 'We connect you directly with employers who need your skills. No fake listings. Real work, real pay.'
    },
    {
      icon: Zap,
      title: 'Work Starts Today',
      description: 'Find a job this morning, start this afternoon. No weeks of bureaucracy. Speed matters.'
    },
    {
      icon: Shield,
      title: 'Your Money Is Safe',
      description: 'Payment held secure until work is done. Then straight to your M-Pesa. No disputes, no delays.'
    },
    {
      icon: Heart,
      title: 'Fundis Supporting Fundis',
      description: 'Real reputation system. Your work speaks for itself. Good work = More jobs = More income.'
    },
    {
      icon: Target,
      title: 'Earn Local, Stay Local',
      description: 'Work near your home. No transport cost waste. More availability = More jobs = More income.'
    }
  ];

  // Platform features data
  const features = [
    {
      icon: CheckCircle,
      title: 'Reputation Builder',
      description: 'Every completed job builds your profile. Real reviews from real employers.'
    },
    {
      icon: Sparkles,
      title: 'Find Jobs in Seconds',
      description: 'Browse local jobs that match your skills. Send a request in one tap.'
    },
    {
      icon: MessageCircle,
      title: 'Talk Direct to Employers',
      description: 'No waiting. Message opens to jobs. Quick replies = more income.'
    },
    {
      icon: Rocket,
      title: 'Get Paid Same Day',
      description: 'Complete work, get paid within 24 hours to M-Pesa.'
    },
    {
      icon: Briefcase,
      title: 'Your Earnings Dashboard',
      description: 'Track all your work, money earned, ratings, and available gigs.'
    },
    {
      icon: Globe,
      title: 'Work Near Home',
      description: 'Find jobs in your area. Save transport. More time working.'
    }
  ];

  // Stats data
  const stats = [
    { value: '10k+', label: 'Skilled Workers' },
    { value: '2k+', label: 'Employers' },
    { value: '50k+', label: 'Jobs Completed' },
    { value: '98%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <Badge variant="outline" className="mb-6 px-4 py-1 text-sm border-blue-200 text-blue-700 bg-blue-50">
              About WorkForge
            </Badge>
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6"
            >
              Work happens fast.
              <span className="text-blue-600"> Get paid faster.</span>
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-slate-600 max-w-3xl mx-auto"
            >
              WorkForge connects Kenyan fundis directly with real jobs. No middleman. No delays. Work, get paid, build your reputation.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story + Mission/Vision */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Story</h2>
              <p className="text-lg text-slate-600 mb-4">
                Fundis in Kenya were getting the short end of the deal. Employers didn't know who to trust. Workers waited weeks for payment. There had to be a better way.
              </p>
              <p className="text-lg text-slate-600">
                WorkForge started with one goal: connect skilled workers directly to real jobs, fast payment, and real respect. No LinkedIn-style profile hunting. No weeks of back-and-forth. Just fundis getting work, getting paid quick, and building their reputation.
              </p>
            </motion.div>

            <div className="space-y-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Card className="border-l-4 border-l-blue-500 shadow-sm">
                  <CardBody className="p-6">
                    <Target className="h-8 w-8 text-blue-600 mb-3" />
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Our Mission</h3>
                    <p className="text-slate-600">
                      Get fundis paid fast and help employers find trusted workers. No delays. No games. Real work, real pay.
                    </p>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-l-4 border-l-purple-500 shadow-sm">
                  <CardBody className="p-6">
                    <Globe className="h-8 w-8 text-purple-600 mb-3" />
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Our Vision</h3>
                    <p className="text-slate-600">
                      Every fundi in Kenya finds good work fast. Every employer finds reliable, skilled workers. Same day. No delays.
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4 px-4 py-1 border-blue-200 text-blue-700 bg-blue-50">
              Core Values
            </Badge>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What drives us
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our principles shape every feature, every decision, and every interaction on WorkForge.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {coreValues.map((value, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardBody className="p-6">
                    <div className="h-12 w-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                      <value.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{value.title}</h3>
                    <p className="text-slate-600">{value.description}</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="relative py-16 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4 px-4 py-1 border-purple-200 text-purple-700 bg-purple-50">
              Platform Features
            </Badge>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything you need to succeed
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-600 max-w-2xl mx-auto">
              From discovery to payment, we've built tools that make workforce management seamless.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full border-0 shadow-sm bg-slate-50 hover:bg-white hover:shadow-md transition-all duration-300">
                  <CardBody className="p-6">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Ready to join the future of work?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Whether you're a skilled fundi looking for your next job or an employer needing a worker fast, WorkForge is here to help.
            </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                Join as Worker
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg">
                Hire Talent Today
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;