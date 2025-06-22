import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Car, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Car className="w-24 h-24 text-gray-400 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-8">The car you're looking for doesn't exist or has been moved.</p>
        <div className="space-x-4">
          <Link href="/">
            <Button>
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link href="/cars">
            <Button variant="outline">Browse Cars</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
