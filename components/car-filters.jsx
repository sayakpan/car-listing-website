"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Filter, Car, Fuel, Calendar } from "lucide-react"

export default function CarFilters({ brands, years, fuelTypes, filters, onFilterChange, onClearFilters }) {
  const hasActiveFilters = filters.brand || filters.year || filters.fuel
  const activeFilterCount = [filters.brand, filters.year, filters.fuel].filter(Boolean).length

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Filter className="w-4 h-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Filters</CardTitle>
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="text-xs mt-1">
                    {activeFilterCount} active
                  </Badge>
                )}
              </div>
            </div>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-xs hover:bg-red-50 hover:text-red-600 rounded-lg"
              >
                <X className="w-3 h-3 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Brand Filter */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-100 rounded-lg">
                <Car className="w-4 h-4 text-blue-600" />
              </div>
              <label className="text-sm font-semibold text-gray-900">Brand</label>
            </div>
            <Select value={filters.brand || ""} onValueChange={(value) => onFilterChange("brand", value)}>
              <SelectTrigger className="bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-xl">
                <SelectValue placeholder="Select Brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand} className="rounded-lg">
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Fuel Type Filter */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-green-100 rounded-lg">
                <Fuel className="w-4 h-4 text-green-600" />
              </div>
              <label className="text-sm font-semibold text-gray-900">Fuel Type</label>
            </div>
            <Select value={filters.fuel || ""} onValueChange={(value) => onFilterChange("fuel", value)}>
              <SelectTrigger className="bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-xl">
                <SelectValue placeholder="Select Fuel Type" />
              </SelectTrigger>
              <SelectContent>
                {fuelTypes.map((fuel) => (
                  <SelectItem key={fuel} value={fuel} className="rounded-lg">
                    {fuel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year Filter */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-purple-100 rounded-lg">
                <Calendar className="w-4 h-4 text-purple-600" />
              </div>
              <label className="text-sm font-semibold text-gray-900">Year</label>
            </div>
            <Select value={filters.year || ""} onValueChange={(value) => onFilterChange("year", value)}>
              <SelectTrigger className="bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-xl">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()} className="rounded-lg">
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm font-semibold text-gray-900 mb-3">Active Filters:</p>
              <div className="flex flex-wrap gap-2">
                {filters.brand && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    {filters.brand}
                    <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => onFilterChange("brand", "")} />
                  </Badge>
                )}
                {filters.fuel && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                    {filters.fuel}
                    <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => onFilterChange("fuel", "")} />
                  </Badge>
                )}
                {filters.year && (
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                    {filters.year}
                    <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => onFilterChange("year", "")} />
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
