"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Fuel, IndianRupee, Gauge, Users, Star, ArrowRight, Heart, PhoneOutgoing } from "lucide-react"
import { useState } from "react"

export default function CarCard({ car, index }) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-2xl transition-all duration-500 bg-gray-900 border-gray-700 hover:border-gray-600 group">
        {/* Image Section */}
        <Link href={`/cars/${car.slug}`} className="relative overflow-hidden">
          <Image
            src={car.image || "/placeholder.svg"}
            alt={`${car.brand} ${car.model}`}
            title={`${car.brand} ${car.model}`}
            width={400}
            height={280}
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <Badge className="bg-white text-black border-0 px-3 py-1 text-sm font-medium">{car.year}</Badge>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
                isLiked ? "bg-red-500 text-white" : "bg-white/80 text-gray-600 hover:bg-white hover:text-red-500"
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
            </motion.button>
          </div>

          {/* Bottom Price Badge */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-white/95 backdrop-blur-md rounded-xl px-3 py-2 shadow-lg">
              <div className="flex items-center gap-1 text-2xl font-bold text-gray-900">
                <IndianRupee className="w-5 h-5" />
                <span>{(car.price / 100000).toFixed(1)}L</span>
              </div>
              <p className="text-xs text-gray-600 -mt-1">Starting Price</p>
            </div>
          </div>
        </Link>

        {/* Content Section */}
        <CardContent className="flex-1 p-6 space-y-4">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs font-medium text-white border-gray-600">
                {car.brand}
              </Badge>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-xs text-gray-400 ml-1">4.8</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-1">
              {car.brand} {car.model}
            </h3>

            <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">{car.description.substring(0, 100)}...</p>
          </div>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg border border-gray-700">
              <div className="p-1.5 bg-blue-900 rounded-lg">
                <Fuel className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Fuel</p>
                <p className="text-sm font-semibold text-white">{car.fuel}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg border border-gray-700">
              <div className="p-1.5 bg-green-900 rounded-lg">
                <Gauge className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Mileage</p>
                <p className="text-sm font-semibold text-white">{car.specs.mileage}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg border border-gray-700">
              <div className="p-1.5 bg-purple-900 rounded-lg">
                <Users className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Seating</p>
                <p className="text-sm font-semibold text-white">{car.specs.seatingCapacity}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg border border-gray-700">
              <div className="p-1.5 bg-orange-900 rounded-lg">
                <Star className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Rating</p>
                <p className="text-sm font-semibold text-white">4.8/5</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Link href={`/cars/${car.slug}`} className="flex-1">
              <Button className="w-full bg-white text-black hover:bg-gray-200 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl group">
                View Details
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
            <Button
              variant="outline"
              className="px-4 border-gray-600 text-gray-800 rounded-xl transition-all duration-200"
            >
              <PhoneOutgoing className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
