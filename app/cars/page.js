"use client"

import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import CarCard from "@/components/car-card"
import { carsData, getBrands, getYears, getFuelTypes } from "@/lib/cars-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, SlidersHorizontal, X } from "lucide-react"

export default function CarsPage() {
  const [filters, setFilters] = useState({
    brand: "",
    fuel: "",
    year: "",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [isSticky, setIsSticky] = useState(false)

  const brands = getBrands()
  const years = getYears()
  const fuelTypes = getFuelTypes()

  // Handle sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsSticky(scrollTop > 200)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const filteredCars = useMemo(() => {
    const filtered = carsData.filter((car) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          car.brand.toLowerCase().includes(query) ||
          car.model.toLowerCase().includes(query) ||
          car.description.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }

      if (filters.brand && car.brand !== filters.brand) return false
      if (filters.fuel && car.fuel !== filters.fuel) return false
      if (filters.year && car.year.toString() !== filters.year) return false
      return true
    })

    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => b.year - a.year)
    }

    return filtered
  }, [filters, searchQuery, sortBy])

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const handleClearFilters = () => {
    setFilters({
      brand: "",
      fuel: "",
      year: "",
    })
    setSearchQuery("")
  }

  const activeFilterCount = [filters.brand, filters.fuel, filters.year].filter(Boolean).length

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Premium Car Collection</h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Browse our exclusive selection of luxury and performance vehicles
            </p>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <div className="flex-1 max-w-md w-full">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search by brand, model, or features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:bg-gray-700 focus:ring-2 focus:ring-white rounded-xl transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-40 bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="newest" className="text-white">
                    Newest First
                  </SelectItem>
                  <SelectItem value="price-low" className="text-white">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="price-high" className="text-white">
                    Price: High to Low
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Mobile Quick Filters - Sticky */}
        <div
          className={`lg:hidden transition-all duration-300 z-40 ${
            isSticky ? "fixed top-16 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-gray-800" : "relative"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-2 text-white whitespace-nowrap">
                <SlidersHorizontal className="w-4 h-4" />
                <span className="text-sm font-medium">Filters:</span>
              </div>

              {/* Brand Filter */}
              <Select value={filters.brand || ""} onValueChange={(value) => handleFilterChange("brand", value)}>
                <SelectTrigger className="w-32 h-8 bg-gray-800 border-gray-700 text-white text-xs">
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand} className="text-white text-xs">
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Fuel Filter */}
              <Select value={filters.fuel || ""} onValueChange={(value) => handleFilterChange("fuel", value)}>
                <SelectTrigger className="w-28 h-8 bg-gray-800 border-gray-700 text-white text-xs">
                  <SelectValue placeholder="Fuel" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {fuelTypes.map((fuel) => (
                    <SelectItem key={fuel} value={fuel} className="text-white text-xs">
                      {fuel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Year Filter */}
              <Select value={filters.year || ""} onValueChange={(value) => handleFilterChange("year", value)}>
                <SelectTrigger className="w-24 h-8 bg-gray-800 border-gray-700 text-white text-xs">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()} className="text-white text-xs">
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Active Filters */}
              {filters.brand && (
                <Badge
                  variant="secondary"
                  className="bg-white text-black text-xs px-2 py-1 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleFilterChange("brand", "")}
                >
                  {filters.brand} <X className="w-3 h-3 ml-1" />
                </Badge>
              )}

              {filters.fuel && (
                <Badge
                  variant="secondary"
                  className="bg-white text-black text-xs px-2 py-1 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleFilterChange("fuel", "")}
                >
                  {filters.fuel} <X className="w-3 h-3 ml-1" />
                </Badge>
              )}

              {filters.year && (
                <Badge
                  variant="secondary"
                  className="bg-white text-black text-xs px-2 py-1 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleFilterChange("year", "")}
                >
                  {filters.year} <X className="w-3 h-3 ml-1" />
                </Badge>
              )}

              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="text-gray-400 hover:text-white text-xs h-8 px-2"
                >
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className={`grid lg:grid-cols-4 gap-8 ${isSticky ? "mt-20 lg:mt-0" : ""}`}>
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Card className="bg-gray-900 border-gray-800 sticky top-24">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <SlidersHorizontal className="w-5 h-5 text-white" />
                    <h3 className="text-lg font-semibold text-white">Filters</h3>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Brand</label>
                      <Select value={filters.brand || ""} onValueChange={(value) => handleFilterChange("brand", value)}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="All Brands" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          {brands.map((brand) => (
                            <SelectItem key={brand} value={brand} className="text-white">
                              {brand}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Fuel Type</label>
                      <Select value={filters.fuel || ""} onValueChange={(value) => handleFilterChange("fuel", value)}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="All Fuel Types" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          {fuelTypes.map((fuel) => (
                            <SelectItem key={fuel} value={fuel} className="text-white">
                              {fuel}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
                      <Select value={filters.year || ""} onValueChange={(value) => handleFilterChange("year", value)}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="All Years" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          {years.map((year) => (
                            <SelectItem key={year} value={year.toString()} className="text-white">
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      variant="outline"
                      onClick={handleClearFilters}
                      className="w-full border-gray-600 text-gray-800 hover:bg-gray-200"
                      disabled={!filters.brand && !filters.fuel && !filters.year && !searchQuery}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Cars Grid */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <div className="flex items-center justify-between">
                <p className="text-gray-400 font-medium">
                  Showing <span className="text-white font-bold">{filteredCars.length}</span> of{" "}
                  <span className="font-bold">{carsData.length}</span> cars
                </p>

                {(searchQuery || filters.brand || filters.fuel || filters.year) && (
                  <Button
                    variant="ghost"
                    onClick={handleClearFilters}
                    className="text-sm text-gray-400 hidden lg:block"
                  >
                    Clear all filters
                  </Button>
                )}
              </div>
            </motion.div>

            {filteredCars.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-8">
                {filteredCars.map((car, index) => (
                  <CarCard key={car.id} car={car} index={index} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16 bg-gray-900 rounded-2xl border border-gray-800"
              >
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No cars found</h3>
                  <p className="text-gray-400 mb-6">
                    Try adjusting your search criteria or filters to find more results.
                  </p>
                  <Button onClick={handleClearFilters} className="bg-white text-black rounded-xl">
                    Clear all filters
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
