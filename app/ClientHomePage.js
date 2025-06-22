"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowRight, Shield, Award, Users, Star, CheckCircle, Quote, Calendar } from "lucide-react"
import { carsData, formatPrice } from "@/lib/cars-data"

export default function ClientHomePage() {
  const featuredCars = carsData.slice(0, 6)

  const handleScheduleTestDrive = () => {
    // You can implement modal or redirect to booking page
    alert("Test drive booking functionality will be implemented here!")
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop&crop=center"
            alt="Luxury Cars Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Drive Your
              <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Dream Today
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl mb-10 text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover premium vehicles from the world's most prestigious brands. Experience luxury, performance, and
              innovation like never before.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/cars">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  <Search className="w-6 h-6 mr-3" />
                  Explore Collection
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>

              <Button
                onClick={handleScheduleTestDrive}
                variant="outline"
                size="lg"
                className="text-white bg-black hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Test Drive
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Collection</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Handpicked premium vehicles that define excellence in automotive engineering
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <Image
                      src={car.image || "/placeholder.svg"}
                      alt={`${car.brand} ${car.model}`}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Badge className="absolute top-4 right-4 bg-white text-black">{car.year}</Badge>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {car.brand} {car.model}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{car.description.substring(0, 100)}...</p>

                    <div className="flex justify-between items-center mb-4">
                      <div className="text-xl font-bold text-white">{formatPrice(car.price)}</div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>

                    <Link href={`/cars/${car.slug}`}>
                      <Button className="w-full bg-white text-black hover:bg-gray-200 rounded-xl font-medium transition-all duration-200">
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose CarHub?</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We redefine the luxury car buying experience with unmatched service and premium quality
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Premium Quality",
                description: "Every vehicle undergoes rigorous inspection and certification process",
              },
              {
                icon: Award,
                title: "Best Prices",
                description: "Competitive pricing with transparent costs and no hidden fees",
              },
              {
                icon: Users,
                title: "Expert Service",
                description: "Professional team with decades of automotive industry experience",
              },
              {
                icon: CheckCircle,
                title: "Trusted Brand",
                description: "Over 10,000 satisfied customers and 5-star service rating",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="bg-gray-900 rounded-2xl p-8 hover:bg-gray-800 transition-all duration-300 border border-gray-800 h-full text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-black" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Real experiences from our satisfied customers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Michael Johnson",
                role: "Business Executive",
                rating: 5,
                text: "Exceptional service and an incredible selection of luxury vehicles. The team made the entire process seamless and enjoyable.",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
              },
              {
                name: "Sarah Williams",
                role: "Entrepreneur",
                rating: 5,
                text: "Found my dream car at an amazing price. The quality and attention to detail exceeded all my expectations.",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
              },
              {
                name: "David Chen",
                role: "Tech Professional",
                rating: 5,
                text: "Professional, transparent, and trustworthy. This is how car buying should be done. Highly recommended!",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-800 border-gray-700 p-8 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold text-white text-lg">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                      <div className="flex gap-1 mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <Quote className="w-8 h-8 text-gray-600 mb-4" />
                  <p className="text-gray-300 leading-relaxed text-sm">{testimonial.text}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
