"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Fuel, IndianRupee, Gauge, Users, Droplets, Mountain, Package, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getCarBySlug, formatPrice } from "@/lib/cars-data"
import { notFound } from "next/navigation"

function generateJsonLd(car) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${car.brand} ${car.model} ${car.year}`,
    description: car.description,
    brand: {
      "@type": "Brand",
      name: car.brand,
    },
    model: car.model,
    vehicleModelDate: car.year.toString(),
    fuelType: car.fuel,
    offers: {
      "@type": "Offer",
      price: car.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "CarHub",
      },
    },
    image: car.image,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Engine",
        value: car.specs.engine,
      },
      {
        "@type": "PropertyValue",
        name: "Transmission",
        value: car.specs.transmission,
      },
      {
        "@type": "PropertyValue",
        name: "Mileage",
        value: car.specs.mileage,
      },
      {
        "@type": "PropertyValue",
        name: "Seating Capacity",
        value: car.specs.seatingCapacity,
      },
    ],
  }
}

export default function CarDetailPageClient({ slug }) {
  const car = getCarBySlug(slug)

  if (!car) {
    notFound()
  }

  const jsonLd = generateJsonLd(car)

  const specIcons = {
    engine: Gauge,
    transmission: Gauge,
    mileage: Fuel,
    seatingCapacity: Users,
    fuelTankCapacity: Droplets,
    groundClearance: Mountain,
    bootSpace: Package,
    safetyRating: Shield,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Link href="/cars" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cars
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Car Image */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={car.image || "/placeholder.svg"}
                  alt={`${car.brand} ${car.model}`}
                  width={600}
                  height={400}
                  className="w-full h-96 object-cover"
                  priority
                />
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground text-lg px-3 py-1">
                  {car.year}
                </Badge>
              </div>
            </div>

            {/* Car Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {car.brand} {car.model}
                </h1>

                <div className="flex items-center gap-6 text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{car.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Fuel className="w-5 h-5" />
                    <span>{car.fuel}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-4xl font-bold text-primary mb-6">
                  <IndianRupee className="w-8 h-8" />
                  <span>{formatPrice(car.price).replace("₹", "")}</span>
                </div>
              </div>

              <Separator />

              <div>
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{car.description}</p>
              </div>

              <div className="flex gap-4">
                <Button size="sm" className="flex-1">
                  Contact Dealer
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Schedule Test Drive
                </Button>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(car.specs).map(([key, value]) => {
                  const IconComponent = specIcons[key] || Gauge
                  const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())

                  return (
                    <div key={key} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <IconComponent className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">{label}</p>
                        <p className="text-sm text-gray-600">{value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
